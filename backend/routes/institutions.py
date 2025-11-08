from flask import Blueprint, request, jsonify
from config.supabase import supabase

institutions_bp = Blueprint('institutions', __name__)

REQUIRED_FIELDS = {
    "name": str,
    "cost": str,
    "acceptance_rate": str,
    "state": str
}

@institutions_bp.route('/institutions', methods=['GET'])
def get_institutions():
    try:
        data = supabase.table("institutions").select("*").order("name", desc=False).execute()
        return jsonify(data.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@institutions_bp.route('/institutions/<uni_id>', methods=['GET'])
def get_courses_for_institution(uni_id):
    try:
        # Get all courses linked to this institution
        data = (
            supabase.table("clep_policies")
            .select("course_names, course_cutoff_score, course_credits, clep_id")
            .eq("uni_id", uni_id)
            .execute()
        )

        if not data.data:
            return jsonify({"message": "No courses found for this institution"}), 404

        return jsonify(data.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@institutions_bp.route('/institutions_all', methods=['GET'])
def get_institutions_with_exams():
    try:
        data = (
            supabase.table("institutions")
            .select("uni_id, name, state, cost, acceptance_rate, clep_policies(course_names, course_cutoff_score, course_credits, clep_exams(clep_exam_name))")
            .execute()
        )

        institutions = []
        for inst in data.data:
            exams = []
            policies = inst.get("clep_policies", [])
            for p in policies:
                exam_info = p.get("clep_exams", {})
                exams.append({
                    "clep_exam_name": exam_info.get("clep_exam_name"),
                    "course_names": p.get("course_names"),
                    "course_cutoff_score": p.get("course_cutoff_score"),
                    "course_credits": p.get("course_credits")
                })

            institutions.append({
                "uni_id": inst.get("uni_id"),
                "name": inst.get("name"),
                "state": inst.get("state"),
                "cost": inst.get("cost"),
                "acceptance_rate": inst.get("acceptance_rate"),
                "clep_exams": exams
            })

        return jsonify(institutions), 200

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
        res = supabase.table("institutions").insert(payload).execute()
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
        res = supabase.table("institutions").update(updates).eq("uni_id", uni_id).execute()
        return jsonify(res.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@institutions_bp.route('/institutions/<uni_id>', methods=['DELETE'])
def delete_institution(uni_id):
    try:
        res = supabase.table("institutions").delete().eq("uni_id", uni_id).execute()
        return jsonify({"deleted": len(res.data)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
