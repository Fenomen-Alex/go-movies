import React, {useEffect, useState} from 'react';
import {Movie} from '../types';
import {Link, useLocation, useParams} from 'react-router-dom';

const OneGenre = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const params = useParams();
  const {state} = useLocation();

  const fetchMovies = async () => {
    const res = await fetch('http://localhost:4000/v1/movies/' + (params as Record<string, unknown>).id);
    if (res.status !== 200 && res.status !== 304) {
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
  if (!movies.length) return <p>No movies of this genre...</p>;
  if (!isLoaded) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <h2>Genre: {state as string}</h2>

      <div className="list-group">
        {movies.map((m) => (
          <Link
            key={m.id}
            to={`/movies/${m.id}`}
            className="list-group-item list-group-item-action"
          >
            {m.title}
          </Link>
        ))}
      </div>
    </>
  );
};

export default OneGenre;
