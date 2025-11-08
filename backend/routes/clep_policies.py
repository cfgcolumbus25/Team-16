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
        # Step 1: Get universities
        if in_state:
            universities = supabase.table("institutions").select("*").eq("state", state).execute().data
        else:
            universities = supabase.table("institutions").select("*").execute().data

        if not universities:
            return jsonify({"message": "No universities found"}), 404

        # Step 2: Get CLEP policy data
        clep_records = supabase.table("clep_policies").select("*").execute().data
        clep_exams = supabase.table("clep_exams").select("*").execute().data

        # Create lookup for CLEP exam names
        clep_name_map = {c["clep_id"]: c["clep_exam_name"].lower() for c in clep_exams}

        # 1. Use a dictionary to group results by university ID
        matched_universities = {}

        for uni in universities:
            uni_id = uni["uni_id"]
            uni_policies = [r for r in clep_records if r["uni_id"] == uni_id]

            for taken in clep_exams_taken:
                subject = taken["subject"].lower()
                score = taken["score"]

                qualifying = []
                for policy in uni_policies:
                    clep_name = clep_name_map.get(policy["clep_id"], "").lower()
                    if subject in clep_name and score >= policy["course_cutoff_score"]:
                        qualifying.append(policy)

                if qualifying:
                    best_policy = max(qualifying, key=lambda p: p["course_cutoff_score"])
                    clep_name = clep_name_map.get(best_policy["clep_id"], "").lower()

                    # 2. If this is the first match for this uni, add the whole uni object
                    if uni_id not in matched_universities:
                        matched_universities[uni_id] = uni.copy() # Add the full university details
                        # 3. Add a new key to hold the policies that matched
                        matched_universities[uni_id]["matching_clep_exams"] = []

                    # 4. Append the specific matching policy details
                    matched_universities[uni_id]["matching_clep_exams"].append({
                        "course": best_policy["course_names"],
                        "credits_awarded": best_policy["course_credits"],
                        "clep_exam": clep_name,
                        "required_score": best_policy["course_cutoff_score"],
                        "user_score": score
                    })
        
        # 5. Convert the dictionary of universities back into a list
        final_results = list(matched_universities.values())

        if not final_results:
            return jsonify({"message": "No matching CLEP policies found"}), 404

        # 6. Return the new, nested list
        return jsonify(final_results), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
