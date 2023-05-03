import React, { useContext, useEffect, useMemo } from 'react';
import './ErrorMessage.css';
import { ItemsContext } from '../../providers/ItemsContext';

const ErrorMessage = ({ children }) => {
  const {errorMessage, setErrorMessage} = useContext(ItemsContext);

  const memoizedChildren = useMemo(() => children, []);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  }, [errorMessage]);

  return (
    <>
      {errorMessage && (
        <div className="error-message">
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage(null)}>&times;</button>
        </div>
      )}
      {memoizedChildren}
    </>
  );
};


export {ErrorMessage};
