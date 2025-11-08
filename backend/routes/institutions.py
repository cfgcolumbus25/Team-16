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

