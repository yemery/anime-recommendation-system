# Anime Recommendation System

A modern, AI-powered anime recommendation system that helps users discover their next favorite anime series. This full-stack application uses machine learning to provide personalized anime suggestions based on user preferences.

## ✨ Features

- **Personalized Recommendations**: Get anime suggestions based on your preferences
- **Modern UI**: Clean, responsive design with dark/light mode support
- **Rich Anime Database**: Access to thousands of anime titles with detailed information
- **Advanced Search**: Find anime by title, genre, or other criteria
- **User Profiles**: Save your favorite anime and track your watch history
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🚀 Tech Stack

### Frontend
- **React** - JavaScript library for building user interfaces
- **Ant Design** - Enterprise-class UI design language
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Declarative routing for React
- **Axios** - Promise-based HTTP client

### Backend
- **FastAPI** - Modern, fast (high-performance) web framework
- **Python** - Programming language
- **Jikan API** - Unofficial MyAnimeList API
- **Scikit-learn** - Machine learning library for recommendations
- **SQLAlchemy** - SQL toolkit and ORM

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or later)
- Python (3.8 or later)
- npm or yarn

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/anime-rec-sys.git
   cd anime-rec-sys/backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. Run the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Project Structure

```
anime-rec-sys/
├── backend/               # Backend server
│   ├── app/               # Application source code
│   │   ├── __init__.py
│   │   ├── main.py        # FastAPI application
│   │   └── services/      # Business logic
│   ├── requirements.txt   # Python dependencies
│   └── .env.example       # Example environment variables
│
├── frontend/              # Frontend React application
│   ├── public/            # Static files
│   └── src/               # Source files
│       ├── components/    # Reusable UI components
│       ├── pages/         # Page components
│       ├── services/      # API services
│       └── App.jsx        # Main application component
│
└── README.md              # This file
```

## 🌐 API Endpoints

### Anime
- `GET /anime` - Get list of anime
  - Query params: `page`, `limit`, `q` (search query), `type`
- `GET /anime/{id}` - Get anime details
- `POST /recommend` - Get anime recommendations
  - Body: `{ "anime_list": ["Naruto", "Attack on Titan"], "top_n": 10 }`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Jikan API](https://jikan.moe/) for the anime data
- [MyAnimeList](https://myanimelist.net/) for the comprehensive anime database
- [Ant Design](https://ant.design/) for the UI components

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - your.email@example.com

Project Link: [https://github.com/yourusername/anime-rec-sys](https://github.com/yourusername/anime-rec-sys)
