# app.py (Optimized Python Flask backend)
from flask import Flask, request, jsonify
import dspy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Handle CORS for frontend-backend communication

#from sonarqube import SonarQubeClient

#sonar = SonarQubeClient(sonarqube_url="http://localhost:9000", username='admin', password='admin')

class CodeVulnerabilityDetection(dspy.Signature):
    """You are the best coder who knows all the programming languages and can provide us the best possible solution or correction of a code.
    You can detect all kind of security issues, syntax errors, logical error, possible exceptions and infinite loops.Add proper gaps between the points. Do not greet. Do as stated only."""

    code = dspy.InputField(desc="The source code to analyze for vulnerabilities.")
    result = dspy.OutputField(desc="List of identified vulnerabilities, corresponding fixes:",prefix="Vulnerabilities:")
    fixes = dspy.OutputField(desc="Complete corrected code:",prefix="Fixed code: ")


# DSPy setup with correct model configuration
lm = dspy.GROQ(model="llama3-8b-8192", api_key="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",max_tokens=8192)
dspy.settings.configure(lm=lm)

# Function to format the code in proper markdown block
def format_code_block(code):
    return f"\n{code}\n"

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
        # Format the output
        formatted_output = f"{format_code_block(prediction.result)}"

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