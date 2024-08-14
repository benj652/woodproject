import React from 'react';

const About = () => {
  return (
    <div className="  w-screen p-10 overflow-hidden z-10 space-y-5 bg-base-200/50 shadow-2xl">
      <h1 className="text-3xl text-center">About:</h1>
      <p>
        {'   '} Welcome to my Wood Classification website, where I celebrate the diversity and
        beauty of different wood species found around the world. My website specializes in
        accurately identifying and classifying various types of wood based on images you provide.
        Whether you're a woodworking enthusiast, a forestry expert, or simply curious about the
        natural wonders of wood, my app is here to assist you.
      </p>
      <p>
        {'   '} My website features a robust classification system that recognizes a wide range of
        wood species, each with unique characteristics in terms of grain patterns, textures, and
        colors. Using Convolutionsl Neural Networks, I analyze these features to provide accurate
        identifications.
      </p>
    </div>
  );
};

export default About;
