# CYWRECK

---

# 🚀 **PROJECT NAME**: **Code Vulnerability System for CYWRECK**

A powerful AI chatbot for **real-time code generation and correction** that integrates **LLM-powered vulnerability detection** using **DSPy** and the **GROQ API**. This project helps analyze code for syntax errors, security vulnerabilities, and code quality improvements with the assistance of cutting-edge **LLMs**.

---

## 📚 **Technologies Used**

- **Frontend**: React.js
- **Backend**: Flask (Python)
- **Machine Learning**: LLM-based DSPy (Llama3)
- **LLM Integration**: GROQ-API
- **Version Control**: Git

---

## ⚙️ **Features**

- 🔍 **Real-time code vulnerability detection** using DSPy
- 📡 **API-driven architecture** ensuring smooth communication between frontend and backend
- 🔐 **Cross-Origin Resource Sharing (CORS)** enabled for secure interaction
- 📊 **LLM-powered static code generation** with DSPy and GROQ-API for code correctness and security
- 🎉 **Quick Code Generation** with Llama
- 📜 **Prompt Programming** using DSPy

---

## 🎯 **Use Case Scenarios**

Our Code Vulnerability System can be applied in various environments where code quality, security, and performance matter. Below are a few key use cases:

### **Checking Vulnerabilities in the code**

- Automatically detect security flaws, potential bugs, and poor coding practices in the code. 
This ensures proactive resolution of issues before they impact production.


### **Scanning GitHub Repositories for Code Errors**

- Integrate the system with GitHub to automatically scan repositories for vulnerabilities and syntax errors 
in the code, and generate the correct code for the files.

### **Generating Code for Development Questions**

- Users can give a prompt to generate code for some program. The AI chatbot will generate the accurate code.

---

## 💻 **System Requirements**

Before starting, ensure that you have the following dependencies installed on your machine:

### 🟢 **1. Node.js**
   - Required to run the **React.js** frontend.
   - Download and install from [Node.js Official Website](https://nodejs.org/).
   
   ![Node.js Logo](https://nodejs.org/static/images/logo.svg)
   
   - Verify installation:
     ```bash
     node -v
     npm -v
     ```

### 🐍 **2. Python (Version 3.x)**
   - Necessary for running the **Flask** backend.
   - Install from [Python Official Website](https://www.python.org/).

   ![Python Logo](https://www.python.org/static/community_logos/python-logo-master-v3-TM-flattened.png)
   
   - Verify installation:
     ```bash
     python --version
     pip --version
     ```

---

## 🛠️ **Setup & Installation**

Follow these steps to set up the project on your local machine.

### 1. **Clone the Repository**

```bash
git clone https://github.com/AyushKumar000/shadow.git
cd shadow
```

### 2. **Install Dependencies**

From the **root** directory, install all dependencies by running:

```bash
npm i
```

**Main Dependencies**:

- **Flask**: Web framework for the backend
- **DSPy**: LLM integration
- **React.js**: Frontend framework

### 3. **Running the Project**

Navigate to the **root** folder and execute the following command to start both the frontend and backend:

```bash
npm start
```

Wait for a moment and the project will be up and running! 🎉

---

## 🌟 **Project Structure**

```bash
.
├── backend                 # Flask API code
|   ├── .env                # contains all the API's and Tokens
│   ├── app.py              # Main server file
│   ├── requirements.txt    # Python dependencies
├── frontend                # React app
│   ├── src/
│   │   ├── assets/         # Static assets (images, fonts, etc.)
│   │   ├── components/     # React components
│   │   ├── svg/            # SVG icons
│   │   ├── UI/             # UI components (buttons, cards, etc.)
│   │   ├── App.js          # Main app component
│   │   ├── App.css         # App-level styles
│   │   ├── index.js        # Main entry point
│   │   ├── index.css       # Global styles
│   │   ├── CodeSnippet.js  # Component for displaying code snippets
│   ├── public/             # Public folder for static files
│   └── package.json        # Frontend dependencies
└── README.md               # You are here
```


## 📜 **License**

This project has been built for TRANSFINITTE-24.
