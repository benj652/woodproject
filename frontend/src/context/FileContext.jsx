import { createContext, useContext, useEffect, useState } from 'react';

export const FileContext = createContext();

export const useFileContext = () => {
  return useContext(FileContext);
};

export const FileProvider = ({ children }) => {
  const [preview, setPreview] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  useEffect(() => {
    setPrediction(null);
  }, [uploadedFile]);
  const clear = () => {
    setPreview(null);
    setUploadedFile(null);
    setPrediction(null);
  };
  return (
    <FileContext.Provider
      value={{
        preview,
        setPreview,
        uploadedFile,
        setUploadedFile,
        prediction,
        setPrediction,
        clear,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
