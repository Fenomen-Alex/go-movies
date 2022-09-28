import React, {useEffect, useState} from 'react';
import {Genre} from '../types';
import {Link} from 'react-router-dom';

const Genres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchGenres = async () => {
    const res = await fetch('http://localhost:4000/v1/genres');
    if (res.status !== 200) {
      const err = new Error('Invalid status code ' + res.status);
      setError(err);
      setIsLoaded(true);
      return;
    }
    const json = await res.json();
    setGenres(json.genres);
    setIsLoaded(true);
    return;
  };
  useEffect(() => {
    fetchGenres();
  }, []);
  if (!isLoaded) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h2>Genres</h2>
      <ul>
        {genres.map((g) => (
          <li key={g.id}>
            <Link to={`genre/${g.id}`}>{g.genre_name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Genres;
