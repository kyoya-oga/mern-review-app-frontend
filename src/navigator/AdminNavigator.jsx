import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Actors from '../components/admin/Actors';
import Dashboard from '../components/admin/Dashboard';
import Header from '../components/admin/Header';
import Movies from '../components/admin/Movies';
import MovieUpload from '../components/admin/MovieUpload';
import Navbar from '../components/admin/Navbar';
import ActorUpload from '../components/modals/ActorUpload';
import NotFound from '../components/NotFound';

export default function AdminNavigator() {
  const [showMovieUploadModal, setShowMovieUploadModal] = useState(false);
  const [showActorUploadModal, setShowActorUploadModal] = useState(true);

  const hideMovieUploadModal = () => {
    setShowMovieUploadModal(false);
  };

  const hideActorUploadModal = () => {
    setShowActorUploadModal(false);
  };

  const displayMovieUploadModal = () => {
    setShowMovieUploadModal(true);
  };

  const displayActorUploadModal = () => {
    setShowActorUploadModal(true);
  };

  return (
    <>
      <div className="flex dark:bg-primary bg-white">
        <Navbar />
        <div className="flex-1 p-2 max-w-screen-xl">
          <Header
            onAddMovieClick={displayMovieUploadModal}
            onAddActorClick={displayActorUploadModal}
          />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/actors" element={<Actors />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <MovieUpload
        visible={showMovieUploadModal}
        onClose={hideMovieUploadModal}
      />
      <ActorUpload
        visible={showActorUploadModal}
        onClose={hideActorUploadModal}
      />
    </>
  );
}
