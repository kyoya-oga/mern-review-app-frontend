import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSingleMovie } from '../../api/movie';
import { useAuth, useNotification } from '../../hooks';
import Container from '../Container';
import AddRatingModal from '../modals/AddRatingModal';
import RatingStar from '../RatingStar';
import RelatedMovie from '../RelatedMovie';

const convertReviewCount = (count = 0) => {
  if (count <= 999) return count;

  return parseFloat(count / 1000).toFixed(2) + 'k';
};

const convertDate = (date = '') => {
  return date.split('T')[0];
};

export default function SingleMovie() {
  const [movie, setMovie] = useState({});
  const [ready, setReady] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const { movieId } = useParams();
  const navigate = useNavigate();

  const handleOnRateMovie = () => {
    if (!isLoggedIn) return navigate('/auth/signin');
    setShowRatingModal(true);
  };

  const hideRatingModal = () => {
    setShowRatingModal(false);
  };

  const handleOnRatingSuccess = (reviews) => {
    setMovie({ ...movie, reviews: { ...reviews } });
  };

  const fetchMovie = async () => {
    const { error, movie } = await getSingleMovie(movieId);
    if (error) return updateNotification('error', error);

    setMovie(movie);
    setReady(true);
  };

  useEffect(() => {
    if (movieId) fetchMovie();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  if (!ready)
    return (
      <div className="h-screen flex justify-center items-center dark:bg-primary bg-white">
        <p className="text-light-subtle dark:text-dark-subtle animate-pulse">
          Please wait...
        </p>
      </div>
    );

  const {
    trailer,
    poster,
    title,
    id,
    storyLine,
    language,
    releaseDate,
    director = {},
    reviews = {},
    writers = [],
    cast = [],
    genres = [],
    type,
  } = movie;

  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      <Container>
        <video poster={poster} src={trailer} controls></video>
        <div className="flex justify-between">
          <h1 className="text-4xl text-highlight dark:text-highlight-dark font-semibold py-3">
            {title}
          </h1>
          <div className="flex flex-col items-end">
            <RatingStar rating={reviews.ratingAvg} />
            <Link
              className="text-highlight dark:text-highlight-dark hover:underline"
              to={`/movie/reviews/${id}`}
            >
              {convertReviewCount(reviews.reviewCount)} Reviews
            </Link>

            <button
              className="text-highlight dark:text-highlight-dark hover:underline"
              type="button"
              onClick={handleOnRateMovie}
            >
              Rate The Movie
            </button>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-light-subtle dark:text-dark-subtle">{storyLine}</p>

          <div className="flex space-x-2">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Director:
            </p>
            <p className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer">
              {director.name}
            </p>
          </div>

          <div className="flex space-x-2">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Writers:
            </p>
            <div className="flex space-x-2">
              {writers.map((w) => {
                return (
                  <p
                    key={w.id}
                    className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer"
                  >
                    {w.name}
                  </p>
                );
              })}
            </div>
          </div>

          <div className="flex space-x-2">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Cast:
            </p>
            <div className="flex space-x-2">
              {cast.map((c) => {
                return c.leadActor ? (
                  <p
                    key={c.profile.id}
                    className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer"
                  >
                    {c.profile.name}
                  </p>
                ) : null;
              })}
            </div>
          </div>

          <div className="flex space-x-2">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Language:
            </p>
            <p className="text-highlight dark:text-highlight-dark">
              {language}
            </p>
          </div>

          <div className="flex space-x-2">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Release Date:
            </p>
            <p className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer">
              {convertDate(releaseDate)}
            </p>
          </div>

          <div className="flex space-x-2">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Genres:
            </p>
            <div className="flex space-x-2">
              {genres.map((g) => {
                return (
                  <p
                    key={g}
                    className="text-highlight dark:text-highlight-dark"
                  >
                    {g}
                  </p>
                );
              })}
            </div>
          </div>

          <div className="flex space-x-2">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Type:
            </p>
            <p className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer">
              {type}
            </p>
          </div>

          <div>
            <h1 className="text-light-subtle dark:text-dark-subtle font-semibold text-2xl mb-2">
              Cast:
            </h1>
            <div className="grid grid-cols-10 gap-3 ">
              {cast.map((c) => {
                return (
                  <div
                    key={c.profile.id}
                    className="flex flex-col items-center text-center"
                  >
                    <img
                      className="w-24 h-24 rounded-full aspect-square object-cover"
                      src={c.profile.avatar}
                      alt=""
                    />

                    <p className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer">
                      {c.profile.name}
                    </p>

                    <span className="text-light-subtle dark:text-dark-subtle text-sm">
                      as
                    </span>
                    <p className="text-light-subtle dark:text-dark-subtle">
                      {c.roleAs}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <RelatedMovie movieId={movieId} />
        </div>
      </Container>
      <AddRatingModal
        onSuccess={handleOnRatingSuccess}
        visible={showRatingModal}
        onClose={hideRatingModal}
      />
    </div>
  );
}
