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
        return 'missing required fields';
      }
      const response = await httpClient.post('/api/auth/login', {
        email,
        password,
      });
      console.log(response);
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
