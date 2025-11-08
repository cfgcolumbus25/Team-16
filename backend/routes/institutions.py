from flask import Blueprint, request, jsonify
from config.supabase import supabase

institutions_bp = Blueprint('institutions', __name__)


@institutions_bp.route('/institutions', methods=['GET', 'POST', 'PUT', 'DELETE'])
def institutions():
    """
    Handle CRUD operations for institutions
    """
    if request.method == 'GET':
        # TODO: Implement GET logic
        pass
    
    elif request.method == 'POST':
        # TODO: Implement POST logic
        pass
    
    elif request.method == 'PUT':
        # TODO: Implement PUT logic
        pass
    
    elif request.method == 'DELETE':
        # TODO: Implement DELETE logic
        pass