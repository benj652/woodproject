import React from 'react';
import About from '../components/main/About';
import FileInput from '../components/main/FileInput';
import Hero from '../components/main/Hero';
import PredictionStats from '../components/main/PredictionStats';
import { useUserContext } from '../context/UserContext';

const HomePage = () => {
  const { user } = useUserContext();
  return (
    <div className="flex flex-col items-center">
      <Hero />
      <div
        className={`grid grid-cols-1 py-10 px-5 gap-10 w-screen overflow-hidden h-full items-center justify-center bg-base-200/40 z-0  ${
          user ? 'lg:grid-cols-2' : 'lg:grid-cols-3 cursor-not-allowed opacity-30'
        }`}
      >
        <FileInput />
        {!user && <div className="text-center text-4xl w-full z-10"> ⛔Requires Account</div>}
        <div className={`${!user && 'ml-[-225px] z-0'}`}>
          <PredictionStats />
        </div>
      </div>
      <About />
    </div>
  );
};

export default HomePage;
