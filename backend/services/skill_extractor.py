import re


SKILL_KEYWORDS = {
    "python": "Python",
    "c++": "C++",
    "java": "Java",
    "javascript": "JavaScript",
    "typescript": "TypeScript",
    "html": "HTML",
    "css": "CSS",
    "react": "React",
    "node.js": "Node.js",
    "nodejs": "Node.js",
    "express": "Express.js",
    "flask": "Flask",
    "fastapi": "FastAPI",
    "sql": "SQL",
    "mysql": "MySQL",
    "mongodb": "MongoDB",
    "git": "Git",
    "github": "GitHub",
    "docker": "Docker",
    "machine learning": "Machine Learning",
    "deep learning": "Deep Learning",
    "tensorflow": "TensorFlow",
    "keras": "Keras",
    "pytorch": "PyTorch",
    "opencv": "OpenCV",
    "nlp": "NLP",
    "natural language processing": "NLP",
    "generative ai": "Generative AI",
    "genai": "Generative AI",
    "rag": "RAG",
    "langchain": "LangChain",
    "data analysis": "Data Analysis",
    "pandas": "Pandas",
    "numpy": "NumPy",
    "matplotlib": "Matplotlib",
    "scikit-learn": "Scikit-learn",
    "sklearn": "Scikit-learn",
}


def extract_skills(text: str) -> list[str]:
    """
    Extract known technical skills from resume text.
    """

    text_lower = text.lower()

    found_skills = []

    for keyword, skill_name in SKILL_KEYWORDS.items():

        if keyword in text_lower:
            if skill_name not in found_skills:
                found_skills.append(skill_name)

    return found_skills


