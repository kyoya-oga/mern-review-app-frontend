import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { uploadTrailer } from '../../api/movie';
import { useNotification } from '../../hooks';
import ModalContainer from '../modals/ModalContainer';
import MovieForm from './MovieForm';

export default function MovieUpload({ visible }) {
  const [videoSelected, setVideoSelected] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoInfo, setVideoInfo] = useState({});
  const { updateNotification } = useNotification();

  const handleTypeError = (typeError) => {
    updateNotification('error', typeError);
  };

  //? Uploading video may take a while, so use an individual function to prevent unintended deletion of other movie state
  const handleUploadTrailer = async (data) => {
    const { error, url, public_id } = await uploadTrailer(
      data,
      setUploadProgress
    );

    if (error) updateNotification('error', error);
    setVideoUploaded(true);
    setVideoInfo({ url, public_id });
  };

  const handleChange = (file) => {
    const formData = new FormData();
    formData.append('video', file);

    setVideoSelected(true);
    handleUploadTrailer(formData);
  };

  const getUploadProgressValue = () => {
    if (!videoUploaded && uploadProgress >= 100) {
      return 'Processing';
    }

    return `Upload progress ${uploadProgress}%`;
  };

  const handleSubmit = async (movieInfo) => {
    console.log(movieInfo);
  };

  return (
    <ModalContainer visible={visible}>
      {/* <UploadProgress
          visible={!videoUploaded && videoSelected}
          message={getUploadProgressValue()}
          width={uploadProgress}
        />
        <TrailerSelector
          visible={!videoSelected}
          handleChange={handleChange}
          onTypeError={handleTypeError}
        /> */}

      <MovieForm onSubmit={handleSubmit} />
    </ModalContainer>
  );
}

const TrailerSelector = ({ visible, handleChange, onTypeError }) => {
  if (!visible) return null;

  return (
    <div className="h-full flex items-center justify-center">
      <FileUploader
        handleChange={handleChange}
        types={['mp4', 'avi']}
        onTypeError={onTypeError}
      >
        <div className="w-48 h-48 border border-dashed dark:border-dark-subtle border-light-subtle rounded-full flex flex-col items-center justify-center text-secondary dark:text-dark-subtle cursor-pointer">
          <AiOutlineCloudUpload size={80} />
          <p>Drop your file here!</p>
        </div>
      </FileUploader>
    </div>
  );
};

const UploadProgress = ({ width, message, visible }) => {
  if (!visible) return null;

  return (
    <div className="dark:bg-secondary bg-white drop-shadow-lg rounded p-3">
      <div className="h-3 relative dark:bg-dark-subtle bg-light-subtle overflow-hidden">
        <div
          style={{ width: `${width}%` }}
          className="h-full absolute left-0 bg-secondary dark:bg-white"
        />
      </div>
      <p className="mt-1 font-semibold dark:text-dark-subtle text-light-subtle animate-pulse">
        {message}
      </p>
    </div>
  );
};
