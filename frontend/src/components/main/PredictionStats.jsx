import { Link } from 'react-router-dom';
import { useFileContext } from '../../context/FileContext';
import usePredict from '../../hooks/usePredict';

const PredictionStats = () => {
  const { loading, predict } = usePredict();
  const { preview, uploadedFile, prediction, clear } = useFileContext();
  const handlePredict = async () => {
    if (!loading) {
      await predict();
      // console.log(data);
    }
  };
  // console.log(uploadedFile);
  return (
    <div className="flex flex-col items-center space-y-2 bg-base-100 shadow-xl hover:shadow-2xl p-4 rounded-2xl min-h-[350px] min-w-[600px]">
      <div className="flex flex-col space-y-2 mt-10">
        <h1 className="text-xl">Prediction Stats</h1>
        <ul className="list-disc pl-4">
          <li>
            File:
            {uploadedFile ? <span>{uploadedFile.name}</span> : <span>{'No file selected'}</span>}
          </li>
          <li>
            Prediction:
            {prediction?.id ? (
              <Link
                className="text-blue-500 underline hover:text-black"
                to={`/tree/${prediction.id}`}
              >
                {prediction.prediction}
              </Link>
            ) : (
              <span>{'N/A'}</span>
            )}
          </li>
          <li>
            Confidence:
            {prediction ? <span>{prediction.confidence}%</span> : <span>{'N/A'}</span>}
          </li>
        </ul>
        <div>File Stats</div>
        <ul className="list-disc pl-4">
          <li>
            Width:
            {preview ? <span>{preview.width}px</span> : <span>{'N/A'}</span>}
          </li>

          <li>
            Height:
            {preview ? <span>{preview.height}px</span> : <span>{'N/A'}</span>}
          </li>
        </ul>
      </div>
      {uploadedFile && (
        <div className="grid grid-cols-2 gap-2">
          {
            <button
              className={`btn btn-primary min-w-32 min-h-12 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => handlePredict()}
            >
              {loading ? <span className="loading loading-spinner"></span> : 'Predict'}
            </button>
          }
          <button className="btn btn-primary" onClick={clear}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default PredictionStats;
