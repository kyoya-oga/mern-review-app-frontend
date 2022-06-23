import React, { useRef, useState, useEffect } from 'react';
import { forwardRef } from 'react';
import { commonInputClasses } from '../utils/theme';

export default function LiveSearch({
  value = '',
  placeholder = '',
  onChange = null,
  onSelect = null,
  results = [],
  name = '',
  renderItem = null,
  selectedResultStyle,
  resultContainerStyle,
  inputStyle,
}) {
  const [displaySearch, setDisplaySearch] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleOnFocus = () => {
    if (results.length) setDisplaySearch(true);
  };

  const closeSearch = () => {
    setDisplaySearch(false);
    setFocusedIndex(-1);
  };

  const handleOnBlur = () => {
    // in order to prioritize handleSelection function
    setTimeout(() => {
      closeSearch();
    }, 200);
  };

  const handleSelection = (selectedItem) => {
    if (selectedItem) {
      onSelect(selectedItem);
      closeSearch();
    }
  };

  const handleKeyDown = ({ key }) => {
    let nextCount;
    const keys = ['ArrowDown', 'ArrowUp', 'Enter', 'Escape'];
    if (!keys.includes(key)) return;

    // move selection up or down
    if (key === 'ArrowDown') {
      nextCount = (focusedIndex + 1) % results.length;
    }
    if (key === 'ArrowUp') {
      nextCount = (focusedIndex + results.length - 1) % results.length;
    }

    if (key === 'Enter') return handleSelection(results[focusedIndex]);

    if (key === 'Escape') return closeSearch();

    setFocusedIndex(nextCount);
  };

  const getInputStyle = () => {
    return inputStyle
      ? inputStyle
      : `${commonInputClasses} border-2 rounded p-1 text-lg`;
  };
  return (
    <div className="relative">
      <input
        type="text"
        id={name}
        name={name}
        className={getInputStyle()}
        placeholder={placeholder}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onKeyDown={handleKeyDown}
        value={value}
        onChange={onChange}
      />
      <SearchResults
        focusedIndex={focusedIndex}
        visible={displaySearch}
        results={results}
        onSelect={handleSelection}
        renderItem={renderItem}
        resultContainerStyle={resultContainerStyle}
        selectedResultStyle={selectedResultStyle}
      />
    </div>
  );
}

const SearchResults = ({
  results = [],
  visible,
  focusedIndex,
  onSelect,
  renderItem,
  resultContainerStyle,
  selectedResultStyle,
}) => {
  const resultContainer = useRef(null);

  useEffect(() => {
    resultContainer.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [focusedIndex]);

  if (!visible) return null;
  return (
    <div className="absolute z-50 right-0 left-0 top-10 bg-white dark:bg-secondary shadow-md p-2 max-h-64 space-y-2 overflow-auto mt-1 custom-scroll-bar">
      {results.map((result, index) => {
        const getSelectedClass = () => {
          return selectedResultStyle
            ? selectedResultStyle
            : 'dark:bg-dark-subtle bg-light-subtle';
        };

        return (
          <ResultCard
            ref={index === focusedIndex ? resultContainer : null}
            key={index.toString()}
            item={result}
            renderItem={renderItem}
            resultContainerStyle={resultContainerStyle}
            selectedResultStyle={
              index === focusedIndex ? getSelectedClass() : ''
            }
            onClick={() => onSelect(result)}
          />
        );
      })}
    </div>
  );
};

const ResultCard = forwardRef((props, ref) => {
  const {
    item,
    renderItem,
    resultContainerStyle,
    selectedResultStyle,
    onClick,
  } = props;

  const getClasses = () => {
    if (resultContainerStyle)
      return `${resultContainerStyle} ${selectedResultStyle}`;

    return `${selectedResultStyle} cursor-pointer rounded overflow-hidden dark:hover:bg-dark-subtle hover:bg-light-subtle transition`;
  };
  return (
    <div onClick={onClick} ref={ref} className={getClasses()}>
      {renderItem(item)}
    </div>
  );
});
