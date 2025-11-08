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
        
@clep_policies_bp.route("/", methods=["POST"])
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

@clep_policies_bp.route("/<uuid>", methods=["PUT"])
def put_clep_policies(uuid):
    payload = request.json or {}

    try:
        payload["last_updated"] = "now()"
        res = supabase.table("clep_policies").update(payload).eq("uni_clep_id", uuid).execute()
        return jsonify(res.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@clep_policies_bp.route('/filter', methods=['POST'])
def get_clep_policies_filtered():
    paylord = request.json or {}
    state = paylord["userLocation"].split(", ")[1]
    instate = paylord["inState"]

    data = []
    if instate:
        try:
            data = supabase.table("institutes").select("*").eq("state", state).execute()
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        try:
            data = supabase.table("institutes").select("*").execute()
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    

    # get institutes
    # filter by states
    # get all clep_poloicies (clep exam and its corresponding class that the university offers)
    # based on the scores they got, show the row that 