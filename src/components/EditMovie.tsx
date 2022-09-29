/* eslint-disable no-unused-vars */
import React, {FormEventHandler, useState} from 'react';
import {Movie} from '../types';

const mpaa = ['G', 'PG', 'PG13', 'R', 'NC17'];

const EditMovie = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    const name = e.target.name;
    setMovie((movie) => ({...movie, [name]: value}));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('submitted', e);
    e.preventDefault();
  };

  return (
    <>
      <h2>Add/Edit movie</h2>
      <hr/>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            htmlFor="title"
            className="form-label fw-bold"
          >
            Title
          </label>
          <input
            className="form-control"
            type="text"
            id="title"
            name="title"
            value={movie.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="release_date"
            className="form-label fw-bold"
          >
            Release Date
          </label>
          <input
            className="form-control"
            type="date"
            id="release_date"
            name="release_date"
            value={movie.release_date as unknown as string}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="runtime"
            className="form-label fw-bold"
          >
            Runtime
          </label>
          <input
            className="form-control"
            type="number"
            id="runtime"
            name="runtime"
            value={movie.runtime}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="runtime"
            className="form-label fw-bold"
          >
            MPAA Rating
          </label>
          <select
            className="form-select"
            name="mpaa_rating"
            id="mpaa_rating"
            value={movie.mpaa_rating}
            onChange={handleChange}
          >
            <option className="form-select">Choose...</option>
            {mpaa.map((r) => (
              <option
                className="form-select"
                key={r}
                value={r}

              >
                {r}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label
            htmlFor="rating"
            className="form-label fw-bold"
          >
            Rating
          </label>
          <input
            className="form-control"
            type="number"
            id="rating"
            name="rating"
            value={movie.rating}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="description"
            className="form-label fw-bold"
          >
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={movie.description}
            onChange={handleChange}
            rows={3}
          />
        </div>
        <hr/>
        <button className="btn btn-primary">Save</button>
      </form>
    </>
  );
};

export default EditMovie;
