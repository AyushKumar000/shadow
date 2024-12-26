# app.py (Optimized Python Flask backend)
from flask import Flask, request, jsonify
import dspy
from github import Github, GithubException, RateLimitExceededException, BadCredentialsException
import re
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

GROQ_API_KEY = os.getenv('GROQ_API_KEY')
GROQ_MODEL = os.getenv('GROQ_MODEL')
MAX_TOKEN = int(os.getenv('MAX_TOKEN',8192))
PORT = int(os.getenv('PORT',5000))
GITHUB_TOKEN = os.getenv("GITHUB_API_KEY")

g = Github(GITHUB_TOKEN)

app = Flask(__name__)
CORS(app)  # Handle CORS for frontend-backend communication

class CodeVulnerabilityDetection(dspy.Signature):
    """You are the best coder who knows all the programming languages and can provide us the best possible solution or correction of a code."""

    code = dspy.InputField(desc="The source code that requires analysis for vulnerabilities. If there is first input is not a code then Strictly Say 'Sorry, i can only process codes'. Do not process anything or create any functions. Else if there was a code input earlier, then consider it as a follow up question on the former code.")
    
    # Use a single output field to consolidate results
    output = dspy.OutputField(
        desc="List of detected vulnerabilities, suggested fixes, and the complete corrected code, all formatted appropriately in bullet points with appropriate new lines. Do not output the input code NEVER.",
        prefix="Analysis Result:"
    )

    @staticmethod
    def format_code_block(code):
        # Ensure the code is properly indented and formatted
        return '```\n'.join(line for line in code.splitlines() if line)  # Remove empty lines and keep indentation



# DSPy setup with correct model configuration
lm = dspy.GROQ(model="llama3-8b-8192", api_key="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")
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
    try:
        repo = g.get_repo(f"{owner}/{repo}")
        contents = repo.get_contents(path)
        files = []
        
        while contents:
            file_content = contents.pop(0)
            if file_content.type == "dir":
                contents.extend(repo.get_contents(file_content.path))
            else:
                files.append(file_content.path)
        
        return files
    except RateLimitExceededException as e:
        print(f"Rate limit exceeded: {e}")
        return []
    except BadCredentialsException as e:
        print(f"Bad credentials: {e}")
        return []
    except GithubException as e:
        print(f"Failed to fetch repository contents: {e}")
        return []
    
def get_suggestions(file_content):
    predict = dspy.Predict(CodeVulnerabilityDetection)
    prediction = predict(code=file_content)
    # Format the output
    formatted_output = f"{format_code_block(prediction.output)}"
    return formatted_output

def get_file_content(owner, repo, file_path):
    try:
        repo = g.get_repo(f"{owner}/{repo}")
        print(f"Fetching content for file: {file_path} from {owner}/{repo}")
        file_content = repo.get_contents(file_path)
        content = file_content.decoded_content.decode("utf-8")
        print(f"Successfully fetched content for {file_path}.\n")
        return content
    except RateLimitExceededException as e:
        print(f"Rate limit exceeded: {e}")
        return None
    except BadCredentialsException as e:
        print(f"Bad credentials: {e}")
        return None
    except GithubException as e:
        print(f"Failed to fetch {file_path}: {e}")
        return None

# Route to analyze code for vulnerabilities
@app.route('/api/analyze', methods=['POST'])
def analyze_code():
    try:
        # Get JSON data from request body
        data = request.json  
        code_snippet = data.get('message')
        
        if not code_snippet:
            return jsonify({"error": "No code provided"}), 400

        # DSPy prediction for code analysis
        predict = dspy.Predict(CodeVulnerabilityDetection)
        prediction = predict(code=code_snippet)
        final_txt = prediction.result+'\n'+prediction.fixes
        # Format the output
        formatted_output = f"{format_code_block(final_txt)}"

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
    app.run(port=5000)
