import { useState } from "react";
import { useChat } from "@ai-sdk/react";

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

function ToolState({ part }) {
  const state = part.state;

  if (state === "input-streaming") {
    return (
      <div className="tool-state tool-streaming">
        <strong>🔄 Preparing movie search...</strong>
        <p>Building the tool input.</p>
      </div>
    );
  }

  if (state === "input-available") {
    return (
      <div className="tool-state tool-input">
        <strong>🔎 Searching movie database</strong>
        <p>
          Movie: <b>{part.input?.title || "Preparing search..."}</b>
        </p>
      </div>
    );
  }

  if (state === "output-available") {
    const movie = part.output?.movie;

    return (
      <div className="tool-state tool-output">
        <strong>🎬 Movie Found</strong>

        {movie ? (
          <div className="ai-movie-card">
            <div className="ai-movie-poster">🎬</div>
            <div>
              <h3>{movie.title}</h3>
              <p>
                {movie.year} • {movie.genre}
              </p>
              <strong>⭐ {movie.rating}</strong>
              <p>{movie.description}</p>
            </div>
          </div>
        ) : (
          <p>No movie data returned.</p>
        )}
      </div>
    );
  }

  if (state === "output-error") {
    return (
      <div className="tool-state tool-error">
        <strong>⚠️ Movie search failed</strong>
        <p>{part.errorText || "The movie could not be found."}</p>
      </div>
    );
  }

  return null;
}

function App() {
  const [accountCreated, setAccountCreated] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [prompt, setPrompt] = useState("");

  const { messages, sendMessage, status } = useChat({
    api: "http://localhost:3001/api/chat",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && email && password) {
      setAccountCreated(true);
    }
  };

  const handleAsk = (e) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    sendMessage({
      text: prompt,
    });

    setPrompt("");
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  if (!accountCreated) {
    return (
      <main className="login-page">
        <div className="login-card">
          <h1>MovieHub</h1>
          <p>Create your account to discover amazing movies</p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="full-name">Full Name</label>
            <input
              id="full-name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              aria-label="Create MovieHub account"
            >
              Create Account
            </button>
          </form>
        </div>
      </main>
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
          <p>
            Explore popular movies and find something great to watch.
          </p>

          <label htmlFor="movie-search">Search movies</label>
          <input
            id="movie-search"
            className="search-box"
            type="search"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <section className="ai-assistant">
          <h2>🤖 AI Movie Assistant</h2>
          <p>
            Ask about a movie and I'll search the movie database.
          </p>

          <form onSubmit={handleAsk} className="ai-form">
            <label htmlFor="ai-movie-prompt">
              Ask the AI about a movie
            </label>

            <input
              id="ai-movie-prompt"
              type="text"
              placeholder="Try: Tell me about Inception"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <button
              type="submit"
              aria-label="Ask AI about the movie"
              disabled={status === "streaming"}
            >
              {status === "streaming" ? "Thinking..." : "Ask AI"}
            </button>
          </form>

          <div className="tool-results">
            {messages.map((message) => (
              <div key={message.id}>
                {message.parts?.map((part, index) => {
                  if (part.type === "text") {
                    return <p key={index}>{part.text}</p>;
                  }

                  if (part.type?.startsWith("tool-")) {
                    return <ToolState key={index} part={part} />;
                  }

                  return null;
                })}
              </div>
            ))}
          </div>
        </section>

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
