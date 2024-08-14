import { useState } from 'react';
import { useFileContext } from '../context/FileContext';
import httpClient from '../utils/httpClient';

const usePredict = () => {
  const [loading, setLoading] = useState(false);
  const { uploadedFile, setPrediction } = useFileContext();
  const predict = async () => {
    try {
      setLoading(true);
      if (!uploadedFile) {
        throw new Error('Missing Required Fields');
      }
      const formdata = new FormData();
      formdata.append('file', uploadedFile);
      const response = await httpClient.post('/api/prediction/predict', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = response.data;
      setPrediction(data);
      return data;
    } catch (e) {
      return e;
    } finally {
      setLoading(false);
    }
  };

  return { loading, predict };
};

export default usePredict;
