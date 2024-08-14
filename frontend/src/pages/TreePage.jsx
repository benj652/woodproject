import { useNavigate, useParams } from 'react-router-dom';
import TreeInfoComponent from '../components/trees/TreeInfoComponent';
const TreePage = () => {
  const id = useParams().id;
  const selectedId = id ? parseInt(id) : -1;
  const navagate = useNavigate();
  const species = [
    'Common Beech',
    'Common Walnut',
    'Chestnut',
    'Austrian Oak',
    'Common Alder',
    'Manna Ash',
    'European Spruce',
    'Ailanthus',
    'Varnish Tree',
    'Black Locust',
    'Mediterranean Cypress',
    'Sycamore',
  ];
  return (
    <div className="flex flex-col">
      <TreeInfoComponent id={selectedId} />
      <h2 className="text-xl font-semibold text-center">Trees</h2>
      <div className="flex flex-row justify-center items-center flex-wrap space-x-5">
        {species.map((tree, index) => (
          <span
            key={index}
            onClick={() => navagate(`/tree/${index}`)}
            className={`cursor-pointer underline text-center ${
              selectedId === index ? 'text-black' : 'text-blue-500 hover:text-black'
            }`}
          >
            {tree}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TreePage;
