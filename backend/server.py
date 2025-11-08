from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
import sys

# make sure .env in the parent directory is loaded
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(BASE_DIR)
load_dotenv(os.path.join(ROOT_DIR, ".env"))

# verify keys loaded
if not os.getenv("SUPABASE_URL") or not os.getenv("SUPABASE_KEY"):
    print("Missing SUPABASE_URL or SUPABASE_KEY in .env file")

# import routes
sys.path.append(BASE_DIR)
from routes.university_routes import university_bp
from routes.clep_routes import clep_bp
from routes.university_clep_routes import uni_clep_bp

app = Flask(__name__)
CORS(app)

# register routes
app.register_blueprint(university_bp, url_prefix="/universities")
app.register_blueprint(clep_bp, url_prefix="/clepexams")
app.register_blueprint(uni_clep_bp, url_prefix="/universityclep")

if __name__ == "__main__":
    app.run(debug=True)
