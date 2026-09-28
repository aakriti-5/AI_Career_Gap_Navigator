from fastapi import APIRouter, HTTPException
import requests

router = APIRouter()

AI_SERVICE_URL = "http://127.0.0.1:5001"


@router.get("/analysis/test")
def analysis_test():
    return {
        "message": "Analysis route is working"
    }


@router.get("/analysis/health")
def analysis_health():
    try:
        response = requests.get(
            f"{AI_SERVICE_URL}/health",
            timeout=5
        )

        return {
            "backend": "ok",
            "ai_service": response.json()
        }

    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"AI service unavailable: {str(e)}"
        )


@router.get("/analysis/roles")
def get_roles():
    try:
        response = requests.get(
            f"{AI_SERVICE_URL}/roles",
            timeout=5
        )

        response.raise_for_status()
        return response.json()

    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"Could not get roles from AI service: {str(e)}"
        )


@router.post("/analysis/analyze")
def analyze_profile(data: dict):
    try:
        response = requests.post(
            f"{AI_SERVICE_URL}/analyze",
            json=data,
            timeout=30
        )

        if response.status_code >= 400:
            raise HTTPException(
                status_code=response.status_code,
                detail=response.json()
            )

        return response.json()

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"AI service unavailable: {str(e)}"
        )

        