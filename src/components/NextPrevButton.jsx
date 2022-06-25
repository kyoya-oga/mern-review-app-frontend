import React from 'react';

export default function NextPrevButton({
  className = '',
  onNextClick,
  onPrevClick,
}) {
  const getClasses = () => {
    return 'flex justify-end items-center space-x-3';
  };
  return (
    <div className={`${getClasses()} ${className}`}>
      <Button onClick={onPrevClick} title="Prev" />
      <Button onClick={onNextClick} title="Next" />
    </div>
  );
}

const Button = ({ title, onClick }) => {
  return (
    <button
      className="text-primary dark:text-white hover:underline"
      type="button"
      onClick={onClick}
    >
      {title}
    </button>
  );
};
