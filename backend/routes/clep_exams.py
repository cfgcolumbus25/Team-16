from flask import Blueprint, request, jsonify
from config.supabase import supabase

clep_exams_bp = Blueprint('clep_exams', __name__)


@clep_exams_bp.route('/clep_exams', methods=['GET', 'POST', 'PUT', 'DELETE'])
def clep_exams():
    """
    Handle CRUD operations for CLEP exams
    """
    if request.method == 'GET':
        try:
            response = supabase.table('clepexams').select('*').execute()
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
    
    elif request.method == 'POST':
        try:
            data = request.get_json()
            response = supabase.table('clepexams').insert(data).execute()
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
    
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            exam_id = data.get('id')
            
            if not exam_id:
                return jsonify({
                    'success': False,
                    'error': 'ID is required for update'
                }), 400
            
            response = supabase.table('clepexams').update(data).eq('id', exam_id).execute()
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
    
    elif request.method == 'DELETE':
        try:
            data = request.get_json()
            exam_id = data.get('id')
            
            if not exam_id:
                return jsonify({
                    'success': False,
                    'error': 'ID is required for deletion'
                }), 400
            
            response = supabase.table('clepexams').delete().eq('id', exam_id).execute()
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