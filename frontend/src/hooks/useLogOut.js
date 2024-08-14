import { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import httpClient from '../utils/httpClient';

const useLogOut = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserContext();
  const logOut = async () => {
    try {
      setLoading(true);
      const response = await httpClient.post('/api/auth/logout');
      const data = response.data;
      localStorage.removeItem('user');
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
