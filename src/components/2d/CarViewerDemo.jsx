import { useState } from 'react';
import CarViewer2D from './CarViewer2D';

const CarViewerDemo = () => {
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [damages, setDamages] = useState({});

  const handleAreaSelect = (areaId, areaName) => {
    setSelectedAreas(prev => {
      const newAreas = [...prev];
      const index = newAreas.indexOf(areaId);
      
      if (index > -1) {
        newAreas.splice(index, 1);
      } else {
        newAreas.push(areaId);
      }
      
      return newAreas;
    });

    // You can add damage details here
    setDamages(prev => ({
      ...prev,
      [areaId]: {
        severity: 'moderate',
        description: `${areaName} damage`
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">2D Car Damage Assessment</h1>
      
      <div className="mb-6">
        <CarViewer2D
          onAreaSelect={handleAreaSelect}
          selectedAreas={selectedAreas}
          damages={damages}
          height={500}
          className="shadow-lg"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Integration Guide</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Usage:</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`<CarViewer2D
  onAreaSelect={handleAreaSelect}
  selectedAreas={selectedAreas}
  damages={damages}
  height={500}
/>`}
            </pre>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Props:</h3>
            <ul className="text-sm space-y-1">
              <li><strong>onAreaSelect:</strong> Callback function</li>
              <li><strong>selectedAreas:</strong> Array of selected part IDs</li>
              <li><strong>damages:</strong> Object with damage details</li>
              <li><strong>height:</strong> Container height in pixels</li>
              <li><strong>className:</strong> Additional CSS classes</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-medium text-yellow-800 mb-2">Next Steps:</h3>
        <ol className="text-sm text-yellow-700 space-y-1">
          <li>1. Add transparent PNG images to the respective directories</li>
          <li>2. Ensure images are properly aligned for overlay display</li>
          <li>3. Test the component with actual car images</li>
          <li>4. Customize styling as needed</li>
        </ol>
      </div>
    </div>
  );
};

export default CarViewerDemo;
