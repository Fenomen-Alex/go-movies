import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Movie} from '../types';

const OneMovie = () => {
  const [movie, setMovie] = useState<Movie>({
    description: '',
    genres: [],
    mpaa_rating: '',
    rating: null as unknown as number,
    release_date: undefined as unknown as Date,
    year: null as unknown as number,
    id: null as unknown as number,
    title: '',
    runtime: null as unknown as number,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const params = useParams();

  const fetchMovie = async () => {
    const res = await fetch('http://localhost:4000/v1/movie/' + (params as Record<string, unknown>).id);
    if (res.status !== 200) {
      const err = new Error('Invalid status code ' + res.status);
      setError(err);
      setIsLoaded(true);
      return;
    }
    const json = await res.json();
    setMovie(json.movie);
    if (json.movie.genres) {
      setMovie((movie) => ({...movie, genres: Object.values(movie.genres)}));
    } else {
      setMovie((movie) => ({...movie, genres: []}));
    }
    setIsLoaded(true);
    return;
  };
  useEffect(() => {
    if (!movie.id) {
      fetchMovie();
    }
  }, []);
  if (!isLoaded) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h2><>Movie: {movie.title} ({movie.year})</></h2>

      <div className="float-start">
        <small>Rating {movie.mpaa_rating}</small>
      </div>
      <div className="float-end">
        {movie.genres.map((g, i) => (
          <span
            key={i}
            className="badge bg-secondary me-1"
          >
            {g as unknown as string}
          </span>
        ))}
      </div>

      <div className="clearfix" />

      <hr />

      <table className="table table-compact table-striped">
        <thead></thead>
        <tbody>
          <tr>
            <td><strong>Title:</strong></td>
            <td>{movie.title}</td>
          </tr>
          <tr>
            <td><strong>Description:</strong></td>
            <td>{movie.description}</td>
          </tr>
          <tr>
            <td><strong>Run time:</strong></td>
            <td>{movie.runtime} minutes</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default OneMovie;
