 import { useState } from 'react';
import { cn } from '../../utils/cn';

// Define car parts for each view with positioning coordinates
const CAR_PARTS = {
  frontLeft: [
    { id: 'body', name: 'Car Body', file: 'body.png', zIndex: 10, x: 50, y: 50, width: 100, height: 100 },
    { id: 'hood', name: 'Hood', file: 'hood.png', zIndex: 20, x: 50, y: 30, width: 60, height: 30 },
    { id: 'mirrorLeft', name: 'Left Mirror', file: 'mirrorLeft.png', zIndex: 25, x: 25, y: 45, width: 10, height: 8 },
    { id: 'mudguardLeft', name: 'Left Mudguard', file: 'mudguardLeft.png', zIndex: 22, x: 20, y: 60, width: 15, height: 20 },
    { id: 'fenderLeft', name: 'Left Fender', file: 'fenderLeft.png', zIndex: 21, x: 25, y: 45, width: 20, height: 25 },
    { id: 'roofEdgeFront', name: 'Front Roof Edge', file: 'roofEdgeFront.png', zIndex: 19, x: 50, y: 20, width: 40, height: 10 },
    { id: 'frontBumper', name: 'Front Bumper', file: 'bumperFront.png', zIndex: 30, x: 50, y: 75, width: 50, height: 15 },
    { id: 'frontEdgeRear', name: 'Front Edge Rear', file: 'frontEdgeRear.png', zIndex: 18, x: 50, y: 40, width: 30, height: 10 },
    { id: 'rearBumper', name: 'Rear Bumper', file: 'bumperRear.png', zIndex: 30, x: 50, y: 85, width: 50, height: 15 },
    { id: 'doorFrontLeft', name: 'Front Left Door', file: 'doorFrontLeft.png', zIndex: 40, x: 35, y: 45, width: 25, height: 35 },
    { id: 'doorRearLeft', name: 'Rear Left Door', file: 'doorRearLeft.png', zIndex: 40, x: 65, y: 45, width: 25, height: 35 },
    { id: 'wheelFrontLeft', name: 'Front Left Wheel', file: 'wheelFrontLeft.png', zIndex: 15, x: 25, y: 70, width: 20, height: 20 },
    { id: 'wheelRearLeft', name: 'Rear Left Wheel', file: 'wheelRearLeft.png', zIndex: 15, x: 75, y: 70, width: 20, height: 20 },
    { id: 'bonnet', name: 'Bonnet', file: 'bonnet.png', zIndex: 35, x: 50, y: 35, width: 40, height: 20 },
    { id: 'hem', name: 'Hem', file: 'hem.png', zIndex: 35, x: 50, y: 60, width: 60, height: 10 },
    { id: 'windowRearLeft', name: 'Rear Left Window', file: 'windowRearLeft.png', zIndex: 35, x: 65, y: 35, width: 15, height: 20 },
    { id: 'lightRearLeft', name: 'Rear Left Light', file: 'lightRearLeft.png', zIndex: 35, x: 80, y: 65, width: 8, height: 6 },
    { id: 'lightFrontLeft', name: 'Front Left Light', file: 'lightFrontLeft.png', zIndex: 35, x: 20, y: 65, width: 8, height: 6 },
    { id: 'windowFrontLeft', name: 'Front Left Window', file: 'windowFrontLeft.png', zIndex: 35, x: 35, y: 35, width: 15, height: 20 },
    { id: 'windowFront', name: 'Front Window', file: 'windowFront.png', zIndex: 35, x: 50, y: 30, width: 30, height: 15 },
  ],
  frontRight: [
    { id: 'body', name: 'Car Body', file: 'body.png', zIndex: 10, x: 50, y: 50, width: 100, height: 100 },
    { id: 'bonnet', name: 'Bonnet', file: 'bonnet.png', zIndex: 35, x: 50, y: 35, width: 40, height: 20 },
    { id: 'frontBumper', name: 'Front Bumper', file: 'bumperFront.png', zIndex: 30, x: 50, y: 75, width: 50, height: 15 },
    { id: 'rearBumper', name: 'Rear Bumper', file: 'bumperRear.png', zIndex: 30, x: 50, y: 85, width: 50, height: 15 },
    { id: 'doorFrontRight', name: 'Front Right Door', file: 'doorFrontRight.png', zIndex: 40, x: 65, y: 45, width: 25, height: 35 },
    { id: 'doorRearRight', name: 'Rear Right Door', file: 'doorRearRight.png', zIndex: 40, x: 35, y: 45, width: 25, height: 35 },
    { id: 'fenderRight', name: 'Right Fender', file: 'fenderRight.png', zIndex: 20, x: 75, y: 45, width: 20, height: 25 },
    { id: 'hemRight', name: 'Right Hem', file: 'hemRight.png', zIndex: 35, x: 50, y: 60, width: 60, height: 10 },
    { id: 'hood', name: 'Hood', file: 'hood.png', zIndex: 20, x: 50, y: 30, width: 60, height: 30 },
    { id: 'lightFrontRight', name: 'Front Right Light', file: 'lightFrontRight.png', zIndex: 35, x: 80, y: 65, width: 8, height: 6 },
    { id: 'lightRearRight', name: 'Rear Right Light', file: 'lightRearRight.png', zIndex: 35, x: 20, y: 65, width: 8, height: 6 },
    { id: 'mirrorRight', name: 'Right Mirror', file: 'mirrorRight.png', zIndex: 25, x: 75, y: 45, width: 10, height: 8 },
    { id: 'mudguardRight', name: 'Right Mudguard', file: 'mudguardRight.png', zIndex: 22, x: 80, y: 60, width: 15, height: 20 },
    { id: 'roofEdgeFront', name: 'Front Roof Edge', file: 'roofEdgeFront.png', zIndex: 20, x: 50, y: 20, width: 40, height: 10 },
    { id: 'roofEdgeRear', name: 'Rear Roof Edge', file: 'roofEdgeRear.png', zIndex: 20, x: 50, y: 25, width: 40, height: 10 },
    { id: 'wheelFrontRight', name: 'Front Right Wheel', file: 'wheelFrontRight.png', zIndex: 15, x: 75, y: 70, width: 20, height: 20 },
    { id: 'wheelRearRight', name: 'Rear Right Wheel', file: 'wheelRearRight.png', zIndex: 15, x: 25, y: 70, width: 20, height: 20 },
    { id: 'windowFront', name: 'Front Window', file: 'windowFront.png', zIndex: 35, x: 50, y: 30, width: 30, height: 15 },
    { id: 'windowFrontRight', name: 'Front Right Window', file: 'windowFrontRight.png', zIndex: 35, x: 65, y: 35, width: 15, height: 20 },
    { id: 'windowRearRight', name: 'Rear Right Window', file: 'windowRearRight.png', zIndex: 35, x: 35, y: 35, width: 15, height: 20 },
  ],
  rearLeft: [
    { id: 'body', name: 'Car Body', file: 'body.png', zIndex: 10, x: 50, y: 50, width: 100, height: 100 },
    { id: 'frontBumper', name: 'Front Bumper', file: 'bumperFront.png', zIndex: 30, x: 50, y: 25, width: 50, height: 15 },
    { id: 'rearBumper', name: 'Rear Bumper', file: 'bumperRear.png', zIndex: 30, x: 50, y: 75, width: 50, height: 15 },
    { id: 'doorFrontLeft', name: 'Front Left Door', file: 'doorFrontLeft.png', zIndex: 40, x: 35, y: 45, width: 25, height: 35 },
    { id: 'doorRearLeft', name: 'Rear Left Door', file: 'doorRearLeft.png', zIndex: 40, x: 65, y: 45, width: 25, height: 35 },
    { id: 'doorRear', name: 'Rear Door', file: 'doorRear.png', zIndex: 40, x: 50, y: 45, width: 25, height: 35 },
    { id: 'fenderLeft', name: 'Left Fender', file: 'fenderLeft.png', zIndex: 20, x: 25, y: 45, width: 20, height: 25 },
    { id: 'hemLeft', name: 'Left Hem', file: 'hemLeft.png', zIndex: 35, x: 50, y: 60, width: 60, height: 10 },
    { id: 'hood', name: 'Hood', file: 'hood.png', zIndex: 20, x: 50, y: 30, width: 60, height: 30 },
    { id: 'lightRearLeft', name: 'Rear Left Light', file: 'lightRearLeft.png', zIndex: 35, x: 20, y: 65, width: 8, height: 6 },
    { id: 'lightRearRight', name: 'Rear Right Light', file: 'lightRearRight.png', zIndex: 35, x: 80, y: 65, width: 8, height: 6 },
    { id: 'mirrorLeft', name: 'Left Mirror', file: 'mirrorLeft.png', zIndex: 25, x: 25, y: 45, width: 10, height: 8 },
    { id: 'mudguardLeft', name: 'Left Mudguard', file: 'mudguardLeft.png', zIndex: 22, x: 20, y: 60, width: 15, height: 20 },
    { id: 'roofEdgeLeft', name: 'Left Roof Edge', file: 'roofEdgeLeft.png', zIndex: 20, x: 30, y: 20, width: 10, height: 40 },
    { id: 'wheelFrontLeft', name: 'Front Left Wheel', file: 'wheelFrontLeft.png', zIndex: 15, x: 25, y: 30, width: 20, height: 20 },
    { id: 'wheelRearLeft', name: 'Rear Left Wheel', file: 'wheelRearLeft.png', zIndex: 15, x: 75, y: 70, width: 20, height: 20 },
    { id: 'windowFrontLeft', name: 'Front Left Window', file: 'windowFrontLeft.png', zIndex: 35, x: 35, y: 35, width: 15, height: 20 },
    { id: 'windowRearLeft', name: 'Rear Left Window', file: 'windowRearLeft.png', zIndex: 35, x: 65, y: 35, width: 15, height: 20 },
    { id: 'windowRear', name: 'Rear Window', file: 'windowRear.png', zIndex: 35, x: 50, y: 35, width: 30, height: 20 },
  ],
  rearRight: [
    { id: 'body', name: 'Car Body', file: 'body.png', zIndex: 10, x: 50, y: 50, width: 100, height: 100 },
    { id: 'roof', name: 'Roof', file: 'roof.png', zIndex: 20, x: 50, y: 20, width: 60, height: 20 },
    { id: 'roofEdge', name: 'Roof Edge', file: 'roofEdge.png', zIndex: 20, x: 50, y: 25, width: 40, height: 10 },
    { id: 'frontBumper', name: 'Front Bumper', file: 'bumperFront.png', zIndex: 30, x: 50, y: 25, width: 50, height: 15 },
    { id: 'rearBumper', name: 'Rear Bumper', file: 'bumperRear.png', zIndex: 30, x: 50, y: 75, width: 50, height: 15 },
    { id: 'doorFrontRight', name: 'Front Right Door', file: 'doorFrontRight.png', zIndex: 40, x: 65, y: 45, width: 25, height: 35 },
    { id: 'doorRear', name: 'Rear Door', file: 'doorRear.png', zIndex: 40, x: 50, y: 45, width: 25, height: 35 },
    { id: 'doorRearRight', name: 'Rear Right Door', file: 'doorRearRight.png', zIndex: 40, x: 35, y: 45, width: 25, height: 35 },
    { id: 'fenderFront', name: 'Front Fender', file: 'fenderFront.png', zIndex: 20, x: 75, y: 45, width: 20, height: 25 },
    { id: 'hem', name: 'Hem', file: 'hem.png', zIndex: 35, x: 50, y: 60, width: 60, height: 10 },
    { id: 'hood', name: 'Hood', file: 'hood.png', zIndex: 20, x: 50, y: 30, width: 60, height: 30 },
    { id: 'lightRearRight', name: 'Rear Right Light', file: 'lightRearRight.png', zIndex: 35, x: 80, y: 65, width: 8, height: 6 },
    { id: 'mudguardRight', name: 'Right Mudguard', file: 'mudguardRight.png', zIndex: 22, x: 80, y: 60, width: 15, height: 20 },
    { id: 'wheelFrontRight', name: 'Front Right Wheel', file: 'wheelFrontRight.png', zIndex: 15, x: 75, y: 30, width: 20, height: 20 },
    { id: 'wheelRearRight', name: 'Rear Right Wheel', file: 'wheelRearRight.png', zIndex: 15, x: 25, y: 70, width: 20, height: 20 },
    { id: 'windowRear', name: 'Rear Window', file: 'windowRear.png', zIndex: 35, x: 50, y: 35, width: 30, height: 20 },
    { id: 'windowFrontRight', name: 'Front Right Window', file: 'windowFrontRight.png', zIndex: 35, x: 65, y: 35, width: 15, height: 20 },
    { id: 'windowRearRight', name: 'Rear Right Window', file: 'windowRearRight.png', zIndex: 35, x: 35, y: 35, width: 15, height: 20 },
  ],
};

const VIEWS = [
  { id: 'frontLeft', name: 'Front Left', label: 'Front Left View' },
  { id: 'frontRight', name: 'Front Right', label: 'Front Right View' },
  { id: 'rearLeft', name: 'Rear Left', label: 'Rear Left View' },
  { id: 'rearRight', name: 'Rear Right', label: 'Rear Right View' },
];

const CarViewer2D = ({ 
  onAreaSelect, 
  selectedAreas = [], 
  className,
  height = 400 
}) => {
  const [currentView, setCurrentView] = useState('frontLeft');
  const [selectedParts, setSelectedParts] = useState(new Set());

  const handlePartClick = (partId, partName) => {
    const newSelected = new Set(selectedParts);
    
    if (newSelected.has(partId)) {
      newSelected.delete(partId);
    } else {
      newSelected.add(partId);
    }
    
    setSelectedParts(newSelected);
    
    if (onAreaSelect) {
      onAreaSelect(partId, partName);
    }
  };

  const rotateCar = () => {
    const currentIndex = VIEWS.findIndex(v => v.id === currentView);
    const nextIndex = (currentIndex + 1) % VIEWS.length;
    setCurrentView(VIEWS[nextIndex].id);
  };

  const getImagePath = (view, partFile) => {
    return `/static/assets/img/car/${view}/${partFile}`;
  };

  const isPartSelected = (partId) => {
    return selectedParts.has(partId) || selectedAreas.includes(partId);
  };

  return (
    <div className={cn('w-full border rounded-lg overflow-hidden bg-gray-50', className)}>
      <div className="p-4 bg-white border-b">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Car Damage Assessment</h3>
            <p className="text-sm text-gray-600 mt-1">
              Click on car parts to mark damage. Rotate to view different angles.
            </p>
          </div>
          <button
            onClick={rotateCar}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Rotate Car
          </button>
        </div>
      </div>

      <div className="relative bg-gray-100" style={{ height: `${height}px` }}>
        {/* Car Views Container */}
        <div className="relative w-full h-full">
          {VIEWS.map((view) => (
            <div
              key={view.id}
              className={cn(
                'absolute inset-0 flex items-center justify-center transition-opacity duration-300',
                currentView === view.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
              )}
            >
              <div className="relative w-full h-64">
                {CAR_PARTS[view.id].map((part) => (
                  <img
                    key={part.id}
                    src={getImagePath(view.id, part.file)}
                    alt={part.name}
                    className={cn(
                      'absolute cursor-pointer transition-all duration-200 hover:brightness-110',
                      isPartSelected(part.id) && 'opacity-10 brightness-55'
                    )}
                    style={{
                      zIndex: part.zIndex,
                      top: `${part.y}%`,
                      left: `${part.x}%`,
                      width: `${part.width}%`,
                      height: `${part.height}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    data-area={part.id}
                    onClick={() => handlePartClick(part.id, part.name)}
                    onError={(e) => {
                      // Fallback for missing images
                      e.target.style.display = 'none';
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Current View Indicator */}
        <div className="absolute top-4 left-4 bg-white bg-opacity-0 rounded-md px-3 py-2">
          <p className="text-sm font-medium text-gray-700">
            {VIEWS.find(v => v.id === currentView)?.label}
          </p>
        </div>

        {/* View Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {VIEWS.map((view) => (
            <button
              key={view.id}
              onClick={() => setCurrentView(view.id)}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium transition-colors',
                currentView === view.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              )}
            >
              {view.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Parts Summary */}
      {(selectedParts.size > 0 || selectedAreas.length > 0) && (
        <div className="p-4 bg-blue-50 border-t">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            Selected Damaged Areas ({selectedParts.size || selectedAreas.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {Array.from(selectedParts).map((partId) => {
              const part = Object.values(CAR_PARTS).flat().find(p => p.id === partId);
              return (
                <span
                  key={partId}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
                >
                  {part?.name || partId}
                </span>
              );
            })}
            {selectedAreas.filter(area => !selectedParts.has(area)).map((areaId) => (
              <span
                key={areaId}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
              >
                {areaId}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarViewer2D;
