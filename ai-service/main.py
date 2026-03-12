from fastapi import FastAPI, UploadFile, File
import numpy as np
import cv2

app = FastAPI()

@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):

    contents = await file.read()

    nparr = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    #damage detection
    edges = cv2.Canny(gray, 50, 150)
    edge_pixels = np.sum(edges > 0)

    visual_damage = edge_pixels / 100000

    #blur detection
    blur_score = cv2.Laplacian(gray, cv2.CV_64F).var()
    image_quality = min(1, blur_score / 1000)

    #severity calculation
    severity = (0.70 * visual_damage) + (0.30 * image_quality)

    severity_score = min(10, severity * 10)

    if severity_score < 3:
        level = "Low"
    elif severity_score < 6:
        level = "Medium"
    else:
        level = "High"

    return {
        "visual_damage_score": round(float(visual_damage),2),
        "image_quality_score": round(float(image_quality),2),
        "severity_score": round(float(severity_score),2),
        "severity_level": level
    }