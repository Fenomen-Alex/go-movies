import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Movie} from '../types';

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchMovies = async () => {
    const res = await fetch('http://localhost:4000/v1/movies');
    if (res.status !== 200) {
      const err = new Error('Invalid status code ' + res.status);
      setError(err);
      setIsLoaded(true);
      return;
    }
    const json = await res.json();
    setMovies(json.movies);
    setIsLoaded(true);
    return;
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  if (!isLoaded) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h2>Choose a movie</h2>

      <div className="list-group">
        {movies.map((m) => (
          <Link
            to={`/movies/${m.id}`}
            key={m.id}
            className="list-group-item list-group-item-action"
          >
            {m.title}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Movies;
