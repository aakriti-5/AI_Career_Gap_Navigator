from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from routes import analysis, github, interview, resume

load_dotenv()

app = FastAPI(
    title="AI Career Gap Navigator API",
    description="Backend API for AI Career Gap Navigator",
    version="1.0.0"
)


# Allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Routers
app.include_router(analysis.router, prefix="/api", tags=["analysis"])
app.include_router(resume.router, prefix="/api/resume", tags=["resume"])
app.include_router(github.router, prefix="/api/github", tags=["github"])
app.include_router(interview.router, prefix="/api/interview", tags=["interview"])


@app.get("/")
def home():
    return {
        "message": "AI Career Gap Navigator Backend is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


