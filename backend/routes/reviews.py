import datetime
from flask import Blueprint, request, jsonify
from config.supabase import supabase

reviews_bp = Blueprint('reviews', __name__)

REQUIRED_FIELDS = {
    "uni_clep_id": str,
    "good_experince": bool,
    "submitted_at": datetime,
}

@reviews_bp.route('/reviews', methods=['GET'])
def get_reviews():
    try:
        data = supabase.table("reviews").select("*").order("submitted_at", desc=True).execute()
        return jsonify(data.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@reviews_bp.route('/reviews', methods=['POST'])
def add_institution():
    payload = request.json or {}

    missing = [f for f in REQUIRED_FIELDS if f not in payload]
    if missing:
        return jsonify({"error": "Missing required fields", "missing": missing}), 400

    wrong_types = [f for f, t in REQUIRED_FIELDS.items() if not isinstance(payload[f], t)]
    if wrong_types:
        return jsonify({"error": "Invalid field types", "invalid": wrong_types}), 400

    try:
        res = supabase.table("reviews").insert(payload).execute()
        return jsonify(res.data), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500