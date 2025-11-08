from flask import Blueprint, request, jsonify
from config.supabase import supabase

reviews_bp = Blueprint('reviews', __name__)

@reviews_bp.route('/reviews', methods=['GET'])
def get_reviews():
    try:
        data = supabase.table("reviews").select("*").order("name", desc=False).execute()
        return jsonify(data.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500