import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class AnimeRecommender:
    def __init__(self, csv_path):
        # Load dataset
        self.df = pd.read_csv(csv_path)
        self.df = self.df[['Title', 'Genres', 'Synopsis']]
        self.df.dropna(inplace=True)
        self.df.drop_duplicates(subset='Title', inplace=True)
        self.df.reset_index(drop=True, inplace=True)

        # Feature engineering
        self.df['combined_features'] = (
            self.df['Genres'] + " " + self.df['Synopsis']
        )

        # TF-IDF (unsupervised learning)
        self.tfidf = TfidfVectorizer(
            stop_words='english',
            max_features=5000
        )
        self.tfidf_matrix = self.tfidf.fit_transform(
            self.df['combined_features']
        )

        # Similarity matrix
        self.cosine_sim = cosine_similarity(self.tfidf_matrix)

        # Mapping anime name -> index
        self.indices = pd.Series(
            self.df.index, index=self.df['Title']
        ).drop_duplicates()

    def recommend_from_list(self, anime_list, top_n=10):
        """
        anime_list: list of anime names from user
        top_n: number of recommendations
        """

        # Keep only valid anime
        valid_anime = [
            anime for anime in anime_list
            if anime in self.indices
        ]

        if len(valid_anime) == 0:
            return []

        # Get indices
        anime_indices = [self.indices[anime] for anime in valid_anime]

        sim_vectors = self.cosine_sim[anime_indices]
        mean_sim = np.mean(sim_vectors, axis=0)

        sim_scores = list(enumerate(mean_sim))
        sim_scores = sorted(
            sim_scores, key=lambda x: x[1], reverse=True
        )

        # Exclude input anime
        input_indices = set(anime_indices)

        recommendations = []
        for idx, score in sim_scores:
            if idx not in input_indices:
                row = self.df.iloc[idx]
                recommendations.append({
                    "title": row['Title'],
                    "genres": row['Genres'],
                    "synopsis": row['Synopsis']
                })
            if len(recommendations) == top_n:
                break

        return recommendations
