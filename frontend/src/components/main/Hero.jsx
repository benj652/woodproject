import { Link } from 'react-router-dom';
import background from '../../assets//images/background.png';
import { useUserContext } from '../../context/UserContext';
const Hero = () => {
  const { user } = useUserContext();
  return (
    <div
      className="hero min-h-[300px]  w-screen overflow-hidden shadow-black shadow-2xl "
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome!</h1>
          <p className="mb-5">
            Use the dropbox below to classify wood species. If you are not logged in, make sure to
            do that first! If you do not have an account, make one below!
          </p>
          {user ? (
            <p className="mb-5">You are logged in as: {user.username}</p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link to={'/login'} className="btn btn-primary">
                Login
              </Link>
              <Link to={'/signup'} className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
