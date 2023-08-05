import { useState } from 'react';
import NotFound from '../pages/NotFound';

const useErrorBoundary = () => {
  const [hasError, setHasError] = useState(false);

  const errorHandler = (error, errorInfo) => {
    console.log(`Error: ${error}, ${errorInfo}`);
    setHasError(true);
  };

  return [hasError, errorHandler];
};

const ErrorBoundary = ({ children }) => {
  const [hasError, setError] = useErrorBoundary();

  if (hasError) {
    return <NotFound />;
  }

  return children;
};

export default ErrorBoundary;
