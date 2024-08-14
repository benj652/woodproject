import { useFileContext } from '../../context/FileContext';
import { useUserContext } from '../../context/UserContext';

const FileInput = () => {
  const { user } = useUserContext();
  const { preview, setPreview, setUploadedFile } = useFileContext();
  const handleFileUpload = (file) => {
    setUploadedFile(file);
    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      setPreview(image);
    };
  };
  return (
    <div className="flex items-center justify-center w-[500px] ">
      <label
        for="dropzone-file"
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg  bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ${
          user ? 'cursor-pointer' : 'cursor-not-allowed'
        }`}
      >
        {preview ? (
          <img src={preview.src} alt="" className="overflow-hidden" />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 4096x4096px)
            </p>
          </div>
        )}
        {user && (
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />
        )}
      </label>
    </div>
  );
};

export default FileInput;
