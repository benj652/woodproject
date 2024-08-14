import { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import httpClient from '../utils/httpClient';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserContext();
  const login = async ({ email, password }) => {
    try {
      setLoading(true);
      if (!email || !password) {
        throw new Error('Missing Required Fields');
      }
      const response = await httpClient.post('/api/auth/login', {
        email,
        password,
      });
      const data = response.data;
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      return data;
    } catch (e) {
      return e;
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};
export default useLogin;
