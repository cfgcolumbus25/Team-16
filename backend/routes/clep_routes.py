from flask import Blueprint, request, jsonify
from supabase import create_client
import os

supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))
clep_bp = Blueprint("clepexams", __name__)

REQUIRED_FIELDS = {
    "clep_exam_name": str
}

@clep_bp.route("/", methods=["GET"])
def get_all_clep():
    try:
        data = supabase.table("clepexam").select("*").execute()
        return jsonify(data.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@clep_bp.route("/", methods=["POST"])
def add_clep():
    payload = request.json or {}

    # Missing field
    missing = [f for f in REQUIRED_FIELDS if f not in payload]
    if missing:
        return jsonify({"error": "Missing required fields", "missing": missing}), 400

    # Type check
    wrong_types = [f for f, t in REQUIRED_FIELDS.items() if not isinstance(payload[f], t)]
    if wrong_types:
        return jsonify({"error": "Invalid field types", "invalid": wrong_types}), 400

    try:
        res = supabase.table("clepexam").insert(payload).execute()
        return jsonify(res.data), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
