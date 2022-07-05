import React, { useState, useEffect } from 'react';
import { getTopRateMovies } from '../../api/movie';
import { useNotification } from '../../hooks';
import GridContainer from '../GridContainer';
import MovieList from './MovieList';

export default function TopRatedWebSeries() {
  const [movies, setMovies] = useState([]);
  const { updateNotification } = useNotification();

  const fetchMovies = async () => {
    const { error, movies } = await getTopRateMovies('Web Series');
    if (error) return updateNotification('error', error);

    setMovies([...movies]);
  };

  useEffect(() => {
    fetchMovies();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <MovieList movies={movies} title="Viewers choice (Web Series)" />;
}
