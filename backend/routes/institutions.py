from flask import Blueprint, request, jsonify
from config.supabase import supabase

institutions_bp = Blueprint('institutions', __name__)

REQUIRED_FIELDS = {
    "name": str,
    "city": str,
    "zip": str,
    "cost": str,
    "acceptance_rate": str
}

@institutions_bp.route('/institutions', methods=['GET'])
def get_institutions():
    try:
        data = supabase.table("institutes").select("*").order("name", desc=False).execute()
        return jsonify(data.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@institutions_bp.route('/institutions', methods=['POST'])
def add_institution():
    payload = request.json or {}

    missing = [f for f in REQUIRED_FIELDS if f not in payload]
    if missing:
        return jsonify({"error": "Missing required fields", "missing": missing}), 400

    wrong_types = [f for f, t in REQUIRED_FIELDS.items() if not isinstance(payload[f], t)]
    if wrong_types:
        return jsonify({"error": "Invalid field types", "invalid": wrong_types}), 400

    try:
        res = supabase.table("institutes").insert(payload).execute()
        return jsonify(res.data), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@institutions_bp.route('/institutions/<uni_id>', methods=['PUT'])
def update_institution(uni_id):
    payload = request.json or {}
    updates = {k: v for k, v in payload.items() if k in REQUIRED_FIELDS}

    if not updates:
        return jsonify({"error": "No valid fields to update"}), 400

    try:
        res = supabase.table("institutes").update(updates).eq("uni_id", uni_id).execute()
        return jsonify(res.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@institutions_bp.route('/institutions/<uni_id>', methods=['DELETE'])
def delete_institution(uni_id):
    try:
        res = supabase.table("institutes").delete().eq("uni_id", uni_id).execute()
        return jsonify({"deleted": len(res.data)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
