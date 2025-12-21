from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from pathlib import Path
from .recommender import AnimeRecommender
from fastapi import Query
import requests

from fastapi.middleware.cors import CORSMiddleware

import os
from dotenv import load_dotenv

load_dotenv()  


JIKAN_BASE_URL = os.getenv("JIKAN_BASE_URL")


app = FastAPI(
    title="Anime Recommendation API",
    description="ML-based Anime Recommendation System",
    version="1.0"
)


# CORS setup (for local development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
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
    limit: int = Query(12, le=24)
):
    """
    Returns paginated anime list with full details
    """
    response = requests.get(
        f"{JIKAN_BASE_URL}/anime",
        params={"page": page, "limit": limit}
    )

    return response.json()
