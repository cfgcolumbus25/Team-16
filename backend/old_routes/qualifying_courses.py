from flask import Blueprint, request, jsonify
from supabase import create_client
import os

supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))
qualifying_courses = Blueprint("qualifying_courses", __name__)