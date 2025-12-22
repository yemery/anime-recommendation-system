from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from pathlib import Path
from .recommender import AnimeRecommender
from fastapi import Query, HTTPException
import requests

from fastapi.middleware.cors import CORSMiddleware

import os
from dotenv import load_dotenv

load_dotenv()  


JIKAN_BASE_URL = os.getenv("JIKAN_BASE_URL") or "https://api.jikan.moe/v4"


app = FastAPI(
    title="Anime Recommendation API",
    description="ML-based Anime Recommendation System",
    version="1.0"
)


# CORS setup (for local development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)
# Load ML model ONCE at startup
# Get the path relative to this file
BASE_DIR = Path(__file__).resolve().parent.parent
CSV_PATH = BASE_DIR / "datasets" / "anime.csv"
recommender = AnimeRecommender(str(CSV_PATH))


# -------- REQUEST SCHEMA --------
class AnimeListRequest(BaseModel):
    anime_list: List[str]
    top_n: int = 10


# -------- API ENDPOINT --------
@app.post("/recommend")
def recommend_anime(request: AnimeListRequest):
    recommendations = recommender.recommend_from_list(
        request.anime_list,
        request.top_n
    )

    return {
        "input_anime": request.anime_list,
        "recommendations": recommendations
    }



@app.get("/anime")
def get_anime_list(
    page: int = Query(1, ge=1),
    limit: int = Query(12, le=24),
    q: str = Query(None),
    type: str = Query(None)
):
    """
    Returns paginated anime list with full details
    """
    params = {"page": page, "limit": limit}
    if q:
        params["q"] = q
    if type:
        params["type"] = type
        
    try:
        response = requests.get(
            f"{JIKAN_BASE_URL}/anime",
            params=params,
            timeout=10
        )
        response.raise_for_status()
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=str(e))
    return response.json()
