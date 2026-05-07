import { useEffect, useRef, useState } from "react";
import "./App.css";

const moodOptions = [
  "happy",
  "sad",
  "depressed",
  "lonely",
  "romantic",
  "angry",
  "stressed",
  "calm",
  "neutral",
  "excited",
];

const moviesByMood = {
  happy: [
    "Inside Out", "La La Land", "The Intern", "Paddington 2", "Chef",
    "Sing", "The Lego Movie", "Mamma Mia!", "School of Rock", "The Princess Bride",
    "Enchanted", "Crazy Rich Asians", "The Parent Trap", "Ferris Bueller's Day Off", "Zootopia",
    "Toy Story", "The Greatest Showman", "Mrs. Doubtfire", "Matilda", "The Holiday",
    "Jumanji: Welcome to the Jungle", "Pitch Perfect", "Shrek", "Ratatouille", "The Secret Life of Pets",
  ],
  sad: [
    "The Pursuit of Happyness", "Forrest Gump", "Good Will Hunting", "A Beautiful Mind", "The Green Mile",
    "The Fault in Our Stars", "Marley & Me", "Me Before You", "Wonder", "The Perks of Being a Wallflower",
    "Bridge to Terabithia", "The Boy in the Striped Pajamas", "The Book Thief", "Life Is Beautiful", "The Impossible",
    "Seven Pounds", "My Sister's Keeper", "Hachi: A Dog's Tale", "Room", "Manchester by the Sea",
    "The Lovely Bones", "A Man Called Otto", "Blue Valentine", "Dear John", "If I Stay",
  ],
  depressed: [
    "Soul", "The Secret Life of Walter Mitty", "Little Miss Sunshine", "It's a Wonderful Life", "Silver Linings Playbook",
    "The Shawshank Redemption", "About Time", "The Intouchables", "The Way Way Back", "Begin Again",
    "The Hundred-Foot Journey", "A Beautiful Day in the Neighborhood", "Julie & Julia", "Amelie", "Big Fish",
    "The Bucket List", "Life of Pi", "Cast Away", "The Truman Show", "The Peanut Butter Falcon",
    "The Fundamentals of Caring", "Brittany Runs a Marathon", "Wild", "Eat Pray Love", "The Pursuit of Happyness",
  ],
  lonely: [
    "Her", "Lost in Translation", "The Terminal", "Cast Away", "Lars and the Real Girl",
    "The Station Agent", "Nomadland", "Moon", "WALL-E", "A Ghost Story",
    "Into the Wild", "The Lunchbox", "Paterson", "Columbus", "Frances Ha",
    "Garden State", "Eternal Sunshine of the Spotless Mind", "Before Sunrise", "The Apartment", "Anomalisa",
    "Drive", "The Martian", "Ad Astra", "Where the Wild Things Are", "The Whale",
  ],
  romantic: [
    "About Time", "La La Land", "The Notebook", "Pride & Prejudice", "Titanic",
    "Notting Hill", "500 Days of Summer", "Before Sunrise", "Before Sunset", "Before Midnight",
    "Me Before You", "The Fault in Our Stars", "A Walk to Remember", "Crazy Rich Asians", "To All the Boys I've Loved Before",
    "The Proposal", "10 Things I Hate About You", "Love, Rosie", "The Vow", "Dear John",
    "Serendipity", "The Holiday", "Pretty Woman", "When Harry Met Sally", "You've Got Mail",
  ],
  angry: [
    "John Wick", "Gladiator", "Mad Max: Fury Road", "The Dark Knight", "Kill Bill: Volume 1",
    "Django Unchained", "The Equalizer", "Taken", "Nobody", "Oldboy",
    "Fight Club", "300", "The Raid", "Atomic Blonde", "Logan",
    "V for Vendetta", "Man on Fire", "The Revenant", "Sicario", "Training Day",
    "The Bourne Ultimatum", "Mission: Impossible - Fallout", "Fury", "Warrior", "Creed",
  ],
  stressed: [
    "Chef", "Paddington 2", "Finding Nemo", "Ratatouille", "The Secret Life of Walter Mitty",
    "The Intern", "Julie & Julia", "The Hundred-Foot Journey", "Kiki's Delivery Service", "My Neighbor Totoro",
    "The Grand Budapest Hotel", "Fantastic Mr. Fox", "Sing Street", "The Holiday", "Mamma Mia!",
    "School of Rock", "The Princess Diaries", "Legally Blonde", "Amelie", "Hunt for the Wilderpeople",
    "Paddington", "The Peanuts Movie", "A Good Year", "The Best Exotic Marigold Hotel", "Christopher Robin",
  ],
  calm: [
    "Soul", "Chef", "Paddington 2", "My Neighbor Totoro", "Kiki's Delivery Service",
    "The Wind Rises", "Ponyo", "A Beautiful Day in the Neighborhood", "The Straight Story", "The Secret Garden",
    "Little Women", "Finding Forrester", "The Hundred-Foot Journey", "Brooklyn", "Paterson",
    "Columbus", "The Lunchbox", "A Good Year", "Julie & Julia", "The Intern",
    "The Terminal", "Ratatouille", "Big Fish", "The Personal History of David Copperfield", "The Guernsey Literary and Potato Peel Pie Society",
  ],
  neutral: [
    "The Martian", "Walter Mitty", "Forrest Gump", "Inception", "Interstellar",
    "The Social Network", "Catch Me If You Can", "The Imitation Game", "Moneyball", "Knives Out",
    "The Prestige", "Ocean's Eleven", "The Grand Budapest Hotel", "Hidden Figures", "The King's Speech",
    "Spotlight", "Ford v Ferrari", "Arrival", "The Truman Show", "The Terminal",
    "The Big Short", "Bridge of Spies", "Apollo 13", "The Founder", "The Theory of Everything",
  ],
  excited: [
    "Spider-Man: Into the Spider-Verse", "Top Gun: Maverick", "Everything Everywhere All at Once", "Avengers: Endgame", "Guardians of the Galaxy",
    "Black Panther", "Dune", "Inception", "Interstellar", "Jurassic Park",
    "Mission: Impossible - Fallout", "Mad Max: Fury Road", "The Dark Knight", "Star Wars: The Force Awakens", "Ready Player One",
    "Pacific Rim", "Baby Driver", "Edge of Tomorrow", "Free Guy", "Jumanji: Welcome to the Jungle",
    "The Matrix", "Avatar", "Tenet", "Kingsman: The Secret Service", "The Avengers",
  ],
};

const platforms = ["Netflix", "Prime Video", "Disney+", "Apple TV"];

const languageSectionsConfig = [
  { label: "English Movies", code: "en", region: "US" },
  { label: "Malayalam Movies", code: "ml", region: "IN" },
  { label: "Tamil Movies", code: "ta", region: "IN" },
  { label: "Hindi Movies", code: "hi", region: "IN" },
  { label: "Japanese Movies", code: "ja", region: "JP" },
  { label: "Korean Movies", code: "ko", region: "KR" },
];

const platformLinks = {
  Netflix: "https://www.netflix.com/search?q=",
  "Prime Video": "https://www.primevideo.com/search/ref=atv_nb_sr?phrase=",
  "Disney+": "https://www.disneyplus.com/search/",
  "Apple TV": "https://tv.apple.com/search?term=",
};

const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const moodReasons = {
  happy: "Bright, funny, and feel-good for a happy mood.",
  sad: "Emotional, hopeful, and comforting for a sad mood.",
  depressed: "Gentle and uplifting when you need emotional support.",
  lonely: "Thoughtful stories about connection and being understood.",
  romantic: "Warm, intimate, and relationship-focused.",
  angry: "Intense action and drama for high-energy emotions.",
  stressed: "Light, relaxing, and easy to watch.",
  calm: "Peaceful, soft, and reflective.",
  neutral: "Balanced entertainment for any normal mood.",
  excited: "Fast, colorful, and full of energy.",
};

const moodGenreMap = {
  happy: "35,10749",
  sad: "18,10749",
  depressed: "18,35",
  lonely: "18,10749",
  romantic: "10749,18",
  angry: "28,53,80",
  stressed: "35,18",
  calm: "18,10749",
  neutral: "",
  excited: "28,12,878",
};

function getFallbackPosterUrl(title) {
  return `https://placehold.co/300x450/141414/ffffff?text=${encodeURIComponent(
    title
  )}`;
}

async function fetchTmdbPoster(title) {
  if (!TMDB_ACCESS_TOKEN) {
    return getFallbackPosterUrl(title);
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        title
      )}&include_adult=false&language=en-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
          accept: "application/json",
        },
      }
    );

    const data = await response.json();
    const movie = data.results?.[0];

    if (!movie?.poster_path) {
      return getFallbackPosterUrl(title);
    }

    return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  } catch (error) {
    return getFallbackPosterUrl(title);
  }
}

async function fetchLanguageMovies(mood, languageConfig) {
  if (!TMDB_ACCESS_TOKEN) {
    return movieSuggestions[mood].slice(0, 12);
  }

  const titlesFromOtherMoods = getReservedTitlesForOtherMoods(mood);
  const genreQuery = moodGenreMap[mood]
    ? `&with_genres=${moodGenreMap[mood]}`
    : "";
  const excludedGenres = "16,10751";

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_original_language=${languageConfig.code}&region=${languageConfig.region}&without_genres=${excludedGenres}${genreQuery}`,
      {
        headers: {
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
          accept: "application/json",
        },
      }
    );

    const data = await response.json();

    return (data.results || [])
      .filter((movie) => {
        const title = (movie.title || movie.original_title || "").toLowerCase();

        return movie.poster_path && !titlesFromOtherMoods.has(title);
      })
      .slice(0, 18)
      .map((movie, index) => ({
        title: movie.title || movie.original_title,
        platform: platforms[index % platforms.length],
        reason: moodReasons[mood],
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      }));
  } catch (error) {
    return movieSuggestions[mood].slice(0, 12);
  }
}

function createMovie(title, mood, index) {
  return {
    title,
    platform: platforms[index % platforms.length],
    reason: moodReasons[mood],
    poster: "",
  };
}

const movieSuggestions = Object.fromEntries(
  Object.entries(moviesByMood).map(([mood, titles]) => [
    mood,
    titles.map((title, index) => createMovie(title, mood, index)),
  ])
);

function getReservedTitlesForOtherMoods(activeMood) {
  return new Set(
    Object.entries(moviesByMood)
      .filter(([mood]) => mood !== activeMood)
      .flatMap(([, titles]) => titles.map((title) => title.toLowerCase()))
  );
}

function getWatchUrl(movie) {
  const platformBaseUrl =
    platformLinks[movie.platform] || "https://www.google.com/search?q=";

  return `${platformBaseUrl}${encodeURIComponent(movie.title)}`;
}

function App() {
  const [emotion, setEmotion] = useState("");
  const [method, setMethod] = useState("");
  const [movies, setMovies] = useState(movieSuggestions.happy);
  const [languageSections, setLanguageSections] = useState([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState("");
  const [showMoodPicker, setShowMoodPicker] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const webcamStreamRef = useRef(null);
  const photoInputRef = useRef(null);
  const audioStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    const activeMood = emotion || "happy";

    async function loadLanguageSections() {
      setIsLoadingMovies(true);

      const sections = await Promise.all(
        languageSectionsConfig.map(async (section) => ({
          ...section,
          movies: await fetchLanguageMovies(activeMood, section),
        }))
      );

      setLanguageSections(sections);
      setIsLoadingMovies(false);
    }

    loadLanguageSections();
  }, [emotion]);

  function showResults(selectedMethod, detectedEmotion) {
    const selectedMood = movieSuggestions[detectedEmotion]
      ? detectedEmotion
      : "neutral";

    setMethod(selectedMethod);
    setEmotion(selectedMood);
    setMovies(movieSuggestions[selectedMood]);
  }

  async function openWebcam() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      webcamStreamRef.current = stream;
      setIsWebcamOpen(true);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (error) {
      alert("Camera permission was denied or camera is not available.");
    }
  }

  async function captureWebcamEmotion() {
    if (!videoRef.current || !canvasRef.current) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("file", blob, "webcam.jpg");

      try {
        const response = await fetch("http://127.0.0.1:8000/detect/photo", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        showResults("Webcam", data.mood);
      } catch (error) {
        alert("Could not detect emotion from webcam.");
      }
    }, "image/jpeg");
  }

  function closeWebcam() {
    if (webcamStreamRef.current) {
      webcamStreamRef.current.getTracks().forEach((track) => track.stop());
      webcamStreamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsWebcamOpen(false);
  }

  async function handlePhotoUpload(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/detect/photo", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      showResults("Photo Upload", data.mood);
    } catch (error) {
      alert("Could not detect emotion from the photo.");
    }
  }

  async function startVoiceRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      audioStreamRef.current = stream;
      audioChunksRef.current = [];

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      recorder.onstop = () => {
        setVoiceMessage("Voice recorded successfully.");
        showResults("Voice Recognition", "calm");

        if (audioStreamRef.current) {
          audioStreamRef.current.getTracks().forEach((track) => track.stop());
          audioStreamRef.current = null;
        }
      };

      recorder.start();
      setIsRecording(true);
      setVoiceMessage("Recording voice...");
    } catch (error) {
      alert("Microphone permission was denied or microphone is not available.");
    }
  }

  function stopVoiceRecording() {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
      setIsRecording(false);
    }
  }

  return (
    <div className="app">
      <nav className="navbar">
        <h1 className="logo">MoodFlix</h1>

        <div className="navLinks">
          <span>Home</span>
          <span>My Mood</span>
          <span>Watchlist</span>
        </div>
      </nav>

      <section className="hero">
        <div className="heroContent">
          <p className="tag">Emotion based movie recommendations</p>
          <h2>Find the perfect movie for how you feel.</h2>
          <p className="subtitle">
            Detect your emotion automatically or choose your mood manually to
            get movie suggestions and streaming platforms.
          </p>

          <div className="actionButtons">
            <button onClick={openWebcam}>Use Webcam</button>

            <button onClick={() => photoInputRef.current.click()}>
              Upload Photo
            </button>

            {!isRecording ? (
              <button onClick={startVoiceRecording}>Record Voice</button>
            ) : (
              <button onClick={stopVoiceRecording}>Stop Recording</button>
            )}

            <button
              className="secondaryButton"
              onClick={() => setShowMoodPicker(!showMoodPicker)}
            >
              Choose Mood
            </button>
          </div>

          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handlePhotoUpload}
          />

          {isWebcamOpen && (
            <div className="webcamBox">
              <video ref={videoRef} autoPlay playsInline></video>
              <canvas ref={canvasRef} hidden></canvas>

              <div className="webcamActions">
                <button onClick={captureWebcamEmotion}>Capture Emotion</button>
                <button className="secondaryButton" onClick={closeWebcam}>
                  Turn Off Webcam
                </button>
              </div>
            </div>
          )}

          {voiceMessage && <p className="voiceStatus">{voiceMessage}</p>}

          {showMoodPicker && (
            <div className="moodPanel">
              <p>Choose your mood</p>

              <div className="moodPicker">
                {moodOptions.map((mood) => (
                  <button
                    key={mood}
                    className={`moodButton ${
                      emotion === mood ? "activeMood" : ""
                    }`}
                    onClick={() => showResults("Manual Mood Selection", mood)}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>
          )}

          {emotion && (
            <div className="resultBox">
              <p>Detection Method: {method}</p>
              <h3>Estimated Emotion: {emotion}</h3>
            </div>
          )}
        </div>
      </section>

      <section className="movieSection">
        <div className="movieSectionHeader">
          <h3>
            {emotion
              ? `Movies for your ${emotion} mood`
              : "Recommended for you"}
          </h3>
          {isLoadingMovies && <p>Loading real movie posters...</p>}
        </div>

        {languageSections.map((section) => (
          <div className="languageSection" key={section.code}>
            <h4>{section.label}</h4>

            <div className="movieRow">
              {section.movies.map((movie) => (
                <div className="movieCard" key={`${section.code}-${movie.title}`}>
                  <div className="poster">
                    <img
                      src={movie.poster || getFallbackPosterUrl(movie.title)}
                      alt={`${movie.title} poster`}
                    />
                    <span>{movie.platform}</span>
                  </div>

                  <div className="movieInfo">
                    <h4>{movie.title}</h4>
                    <p>{movie.reason}</p>

                    <a
                      className="watchButton"
                      href={getWatchUrl(movie)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Watch on {movie.platform}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
