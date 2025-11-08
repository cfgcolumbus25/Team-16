import datetime
from flask import Blueprint, request, jsonify
from config.supabase import supabase
from datetime import datetime, timedelta, timezone

clep_policies_bp = Blueprint('clep_policies', __name__)

REQUIRED_FIELDS = {
    "course_names": str,
    "course_cutoff_score": int,
    "course_credits": int,
    "uni_id": str,
    "clep_id": str
}

@clep_policies_bp.route('/clep_policies', methods=['GET'])
def get_clep_policies():
    if request.method == 'GET':
        try:
          response = supabase.table('clep_policies').select('*').execute()
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
        
@clep_policies_bp.route("/clep_policies", methods=["POST"])
def post_clep_policies():
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
        res = supabase.table("clep_policies").insert(payload).execute()
        return jsonify(res.data), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@clep_policies_bp.route("/clep_policies/<uuid>", methods=["PUT"])
def put_clep_policies(uuid):
    payload = request.json or {}

    try:
        payload["last_updated"] = "now()"
        res = supabase.table("clep_policies").update(payload).eq("uni_clep_id", uuid).execute()
        return jsonify(res.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@clep_policies_bp.route("/clep_policies/<uuid>", methods=["DELETE"])
def delete_clep_policy(uuid):
    try:
        # Attempt to delete the row with the matching UUID
        res = supabase.table("clep_policies").delete().eq("uni_clep_id", uuid).execute()

        # If nothing was deleted, return a 404
        if not res.data:
            return jsonify({
                "success": False,
                "message": f"No CLEP policy found with uni_clep_id: {uuid}"
            }), 404

        return jsonify({
            "success": True,
            "message": f"CLEP policy with uni_clep_id {uuid} deleted successfully",
            "deleted": res.data
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500
    

one_year_ago = datetime.now() - timedelta(days=365)

@clep_policies_bp.route('/clep_policies/filter', methods=['POST'])
def get_clep_policies_filtered():
    payload = request.json or {}

    # Extract data from request
    user_location = payload.get("userLocation", "")
    clep_exams_taken = payload.get("clepExamsTaken", [])
    in_state = payload.get("inState", False)

    # --- Added timezone-aware date setup ---
    now = datetime.now(timezone.utc)
    one_year_ago = now - timedelta(days=365)

    # Defensive checks
    if not user_location or ", " not in user_location:
        return jsonify({"error": "Invalid userLocation format"}), 400

    state = user_location.split(", ")[1]

    try:
        if in_state:
            universities = supabase.table("institutions").select("*").eq("state", state).execute().data
        else:
            universities = supabase.table("institutions").select("*").neq("state", state).execute().data

        if not universities:
            return jsonify({"message": "No universities found"}), 404

        clep_records = supabase.table("clep_policies").select("*").execute().data
        clep_exams = supabase.table("clep_exams").select("*").execute().data
        # --- Fetched all reviews ---
        all_reviews = supabase.table("reviews").select("uni_clep_id, good_experince, submitted_at").execute().data

        # Create lookup for CLEP exam names
        clep_name_map = {c["clep_id"]: c["clep_exam_name"].lower() for c in clep_exams}

        # Use a dictionary to group results by university ID
        matched_universities = {}

        for uni in universities:
            uni_id = uni["uni_id"]
            uni_policies = [r for r in clep_records if r["uni_id"] == uni_id]

            for taken in clep_exams_taken:
                subject = taken["subject"].lower()
                score = taken["score"]

                qualifying = []
                for policy in uni_policies:
                    clep_name = clep_name_map.get(policy["clep_id"], "").lower()
                    if subject in clep_name and score >= policy["course_cutoff_score"]:
                        qualifying.append(policy)

                if qualifying:
                    best_policy = max(qualifying, key=lambda p: p["course_cutoff_score"])
                    clep_name = clep_name_map.get(best_policy["clep_id"], "").lower()

                    last_updated_str = best_policy.get("last_updated")
                    policy_id = best_policy.get("uni_clep_id") # Get the policy's unique ID
                    
                    last_updated_dt = None
                    is_up_to_date = True

                    if last_updated_str:
                        try:
                            # Parse the ISO format string
                            if last_updated_str.endswith('Z'):
                                last_updated_dt = datetime.fromisoformat(last_updated_str.replace('Z', '+00:00'))
                            else:
                                last_updated_dt = datetime.fromisoformat(last_updated_str)
                            
                            # Ensure it's timezone-aware (assume UTC if naive)
                            if last_updated_dt.tzinfo is None:
                                last_updated_dt = last_updated_dt.replace(tzinfo=timezone.utc)

                            is_up_to_date = last_updated_dt >= one_year_ago
                        except (ValueError, TypeError):
                             is_up_to_date = True # Default if parsing fails
                             last_updated_dt = None # Ensure it's None if parsing failed

                    good_reviews = 0
                    bad_reviews = 0

                    # Only count reviews if we have a policy ID and a valid last_updated date
                    if policy_id and last_updated_dt:
                        # Filter reviews for this specific policy
                        relevant_reviews = [r for r in all_reviews if r.get("uni_clep_id") == policy_id]

                        for review in relevant_reviews:
                            try:
                                submitted_at_str = review.get("submitted_at")
                                if not submitted_at_str:
                                    continue # Skip review if it has no submission date

                                # Parse review submission date
                                if submitted_at_str.endswith('Z'):
                                    submitted_at_dt = datetime.fromisoformat(submitted_at_str.replace('Z', '+00:00'))
                                else:
                                    submitted_at_dt = datetime.fromisoformat(submitted_at_str)
                                
                                # Ensure it's timezone-aware (assume UTC if naive)
                                if submitted_at_dt.tzinfo is None:
                                    submitted_at_dt = submitted_at_dt.replace(tzinfo=timezone.utc)
                                
                                # Count review ONLY if it was submitted AFTER the policy update
                                if submitted_at_dt > last_updated_dt:
                                    if review.get("good_experince"): # Use .get() for safety
                                        good_reviews += 1
                                    else:
                                        bad_reviews += 1
                            
                            except (ValueError, TypeError):
                                # Skip this review if its date is malformed
                                continue

                    # If this is the first match for this uni, add the whole uni object
                    if uni_id not in matched_universities:
                        matched_universities[uni_id] = uni.copy() # Add the full university details
                        # Add a new key to hold the policies that matched
                        matched_universities[uni_id]["matching_clep_exams"] = []

                    # Append the specific matching policy details
                    matched_universities[uni_id]["matching_clep_exams"].append({
                        "course": best_policy["course_names"],
                        "credits_awarded": best_policy["course_credits"],
                        "clep_exam": clep_name,
                        "required_score": best_policy["course_cutoff_score"],
                        "user_score": score,
                        "up_to_date": is_up_to_date,
                        "good_reviews": good_reviews,
                        "bad_reviews": bad_reviews 
                    })
        
        # Convert the dictionary of universities back into a list
        final_results = list(matched_universities.values())

        if not final_results:
            return jsonify({"message": "No matching CLEP policies found"}), 404

        # Return the new, nested list
        return jsonify(final_results), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

