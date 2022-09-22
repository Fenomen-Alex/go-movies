import React, {useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';

type Movie = {
  id: unknown;
  title: string;
  runtime: number | null;
};

const OneMovie = ({match: {params}}: RouteComponentProps) => {
  const [movie, setMovie] = useState<Movie>({
    id: null,
    title: '',
    runtime: null,
  });

  useEffect(() => {
    setMovie({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      id: params['id'] as unknown,
      title: 'Some movie',
      runtime: 150,
    });
  }, []);

  return (
    <>
      <h2><>Movie: {movie.title} {movie.id}</></h2>

      <table className="table table-compact table-striped">
        <thead></thead>
        <tbody>
          <tr>
            <td><strong>Title:</strong></td>
            <td>{movie.title}</td>
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
