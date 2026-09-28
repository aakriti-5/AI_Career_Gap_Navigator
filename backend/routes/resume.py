import os
import tempfile

from fastapi import APIRouter, UploadFile, File, HTTPException

from services.resume_parser import parse_resume
from services.skill_extractor import extract_skills


router = APIRouter()


@router.get("/test")
def resume_test():

    return {
        "message": "Resume route is working"
    }


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):

    # Check file type
    allowed_extensions = [".pdf", ".docx"]

    filename = file.filename or ""
    extension = os.path.splitext(filename)[1].lower()

    if extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are supported."
        )

    # Read uploaded file
    file_content = await file.read()

    # Create temporary file
    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=extension
    ) as temp_file:

        temp_file.write(file_content)
        temp_file_path = temp_file.name

    try:

        # Parse resume
        extracted_text = parse_resume(temp_file_path)

        if not extracted_text.strip():
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from the resume."
            )
        skills = extract_skills(extracted_text)

        return {
            "filename": filename,
            "message": "Resume uploaded, parsed, and skills extracted successfully",
            "text": extracted_text,
            "skills": skills
        }

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Error while parsing resume: {str(e)}"
        )

    finally:

        # Delete temporary file
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)



