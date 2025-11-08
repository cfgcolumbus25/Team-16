from flask import Blueprint, request, jsonify
from supabase import create_client
import os

supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))
uni_clep_bp = Blueprint("universityclep", __name__)

REQUIRED_FIELDS = {
    "course_names": str,
    "course_cutoff_score": int,
    "course_credits": int,
    "uni_id": str,
    "clep_id": str
}

@uni_clep_bp.route("/", methods=["GET"])
def get_all_uni_clep():
    try:
        data = supabase.table("UniversityClep").select("*").execute()
        return jsonify(data.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@uni_clep_bp.route("/", methods=["POST"])
def add_uni_clep():
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
        res = supabase.table("UniversityClep").insert(payload).execute()
        return jsonify(res.data), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@uni_clep_bp.route("/<uuid>", methods=["PUT"])
def update_uni_clep(uuid):
    payload = request.json or {}

    try:
        payload["last_updated"] = "now()"  # optional timestamp update
        res = supabase.table("UniversityClep").update(payload).eq("uni_clep_id", uuid).execute()
        return jsonify(res.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
