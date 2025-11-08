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
        data = supabase.table("universities").select("*").order("name", desc=False).execute()
        return jsonify(data.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500