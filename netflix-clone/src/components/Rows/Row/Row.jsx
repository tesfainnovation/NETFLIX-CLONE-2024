import "./row.css";
import { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get(fetchUrl);
        console.log("Fetching data from:", fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching movie data!");
      }
    };

    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      // If trailer is already playing, close it
      setTrailerUrl("");
    } else {
      // Fetch the movie trailer
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          if (url) {
            try {
              const parsedUrl = new URL(url);
              const urlParams = new URLSearchParams(parsedUrl.search);
              const videoId = urlParams.get("v");

              if (videoId) {
                setTrailerUrl(videoId); // Set the trailer URL to the video ID
              } else {
                toast.error("Sorry, no trailer available for this movie!");
              }
            } catch (error) {
              console.error("Invalid URL format:", error);
              toast.error("Sorry, no trailer available for this movie!");
            }
          } else {
            toast.error("No trailer URL found for this movie.");
          }
        })
        .catch((error) => {
          console.error("Error fetching trailer:", error);
          toast.error("Sorry, no trailer available for this movie!");
        });
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row_posters">
        {movies?.map((movie, index) => (
          <img
            onClick={() => handleClick(movie)}
            key={index}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
          />
        ))}
      </div>

      <div style={{ padding: "20px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Row;

