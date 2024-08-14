import { useEffect, useState } from 'react';
import descriptions from '../../assets/descriptions.json';

const TreeInfoComponent = ({ id }) => {
  const [treeInfo, setTreeInfo] = useState(null);

  useEffect(() => {
    const selectedTree = descriptions.find((tree) => tree.id === id);
    setTreeInfo(selectedTree);
  }, [id]);

  if (!treeInfo) {
    return <div></div>;
  }

  return (
    <div className="tree-info-container flex  flex-col  mb-5">
      <h2 className="text-3xl font-bold text-center mb-4">{treeInfo.name}</h2>
      <div className="md:mx-40">
        <div className="tree-section">
          <h3 className="text-xl font-bold">Introduction</h3>
          <ul className="list-disc ml-4">
            <li>Height: {treeInfo.introduction.height}</li>
            <li>Trunk Diameter: {treeInfo.introduction.trunkDiameter}</li>
            <li>Bark: {treeInfo.introduction.bark}</li>
            <li>
              Leaves:
              <ul className="list-disc ml-4">
                <li>Shape: {treeInfo.introduction.leaves.shape}</li>
                <li>Size: {treeInfo.introduction.leaves.size}</li>
                <li>Color: {treeInfo.introduction.leaves.color}</li>
              </ul>
            </li>
            <li>Flowers: {treeInfo.introduction.flowers}</li>
            <li>Fruit: {treeInfo.introduction.fruit}</li>
          </ul>
        </div>

        <div className="tree-section">
          <h3 className="text-xl font-bold">Habitat</h3>
          <ul className="list-disc ml-4">
            <li>Range: {treeInfo.habitat.range}</li>
            <li>Environment: {treeInfo.habitat.environment}</li>
          </ul>
        </div>

        <div className="tree-section">
          <h3 className="text-xl font-bold">Growth and Lifespan</h3>
          <ul className="list-disc ml-4">
            <li>Growth Rate: {treeInfo.growthAndLifespan.growthRate}</li>
            <li>Lifespan: {treeInfo.growthAndLifespan.lifespan}</li>
          </ul>
        </div>

        <div className="tree-section">
          <h3 className="text-xl font-bold">Uses</h3>
          <ul className="list-disc ml-4">
            <li>Timber: {treeInfo.uses.timber}</li>
            <li>Wildlife: {treeInfo.uses.wildlife}</li>
            <li>Ornamental: {treeInfo.uses.ordimental}</li>
          </ul>
        </div>

        <div className="tree-section">
          <h3 className="text-xl font-bold">Ecological Importance</h3>
          <ul className="list-disc ml-4">
            <li>Soil: {treeInfo.ecologicalImportance.soil}</li>
            <li>Shade: {treeInfo.ecologicalImportance.shade}</li>
          </ul>
        </div>

        <div className="tree-section">
          <h3 className="text-xl font-bold">Cultural Significance</h3>
          <ul className="list-disc ml-4">
            <li>Mythology and Folklore: {treeInfo.culturalSignificance.mythologyAndFolklore}</li>
            <li>Landscaping: {treeInfo.culturalSignificance.landscaping}</li>
          </ul>
        </div>

        <div className="tree-section">
          <h3 className="text-xl font-bold">Interesting Facts</h3>
          <p>&nbsp;&nbsp;&nbsp;{treeInfo.interestingFacts}</p>
        </div>

        <div className="tree-section">
          <h3 className="text-xl font-bold">Conclusion</h3>
          <p>&nbsp;&nbsp;&nbsp;{treeInfo.conclusion}</p>
        </div>
      </div>
    </div>
  );
};

export default TreeInfoComponent;
