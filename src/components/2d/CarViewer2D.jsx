 import { useState } from 'react';
import { cn } from '../../utils/cn';

// Define car parts for each view with positioning coordinates
const CAR_PARTS = {
  frontLeft: [
    { id: 'body', name: 'Car Body', file: 'body.png', zIndex: 10, x: 10, y: 10, width: 100, height: 100 },
    { id: 'hood', name: 'Hood', file: 'hood.png', zIndex: 20, x: 40, y: 11, width: 26, height: 3 },
    { id: 'mirrorLeft', name: 'Left Mirror', file: 'mirrorLeft.png', zIndex: 25, x: 51, y: 26, width: 5, height: 7 },
    { id: 'mudguardLeft', name: 'Left Mudguard', file: 'mudguardLeft.png', zIndex: 22, x: 71, y: 18, width: 5, height: 22 },
    { id: 'fenderLeft', name: 'Left Fender', file: 'fenderLeft.png', zIndex: 21, x: 36, y: 26, width: 14, height: 38 },
    { id: 'roofEdgeFront', name: 'Front Roof Edge', file: 'roofEdgeFront.png', zIndex: 19, x: 51, y: 12, width: 20, height: 8 },
    { id: 'frontBumper', name: 'Front Bumper', file: 'bumperFront.png', zIndex: 30, x: 15, y: 46, width: 27, height: 20 },
    { id: 'frontEdgeRear', name: 'Front Edge Rear', file: 'frontEdgeRear.png', zIndex: 18, x: 56, y: 12, width: 17, height: 6 },
    { id: 'rearBumper', name: 'Rear Bumper', file: 'bumperRear.png', zIndex: 30, x: 76, y: 36, width: 2, height: 13 },
    { id: 'doorFrontLeft', name: 'Front Left Door', file: 'doorFrontLeft.png', zIndex: 40, x: 49, y: 30, width: 14, height: 31 },
    { id: 'doorRearLeft', name: 'Rear Left Door', file: 'doorRearLeft.png', zIndex: 30, x: 63, y: 28, width: 10, height: 28 },
    { id: 'wheelFrontLeft', name: 'Front Left Wheel', file: 'wheelFrontLeft.png', zIndex: 22, x: 39, y: 48, width: 9, height: 23 },
    { id: 'wheelRearLeft', name: 'Rear Left Wheel', file: 'wheelRearLeft.png', zIndex: 15, x: 72, y: 40, width: 5, height: 22 },
    { id: 'bonnet', name: 'Bonnet', file: 'bonnet.png', zIndex: 35, x: 17, y: 31, width: 28, height: 12 },
    { id: 'hem', name: 'Hem', file: 'hem.png', zIndex: 35, x: 49, y: 39, width: 24, height: 27 },
    { id: 'windowRearLeft', name: 'Rear Left Window', file: 'windowRearLeft.png', zIndex: 35, x: 61, y: 17, width: 11, height: 12 },
    { id: 'lightRearLeft', name: 'Rear Left Light', file: 'lightRearLeft.png', zIndex: 35, x: 76, y: 29, width: 2, height: 7 },
    { id: 'lightFrontLeft', name: 'Front Left Light', file: 'lightFrontLeft.png', zIndex: 35, x: 27, y: 41, width: 10, height: 10 },
    { id: 'windowFrontLeft', name: 'Front Left Window', file: 'windowFrontLeft.png', zIndex: 20, x: 48, y: 15, width: 14, height: 17 },
    { id: 'windowFront', name: 'Front Window', file: 'windowFront.png', zIndex: 35, x: 28, y: 16, width: 24, height: 15 },
  ],
  frontRight: [
  { id: 'body', name: 'Car Body', file: 'body.png', zIndex: 10, x: 10, y: 10, width: 100, height: 100 },
  { id: 'hood', name: 'Hood', file: 'hood.png', zIndex: 20, x: 43, y: 11, width: 25, height: 2 },
  { id: 'mirrorRight', name: 'Right Mirror', file: 'mirrorRight.png', zIndex: 25, x: 54, y: 30, width: 6, height: 7 },
  { id: 'mudguardRight', name: 'Right Mudguard', file: 'mudguardRight.png', zIndex: 22, x: 34, y: 18, width: 6, height: 30 },
  { id: 'fenderRight', name: 'Right Fender', file: 'fenderRight.png', zIndex: 21, x: 61, y: 34, width: 14, height: 38 },
  { id: 'roofEdgeFront', name: 'Front Roof Edge', file: 'roofEdgeFront.png', zIndex: 19, x: 37, y: 12, width: 20, height: 6 },
  { id: 'frontBumper', name: 'Front Bumper', file: 'bumperFront.png', zIndex: 30, x: 69, y: 55, width: 27, height: 26 },
  { id: 'frontEdgeRear', name: 'Front Edge Rear', file: 'frontEdgeRear.png', zIndex: 18, x: 20, y: 40, width: 30, height: 10 },
  { id: 'rearBumper', name: 'Rear Bumper', file: 'bumperRear.png', zIndex: 30, x: 32, y: 40, width: 2, height: 23 },
  { id: 'doorFrontRight', name: 'Front Right Door', file: 'doorFrontRight.png', zIndex: 40, x: 46, y: 36, width: 14, height: 36 },
  { id: 'doorRearRight', name: 'Rear Right Door', file: 'doorRearRight.png', zIndex: 30, x: 37, y: 32, width: 10, height: 35 },
  { id: 'wheelFrontRight', name: 'Front Right Wheel', file: 'wheelFrontRight.png', zIndex: 15, x: 62, y: 56, width: 9, height: 32 },
  { id: 'wheelRearRight', name: 'Rear Right Wheel', file: 'wheelRearRight.png', zIndex: 15, x: 33, y: 49, width: 5, height: 26 },
  { id: 'bonnet', name: 'Bonnet', file: 'bonnet.png', zIndex: 35, x: 64, y: 35, width: 29, height: 17 },
  { id: 'hem', name: 'Hem', file: 'hem.png', zIndex: 35, x: 22, y: 52, width: 24, height: 27 },
  { id: 'windowRearRight', name: 'Rear Right Window', file: 'windowRearRight.png', zIndex: 35, x: 38, y: 17, width: 10, height: 16 },
  { id: 'lightRearRight', name: 'Rear Right Light', file: 'lightRearRight.png', zIndex: 35, x: 32, y: 33, width: 2, height: 7 },
  { id: 'lightFrontRight', name: 'Front Right Light', file: 'lightFrontRight.png', zIndex: 35, x: 73, y: 49, width: 10, height: 10 },
  { id: 'windowFrontRight', name: 'Front Right Window', file: 'windowFrontRight.png', zIndex: 20, x: 48, y: 15, width: 14, height: 24 },
  { id: 'windowFront', name: 'Front Window', file: 'windowFront.png', zIndex: 35, x: 57, y: 16, width: 24, height: 19 },
],
  rearLeft: [
  { id: 'body', name: 'Car Body', file: 'body.png', zIndex: 10, x: 10, y: 10, width: 100, height: 100 },
  { id: 'hood', name: 'Hood', file: 'hood.png', zIndex: 20, x: 51, y: 11, width: 26, height: 3 },
  { id: 'mirrorLeft', name: 'Left Mirror', file: 'mirrorLeft.png', zIndex: 25, x: 60, y: 30, width: 6, height: 7 },
  { id: 'mudguardLeft', name: 'Left Mudguard', file: 'mudguardLeft.png', zIndex: 22, x: 80, y: 18, width: 6, height: 30 },
  { id: 'fenderLeft', name: 'Left Fender', file: 'fenderLeft.png', zIndex: 21, x: 46, y: 34, width: 14, height: 38 },
  { id: 'roofEdgeRear', name: 'Rear Roof Edge', file: 'roofEdgeRear.png', zIndex: 19, x: 63, y: 12, width: 20, height: 8 },
  { id: 'rearBumper', name: 'Rear Bumper', file: 'bumperRear.png', zIndex: 30, x: 70, y: 45, width: 24, height: 30 },
  { id: 'rearEdgeFront', name: 'Rear Edge Front', file: 'rearEdgeFront.png', zIndex: 18, x: 50, y: 40, width: 30, height: 10 },
  { id: 'frontBumper', name: 'Front Bumper', file: 'bumperFront.png', zIndex: 30, x: 30, y: 42, width: 3 , height: 23 },
  { id: 'doorFrontLeft', name: 'Front Left Door', file: 'doorFrontLeft.png', zIndex: 40, x: 40, y: 36, width: 13, height: 32 },
  { id: 'doorRearLeft', name: 'Rear Left Door', file: 'doorRearLeft.png', zIndex: 30, x: 73, y: 32, width: 10, height: 35 },
  { id: 'wheelFrontLeft', name: 'Front Left Wheel', file: 'wheelFrontLeft.png', zIndex: 15, x: 62, y: 56, width: 9, height: 32 },
  { id: 'wheelRearLeft', name: 'Rear Left Wheel', file: 'wheelRearLeft.png', zIndex: 15, x: 82, y: 49, width: 5, height: 26 },
  { id: 'bonnet', name: 'Bonnet', file: 'bonnet.png', zIndex: 35, x: 27, y: 35, width: 29, height: 17 },
  { id: 'hem', name: 'Hem', file: 'hem.png', zIndex: 35, x: 58, y: 52, width: 24, height: 27 },
  { id: 'windowRearLeft', name: 'Rear Left Window', file: 'windowRearLeft.png', zIndex: 35, x: 72, y: 17, width: 10, height: 16 },
  { id: 'lightRearLeft', name: 'Rear Left Light', file: 'lightRearLeft.png', zIndex: 35, x: 86, y: 33, width: 2, height: 7 },
  { id: 'lightFrontLeft', name: 'Front Left Light', file: 'lightFrontLeft.png', zIndex: 35, x: 37, y: 49, width: 10, height: 10 },
  { id: 'windowFrontLeft', name: 'Front Left Window', file: 'windowFrontLeft.png', zIndex: 20, x: 41, y: 15, width: 14, height: 21 },
  { id: 'windowRear', name: 'Rear Window', file: 'windowRear.png', zIndex: 35, x: 74, y: 16, width: 17, height: 19 },
],
  rearRight: [
    { id: 'body', name: 'Car Body', file: 'body.png', zIndex: 10, x: 10, y: 10, width: 100, height: 100 },
    { id: 'roof', name: 'Roof', file: 'roof.png', zIndex: 20, x: 50, y: 20, width: 60, height: 20 },
    { id: 'roofEdge', name: 'Roof Edge', file: 'roofEdge.png', zIndex: 20, x: 50, y: 25, width: 40, height: 10 },
    { id: 'frontBumper', name: 'Front Bumper', file: 'bumperFront.png', zIndex: 30, x: 50, y: 25, width: 50, height: 15 },
    { id: 'rearBumper', name: 'Rear Bumper', file: 'bumperRear.png', zIndex: 30, x: 50, y: 75, width: 50, height: 15 },
    { id: 'doorFrontRight', name: 'Front Right Door', file: 'doorFrontRight.png', zIndex: 40, x: 65, y: 45, width: 25, height: 35 },
    { id: 'doorRear', name: 'Rear Door', file: 'doorRear.png', zIndex: 40, x: 50, y: 45, width: 25, height: 35 },
    { id: 'doorRearRight', name: 'Rear Right Door', file: 'doorRearRight.png', zIndex: 40, x: 35, y: 45, width: 25, height: 35 },
    { id: 'fenderFront', name: 'Front Fender', file: 'fenderFront.png', zIndex: 20, x: 75, y: 45, width: 20, height: 25 },
    { id: 'hem', name: 'Hem', file: 'hem.png', zIndex: 35, x: 50, y: 60, width: 60, height: 10 },
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

      {/* <div className="relative bg-gray-100" style={{ height: `${height}px` }}>
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
                    }}
                    data-area={part.id}
                    onClick={() => handlePartClick(part.id, part.name)}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="absolute top-4 left-4 bg-white bg-opacity-0 rounded-md px-3 py-2">
          <p className="text-sm font-medium text-gray-700">
            {VIEWS.find(v => v.id === currentView)?.label}
          </p>
        </div>

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
      </div> */}

      <div className="relative bg-gray-100" style={{ height: `${height}px` }}>
  {/* Car Views Container */}
  <div className="relative w-full h-full">
    {VIEWS.map((view) =>
      currentView === view.id ? (
        <div
          key={view.id}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative w-full h-64">
             {/* Base Car Body */}
  <img
    src={getImagePath(view.id, 'body.png')}
    alt="Car Body"
    className="absolute w-full h-full object-contain"
    style={{ zIndex: 1 }}
  />
            {CAR_PARTS[view.id].filter((part) => part.id !== 'body') // body alag render ho chuki hai
    .map((part) => (
              <img
                key={part.id}
                src={getImagePath(view.id, part.file)}
                alt={part.name}
                className={cn(
                  'absolute cursor-pointer transition-all duration-300 opacity-0 hover:opacity-50',
                  isPartSelected(part.id) && 'opacity-30 brightness-75'
                )}
                style={{
                  zIndex: part.zIndex,
                  top: `${part.y}%`,
                  left: `${part.x}%`,
                  width: `${part.width}%`,
                  height: `${part.height}%`,
                 opacity: 0.6
                 
                }}
                data-area={part.id}
                onClick={() => handlePartClick(part.id, part.name)}
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            ))}
          </div>
        </div>
      ) : null
    )}
  </div>

  {/* Current View Indicator */}
  <div className="absolute top-4 left-4 bg-white bg-opacity-0 rounded-md px-3 py-2">
    <p className="text-sm font-medium text-gray-700">
      {VIEWS.find((v) => v.id === currentView)?.label}
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
