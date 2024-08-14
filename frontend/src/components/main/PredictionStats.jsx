import React from 'react';

const PredictionStats = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex flex-col space-y-2 ">
        <h1 className="text-xl">Prediction Stats</h1>
        <ul className="list-disc pl-4">
          <li>
            File: <span>{'No file selected'}</span>
          </li>
          <li>
            Prediction: <span>{'N/A'}</span>
          </li>
          <li>
            Accuracy: <span>{'N/A'}</span>
          </li>
        </ul>
        <div>File Stats</div>
        <ul className="list-disc pl-4">
          <li>
            Width: <span>{'N/A'}</span>
          </li>
          <li>
            Height: <span>{'N/A'}</span>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button className="btn btn-primary">Get Started</button>
        <button className="btn btn-primary">Get Started</button>
      </div>
    </div>
  );
};

export default PredictionStats;
