# app.py (Optimized Python Flask backend)
from flask import Flask, request, jsonify
import dspy
import requests
import re
import base64
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

GROQ_API_KEY = os.getenv('GROQ_API_KEY')
GROQ_MODEL = os.getenv('GROQ_MODEL')
MAX_TOKEN = int(os.getenv('MAX_TOKEN',8192))
PORT = int(os.getenv('PORT',5000))

app = Flask(__name__)
CORS(app)  # Handle CORS for frontend-backend communication

extensions = [
    'py', 'js', 'jsx', 'ts', 'tsx', 'java', 'c', 'cpp', 'cc', 'cxx', 'cs', 'go', 'php', 'rb',
    'swift', 'kt', 'kts', 'rs', 'dart', 'pl', 'lua', 'r', 'hs', 'scala', 'sh', 'm', 'groovy', 'jl',
    'ex', 'exs', 'vb', 'coffee', 'fs', 'erl', 'hrl', 'cob', 'cbl', 'f90', 'f95', 'sql'
]

# Create regex pattern for file extensions
pattern = re.compile(r'^.*\.(?!\.)({})$'.format('|'.join(extensions)))
class CodeVulnerabilityDetection(dspy.Signature):
    """You are a skilled coder proficient in all programming languages, providing optimal solutions and corrections for code.
    You can identify various security issues, syntax errors, logical errors, potential exceptions, and infinite loops. Ensure there are proper spaces between points. Avoid greetings and strictly follow the instructions. Provide outputs formatted for JS Markdown. Format the code output correctly"""

    code = dspy.InputField(desc="The source code that requires analysis for vulnerabilities. If input is not a code then Strictly Say 'Sorry, i can only process codes'. Do not process anything or create any functions.")
    
    # Use a single output field to consolidate results
    output = dspy.OutputField(
        desc="List of detected vulnerabilities, suggested fixes, and the complete corrected code, all formatted appropriately in bullet points. Do not output the input code NEVER.",
        prefix="Analysis Result:"
    )

    def process(self):
        # This method can be used to combine result and fixes
        vulnerabilities = self.detect_vulnerabilities(self.code)
        fixes = self.provide_fixes(self.code)

        # Combine and format the output
        self.output = self.format_output(vulnerabilities, fixes)

    def detect_vulnerabilities(self, code):
        # Logic to analyze code and detect vulnerabilities
        vulnerabilities = []
        # Sample analysis logic (replace with actual detection)
        if "eval(" in code:
            vulnerabilities.append("The use of eval() can lead to code injection vulnerabilities.")
        
        # Add more checks here as needed
        return vulnerabilities

    def provide_fixes(self, code):
        # Logic to suggest fixes based on detected vulnerabilities
        fixed_code = code  # Assuming fixed code is the same initially
        # Sample fix logic (replace with actual fix)
        if "eval(" in code:
            fixed_code = fixed_code.replace("eval(", "safe_eval(")  # Just an example
            
        return fixed_code

    def format_output(self, vulnerabilities, fixed_code):
        formatted_vulnerabilities = "\n".join(vulnerabilities)
        formatted_code = self.format_code_block(fixed_code)
        
        return (
            f"**Identified Vulnerabilities:**\n"
            f"{formatted_vulnerabilities}\n\n"
            f"**Corrected Code:**\n"
            f"{formatted_code}"
        )

    @staticmethod
    def format_code_block(code):
        # Ensure the code is properly indented and formatted
        return '```\n'.join(line for line in code.splitlines() if line)  # Remove empty lines and keep indentation



# DSPy setup with correct model configuration
lm = dspy.GROQ(model=GROQ_MODEL, api_key=GROQ_API_KEY,max_tokens=MAX_TOKEN)
dspy.settings.configure(lm=lm)

# Function to format the code in proper markdown block
def format_code_block(code):
    return f"\n{code}\n"

def is_valid_file_extension(file_name):
    # Check if file is not a .* file (hidden file) and matches the allowed extensions
    if not file_name.startswith('.') and pattern.match(file_name):
        return True
    return False

def is_github_repo_url(url):
    # Regular expression to match GitHub repository URLs
    pattern = re.compile(
        r'(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/[A-Za-z0-9._-]+\/?$'
    )
    match = pattern.search(url)
    return match.group(0) if match else None

def extract_repo_info(repo_url):
    match = re.match(r"https?://github\.com/([^/]+)/([^/]+)", repo_url)
    if match:
        return match.group(1), match.group(2)
    else:
        raise ValueError("Invalid GitHub repository URL")

def get_repo_files(owner, repo, path=""):
    url = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}"
    response = requests.get(url)
    
    if response.status_code == 200:
        items = response.json()
        files = []

        for item in items:
            if item['type'] == 'file':
                files.append(item['path'])  # Store the path of the file
            elif item['type'] == 'dir':
                # If it's a directory, recursively fetch files from that directory
                print(f"Found directory: {item['path']}, fetching files...")
                files += get_repo_files(owner, repo, item['path'])  # Recursively add files
        
        return files
    else:
        print(f"Failed to fetch repository contents: {response.status_code} {response.json()}")
        return []
    
def get_suggestions(file_content):
    predict = dspy.Predict(CodeVulnerabilityDetection)
    prediction = predict(code=file_content)
    # Format the output
    formatted_output = f"{format_code_block(prediction.output)}"
    return formatted_output

def get_file_content(owner, repo, file_path):
    url = f"https://api.github.com/repos/{owner}/{repo}/contents/{file_path}"
    headers = {
        "Accept": "application/vnd.github.v3+json"
    }
    print(f"Fetching content for file: {file_path} from {url}")
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        file_data = response.json()
        content = file_data['content']
        decoded_content = base64.b64decode(content).decode('utf-8')
        print(f"Successfully fetched content for {file_path}.")
        return decoded_content
    else:
        print(f"Failed to fetch {file_path}: {response.status_code} {response.json()}")
        return None

# Route to analyze code for vulnerabilities
@app.route('/api/analyze', methods=['POST'])
def analyze_code():
    try:
        # Get JSON data from request body
        data = request.json  
        code_snippet = data.get('message')
        url = code_snippet
        if is_github_repo_url(url):
            final_txt = ''
            url = is_github_repo_url(url)
            f = extract_repo_info(url)
            if f==None:
                    jsonify({"reply": final_txt, "status": "success"}), 200 
            for file in get_repo_files(f[0],f[1]):
                if not file:
                    jsonify({"reply": final_txt, "status": "success"}), 200
                if is_valid_file_extension(file):
                    file_content = get_file_content(f[0],f[1],file)
                    if file_content==None:
                        return jsonify({"reply": final_txt, "status": "success"}), 200
                    final_txt += f'<br><b><u>Fetching file: {file}</u></b><br><br>' + get_suggestions(file_content) + f'<br><br><hr><br><br>'

            return jsonify({"reply": final_txt, "status": "success"}), 200
        if not code_snippet:
            return jsonify({"error": "No code provided"}), 400

        # DSPy prediction for code analysis
        formatted_output = get_suggestions(code_snippet)

        # Return the formatted response
        return jsonify({"reply": formatted_output, "status": "success"}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "Internal server error", "status": "error"}), 500
# Basic route to check server status
@app.route('/')
def home():
    return jsonify({"message": "Backend is running!", "status": "success"})

# Start the Flask server
if __name__ == '__main__':
    app.run(port=PORT)