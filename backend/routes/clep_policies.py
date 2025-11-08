from flask import Blueprint, request, jsonify
from config.supabase import supabase

clep_policies_bp = Blueprint('clep_policies', __name__)

REQUIRED_FIELDS = {
    "course_names": str,
    "course_cutoff_score": int,
    "course_credits": int,
    "uni_id": str,
    "clep_id": str
}

@clep_policies_bp.route('/clep_policies', methods=['GET'])
def get_clep_policies():
    if request.method == 'GET':
        try:
          response = supabase.table('clep_policies').select('*').execute()
          return jsonify({
              'success': True,
              'data': response.data,
              'count': len(response.data)
          }), 200
        except Exception as e:
          return jsonify({
              'success': False,
              'error': str(e)
          }), 500
        
@clep_policies_bp.route("/clep_policies", methods=["POST"])
def post_clep_policies():
    payload = request.json or {}

    # Missing fields
    missing = [f for f in REQUIRED_FIELDS if f not in payload]
    if missing:
        return jsonify({"error": "Missing required fields", "missing": missing}), 400

    # Type check
    wrong_types = [f for f, t in REQUIRED_FIELDS.items() if not isinstance(payload[f], t)]
    if wrong_types:
        return jsonify({"error": "Invalid field types", "invalid": wrong_types}), 400

    try:
        res = supabase.table("clep_policies").insert(payload).execute()
        return jsonify(res.data), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@clep_policies_bp.route("/clep_policies/<uuid>", methods=["PUT"])
def put_clep_policies(uuid):
    payload = request.json or {}

    try:
        payload["last_updated"] = "now()"
        res = supabase.table("clep_policies").update(payload).eq("uni_clep_id", uuid).execute()
        return jsonify(res.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@clep_policies_bp.route('/clep_policies/filter', methods=['POST'])
def get_clep_policies_filtered():
    payload = request.json or {}

    # Extract data from request
    user_location = payload.get("userLocation", "")
    clep_exams_taken = payload.get("clepExamsTaken", [])
    in_state = payload.get("inState", False)

    # Defensive checks
    if not user_location or ", " not in user_location:
        return jsonify({"error": "Invalid userLocation format"}), 400

    state = user_location.split(", ")[1]

    try:
        if in_state:
            universities = supabase.table("institutions").select("*").eq("state", state).execute().data
        else:
            universities = supabase.table("institutions").select("*").execute().data

        if not universities:
            return jsonify({"message": "No universities found"}), 404

        clep_records = supabase.table("clep_policies").select("*").execute().data
        clep_exams = supabase.table("clep_exams").select("*").execute().data

        # Create lookup for CLEP exam names
        clep_name_map = {c["clep_id"]: c["clep_exam_name"].lower() for c in clep_exams}

        matched_policies = []

        for uni in universities:
            uni_id = uni["uni_id"]
            uni_name = uni["name"]
            uni_state = uni.get("state")

            uni_policies = [r for r in clep_records if r["uni_id"] == uni_id]

            for taken in clep_exams_taken:
                subject = taken["subject"].lower()
                score = taken["score"]

                # Get all policies for this CLEP subject that the user qualifies for
                qualifying = []
                for policy in uni_policies:
                    clep_name = clep_name_map.get(policy["clep_id"], "").lower()
                    if subject in clep_name and score >= policy["course_cutoff_score"]:
                        qualifying.append(policy)

                # Only keep the *highest* qualifying policy (closest cutoff to user's score)
                if qualifying:
                    best_policy = max(qualifying, key=lambda p: p["course_cutoff_score"])
                    clep_name = clep_name_map.get(best_policy["clep_id"], "").lower()

                    matched_policies.append({
                        "university": uni_name,
                        "state": uni_state,
                        "course": best_policy["course_names"],
                        "credits_awarded": best_policy["course_credits"],
                        "clep_exam": clep_name,
                        "required_score": best_policy["course_cutoff_score"],
                        "user_score": score
                    })

        if not matched_policies:
            return jsonify({"message": "No matching CLEP policies found"}), 404

        return jsonify(matched_policies), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
