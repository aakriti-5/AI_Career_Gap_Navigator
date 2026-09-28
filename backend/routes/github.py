from fastapi import APIRouter

router = APIRouter()


@router.get("/test")
def github_test():
    return {
        "message": "GitHub route is working"
    }


