from flask import Blueprint, request, jsonify
from supabase import create_client
import os

supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))
university_bp = Blueprint("universities", __name__)

REQUIRED_FIELDS = {
    "name": str,
    "city": str,
    "zip": str,
    "cost": str,
    "acceptance_rate": str
}

@university_bp.route("/", methods=["GET"])
def get_universities():
    try:
        data = supabase.table("universities").select("*").execute()
        return jsonify(data.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@university_bp.route("/", methods=["POST"])
def add_university():
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
        res = supabase.table("universities").insert(payload).execute()
        return jsonify(res.data), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
