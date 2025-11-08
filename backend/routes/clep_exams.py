from flask import Blueprint, request, jsonify
from config.supabase import supabase

clep_exams_bp = Blueprint('clep_exams', __name__)

@clep_exams_bp.route('/clep_exams', methods=['GET'])
def get_clep_exams():
    """
    Get all CLEP exams
    """
    try:
        response = supabase.table('clep_exams').select('*').execute()
        return jsonify({
            'success': True,
            'data': response.data,
            'count': len(response.data)
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@clep_exams_bp.route('/clep_exams', methods=['POST'])
def create_clep_exam():
    """
    Create a new CLEP exam
    """
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data.get('clep_exam_name'):
            return jsonify({
                'success': False,
                'error': 'clep_exam_name is required'
            }), 400
        
        # Remove 'id' if present - let Supabase auto-generate it
        if 'id' in data:
            del data['id']
        
        response = supabase.table('clep_exams').insert(data).execute()
        return jsonify({
            'success': True,
            'data': response.data,
            'message': 'CLEP exam created successfully'
        }), 201
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@clep_exams_bp.route('/clep_exams', methods=['PUT'])
def update_clep_exam():
    """
    Update an existing CLEP exam
    """
    try:
        data = request.get_json()
        exam_id = data.get('clep_id')
        
        if not exam_id:
            return jsonify({
                'success': False,
                'error': 'ID is required for update'
            }), 400
        
        # Create update data without the ID
        update_data = {k: v for k, v in data.items() if k != 'id'}
        
        if not update_data:
            return jsonify({
                'success': False,
                'error': 'No fields to update'
            }), 400
        
        response = supabase.table('clep_exams').update(update_data).eq('clep_id', exam_id).execute()
        
        if not response.data:
            return jsonify({
                'success': False,
                'error': 'CLEP exam not found'
            }), 404
        
        return jsonify({
            'success': True,
            'data': response.data,
            'message': 'CLEP exam updated successfully'
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@clep_exams_bp.route('/clep_exams', methods=['DELETE'])
def delete_clep_exam():
    """
    Delete a CLEP exam
    """
    try:
        data = request.get_json()
        exam_id = data.get('clep_id')
        
        if not exam_id:
            return jsonify({
                'success': False,
                'error': 'ID is required for deletion'
            }), 400
        
        response = supabase.table('clep_exams').delete().eq('clep_id', exam_id).execute()
        
        if not response.data:
            return jsonify({
                'success': False,
                'error': 'CLEP exam not found'
            }), 404
        
        return jsonify({
            'success': True,
            'data': response.data,
            'message': 'CLEP exam deleted successfully'
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500