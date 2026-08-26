import { useState } from "react";

const movies = [
  {
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    rating: 8.8,
    emoji: "🌀",
  },
  {
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
    rating: 9.0,
    emoji: "🦇",
  },
  {
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi",
    rating: 8.7,
    emoji: "🚀",
  },
  {
    title: "The Godfather",
    year: 1972,
    genre: "Crime",
    rating: 9.2,
    emoji: "🎩",
  },
  {
    title: "Avengers: Endgame",
    year: 2019,
    genre: "Action",
    rating: 8.4,
    emoji: "🦸",
  },
  {
    title: "Parasite",
    year: 2019,
    genre: "Thriller",
    rating: 8.5,
    emoji: "🏠",
  },
];

function App() {
  const [accountCreated, setAccountCreated] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && email && password) {
      setAccountCreated(true);
    }
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  if (!accountCreated) {
    return (
      <div className="login-page">
        <div className="login-card">
          <h1>MovieHub</h1>
          <p>Create your account to discover amazing movies</p>

          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Create Account</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-app">
      <nav className="navbar">
        <h1>🎬 MovieHub</h1>
        <span>Welcome, {name}</span>
      </nav>

      <main className="movie-content">
        <div className="hero">
          <h2>Discover Your Next Favorite Movie</h2>
          <p>Explore popular movies and find something great to watch.</p>

          <input
            className="search-box"
            type="search"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <h2>Popular Movies</h2>

        <div className="movie-grid">
          {filteredMovies.map((movie) => (
            <div className="movie-card" key={movie.title}>
              <div className="movie-poster">{movie.emoji}</div>

              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>
                  {movie.year} • {movie.genre}
                </p>
                <strong>⭐ {movie.rating}</strong>
              </div>
            </div>
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <p className="no-results">No movies found.</p>
        )}
      </main>
    </div>
  );
}

export default App;