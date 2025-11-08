from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from pathlib import Path

# Import route blueprints
from routes.institutions import institutions_bp
from routes.clep_policies import clep_policies_bp
from routes.clep_exams import clep_exams_bp

# Load environment variables from .env file in parent directory
env_path = Path(__file__).parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(institutions_bp, url_prefix='/api')
app.register_blueprint(clep_policies_bp, url_prefix='/api')
app.register_blueprint(clep_exams_bp, url_prefix='/api')


# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    return {"status": "healthy", "message": "Flask backend is running"}, 200


if __name__ == '__main__':
    app.run(debug=True, port=5000)