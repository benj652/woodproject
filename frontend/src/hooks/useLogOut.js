import { useState } from 'react';
import { useFileContext } from '../context/FileContext';
import { useUserContext } from '../context/UserContext';
import httpClient from '../utils/httpClient';

const useLogOut = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserContext();
  const { clear } = useFileContext();
  const logOut = async () => {
    try {
      setLoading(true);
      const response = await httpClient.post('/api/auth/logout');
      const data = response.data;
      localStorage.removeItem('user');
      clear();
      setUser(null);
      return data;
    } catch (e) {
      return e;
    } finally {
      setLoading(false);
    }
  };
  return { loading, logOut };
};
export default useLogOut;
