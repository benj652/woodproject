import { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import httpClient from '../utils/httpClient';

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserContext();
  const signUp = async ({ email, username, password, confirmPassword }) => {
    try {
      setLoading(true);
      if (!email || !username || !password || !confirmPassword) {
        throw new Error('Missing Required Fields');
      }
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      const response = await httpClient.post('/api/auth/register', {
        email,
        username,
        password,
        password_check: confirmPassword,
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
  return { signUp, loading };
};

export default useSignUp;
