from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

try:
    from deepface import DeepFace
except:
    DeepFace = None

import tempfile
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def map_emotion_to_mood(emotion):
    emotion_map = {
        "happy": "happy",
        "sad": "sad",
        "angry": "angry",
        "neutral": "neutral",
        "fear": "stressed",
        "surprise": "excited",
        "disgust": "angry",
    }

    return emotion_map.get(emotion, "neutral")


@app.get("/")
def home():
    return {"message": "MoodFlix backend is running"}


@app.post("/detect/photo")
async def detect_photo(file: UploadFile = File(...)):
    temp_file_path = ""

    try:
        if DeepFace is None:
            return {
                "detectedEmotion": "neutral",
                "mood": "neutral",
                "error": "DeepFace not available on server"
            }

        file_bytes = await file.read()

        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
            temp_file.write(file_bytes)
            temp_file_path = temp_file.name

        result = DeepFace.analyze(
            img_path=temp_file_path,
            actions=["emotion"],
            enforce_detection=False,
        )

        if isinstance(result, list):
            result = result[0]

        detected_emotion = result["dominant_emotion"]
        mood = map_emotion_to_mood(detected_emotion)

        return {
            "detectedEmotion": detected_emotion,
            "mood": mood,
        }

    except Exception as error:
        return {
            "detectedEmotion": "unknown",
            "mood": "neutral",
            "error": str(error),
        }

    finally:
        if temp_file_path and os.path.exists(temp_file_path):
            os.remove(temp_file_path)