 import { useState } from 'react';
import { cn } from '../../utils/cn';

// Define car parts for each view with positioning coordinates
const VAN_PARTS = {
  frontLeft: [
    { id: 'body', name: 'Car Body', file: 'body.png', zIndex: 10, x: 10, y: 10, width: 100, height: 100 },
    { id: 'hood', name: 'Hood', file: 'hood.png', zIndex: 20, x: 38, y: 18, width: 40, height: 6 },
    { id: 'mirrorLeft', name: 'Left Mirror', file: 'mirrorLeft.png', zIndex: 35, x: 47, y: 37, width: 5.5, height: 6 },
    { id: 'mudguardLeft', name: 'Left Mudguard', file: 'mudguardLeft.png', zIndex: 22, x: 69.5, y: 20, width: 11, height: 33 },
    { id: 'fenderLeft', name: 'Left Fender', file: 'fenderLeft.png', zIndex: 21, x: 37, y: 42, width: 10, height: 23 },
    { id: 'roofEdgeFront', name: 'Front Roof Edge 2', file: 'roofEdgeFront.png', zIndex: 34, x: 43, y: 22, width: 15, height: 20 },
    { id: 'frontBumper', name: 'Front Bumper', file: 'bumperFront.png', zIndex: 30, x: 19, y: 56, width: 21, height: 22 },
    { id: 'frontEdgeRear', name: 'Front Edge Rear', file: 'frontEdgeRear.png', zIndex: 18, x: 57, y: 17, width: 15, height: 4 },
    { id: 'rearBumper', name: 'Rear Bumper', file: 'bumperRear.png', zIndex: 30, x: 77, y: 46, width: 4, height: 14 },
    { id: 'doorFrontLeft', name: 'Front Left Door', file: 'doorFrontLeft.png', zIndex: 30, x: 46, y: 39, width: 14, height: 30 },
    { id: 'doorRearLeft', name: 'Rear Left Door', file: 'doorRearLeft.png', zIndex: 30, x: 59, y: 37, width: 11, height: 27 },
    { id: 'wheelFrontLeft', name: 'Front Left Wheel', file: 'wheelFrontLeft.png', zIndex: 22, x: 39, y: 63, width: 9, height: 21 },
    { id: 'wheelRearLeft', name: 'Rear Left Wheel', file: 'wheelRearLeft.png', zIndex: 15, x: 72, y: 51, width: 5, height: 17 },
    { id: 'bonnet', name: 'Bonnet', file: 'bonnet.png', zIndex: 19, x: 21, y: 39, width: 22, height: 15 },
    { id: 'hemLeft', name: 'Hem Left', file: 'hem.png', zIndex: 35, x: 49, y: 53, width: 23.5, height: 20 },
    { id: 'windowRearLeft', name: 'Rear Left Window', file: 'windowRearLeft.png', zIndex: 35, x: 69, y: 21, width: 8, height: 15 },
    { id: 'lightRearLeft', name: 'Rear Left Light', file: 'lightRearLeft.png', zIndex: 35, x: 79.5, y: 40, width: 1, height: 8 },
    { id: 'lightFrontLeft', name: 'Front Left Light', file: 'lightFrontLeft.png', zIndex: 35, x: 29, y: 54, width: 10, height: 8 },
    { id: 'windowFrontLeft', name: 'Front Left Window', file: 'windowFrontLeft.png', zIndex: 35, x: 45, y: 23, width: 12, height: 21 },
    { id: 'windowFront', name: 'Front Window', file: 'windowFront.png', zIndex: 25, x: 28, y: 22, width: 21, height: 20 },
  ],
  frontRight: [
  { id: 'body', name: 'Car Body', file: 'body.png', zIndex: 10, x: 10, y: 10, width: 100, height: 100 },
  { id: 'hood', name: 'Hood', file: 'hood.png', zIndex: 20, x: 23, y: 16, width: 40, height: 9 },
  { id: 'mirrorRight', name: 'Right Mirror', file: 'mirrorRight.png', zIndex: 35, x: 47, y: 37, width: 6.5, height: 7 },
  { id: 'hemRight', name: 'Right hem', file: 'hemRight.png', zIndex: 25, x: 26, y: 53, width: 26, height: 20 },
  { id: 'mudguardRight', name: 'Right Mudguard', file: 'mudguardRight.png', zIndex: 22, x: 19, y: 18, width: 12, height: 36 },
  { id: 'fenderRight', name: 'Right Fender', file: 'fenderRight.png', zIndex: 21, x: 53, y: 41, width: 10, height: 25 },
  { id: 'roofEdgeFrontLeft', name: 'Front Roof Edge', file: 'roofEdgeFront.png', zIndex: 20, x: 42, y: 19, width: 16, height: 26},
      { id: 'roofEdgeRear', name: 'Roof Edge Rear', file: 'roofEdgeRear.png', zIndex: 20, x: 27, y: 17, width: 15, height: 4 },

  { id: 'frontBumper', name: 'Front Bumper', file: 'bumperFront.png', zIndex: 30, x: 59, y: 54, width: 23, height: 27 },
  { id: 'frontEdgeRear', name: 'Front Edge Rear', file: 'frontEdgeRear.png', zIndex: 18, x: 23, y: 18, width: 21, height: 6 },
  { id: 'rearBumper', name: 'Rear Bumper', file: 'bumperRear.png', zIndex: 30, x: 19, y: 45, width: 4, height: 16 },
  { id: 'doorFrontRight', name: 'Front Right Door', file: 'doorFrontRight.png', zIndex: 30, x: 40, y: 38, width: 15, height: 33 },
  { id: 'doorRearRight', name: 'Rear Right Door', file: 'doorRearRight.png', zIndex: 30, x: 29, y: 35, width: 13, height: 30 },
  { id: 'wheelFrontRight', name: 'Front Right Wheel', file: 'wheelFrontRight.png', zIndex: 22, x: 52, y: 62, width: 9, height: 23 },
  { id: 'wheelRearRight', name: 'Rear Right Wheel', file: 'wheelRearRight.png', zIndex: 15, x: 23, y: 50, width: 5, height: 17 },
  { id: 'bonnet', name: 'Bonnet', file: 'bonnet.png', zIndex: 20, x: 56, y: 37, width: 24, height: 19 },
  { id: 'hem', name: 'Hem', file: 'hem.png', zIndex: 35, x: 27, y: 39, width: 24, height: 27 },
  { id: 'windowRearRight', name: 'Rear Right Window', file: 'windowRearRight.png', zIndex: 35, x: 22, y: 20, width: 10, height: 17 },
  { id: 'lightRearRight', name: 'Rear Right Light', file: 'lightRearRight.png', zIndex: 35, x: 19.5, y: 40, width: 1, height: 7 },
  { id: 'lightFrontRight', name: 'Front Right Light', file: 'lightFrontRight.png', zIndex: 35, x: 61, y: 53, width: 11, height: 10 },
  { id: 'windowFrontRight', name: 'Front Right Window', file: 'windowFrontRight.png', zIndex: 20, x: 42.5, y: 23, width: 13, height: 22 },
  { id: 'windowFront', name: 'Front Window', file: 'windowFront.png', zIndex: 30, x: 50, y: 21, width: 23, height: 24 },
],


rearLeft: [
  { id: 'body', name: 'Car Body', file: 'body.png', zIndex: 10, x: 10, y: 10, width: 100, height: 100 },
  { id: 'roofEdgeLeft', name: 'Left Roof Edge', file: 'roofEdgeLeft.png', zIndex: 11, x: 26, y: 20.5, width: 37.5, height: 12 },
  { id: 'hood', name: 'Hood', file: 'hood.png', zIndex: 10, x: 31, y: 19, width: 46, height: 4 },

  // Rear bumper
  { id: 'rearBumper', name: 'Rear Bumper', file: 'bumperRear.png', zIndex: 30, x: 55.5, y: 60, width: 25, height: 17 },
  { id: 'frontBumper', name: 'Front Bumper', file: 'bumperFront.png', zIndex: 30, x: 19.5, y: 46, width: 1, height: 14 },

  // Doors
  { id: 'doorFrontLeft', name: 'Front Left Door', file: 'doorFrontLeft.png', zIndex: 40, x: 24, y: 37, width: 11, height: 25 },
  { id: 'doorRearLeft', name: 'Rear Left Door', file: 'doorRearLeft.png', zIndex: 20, x: 34, y: 38, width: 13, height: 27 },
  { id: 'doorRear', name: 'Rear  Door', file: 'doorRear.png', zIndex: 30, x: 61, y: 23, width: 19, height: 48 },

  // Wheels
  { id: 'wheelFrontLeft', name: 'Front Left Wheel', file: 'wheelFrontLeft.png', zIndex: 22, x: 21, y: 51, width: 5, height: 18 },
  { id: 'wheelRearLeft', name: 'Rear Left Wheel', file: 'wheelRearLeft.png', zIndex: 22, x: 47, y: 60, width: 8, height: 21 },

  // Windows
  { id: 'windowFrontLeft', name: 'Front Left Window', file: 'windowFrontLeft.png', zIndex: 20, x: 25, y: 22, width: 10, height: 16 },
  { id: 'windowRearLeft', name: 'Rear Left Window', file: 'windowRearLeft.png', zIndex: 40, x: 47, y: 22, width: 12, height: 19 },
  { id: 'windowRear', name: 'Rear Window', file: 'windowRear.png', zIndex: 35, x: 63.5, y: 22, width: 15, height: 21 },
  { id: 'middleWindow', name: 'Middle Window', file: 'middleWindow.png', zIndex: 35, x: 35, y: 22, width: 13, height: 17 },

  // Rear light 
  { id: 'lightRearLeft', name: 'Rear Left Light', file: 'lightRearLeft.png', zIndex: 35, x: 61, y: 50, width: 5, height: 11 },
  { id: 'lightRearRight', name: 'Rear Right Light', file: 'lightRearRight.png', zIndex: 35, x: 79.5, y: 46, width: 1, height: 9 },

  // Lower trim / hem (adjusted roughly to span under doors)
  { id: 'hemLeft', name: 'Hem Left', file: 'hem.png', zIndex: 35, x: 26, y: 53, width: 25, height: 19 },
  
  { id: 'fenderLeft', name: 'fender Left', file: 'fenderLeft.png', zIndex: 35, x: 20, y: 36, width: 5, height: 16 },
  // mudguard left
  { id: 'mudguardLeft', name: 'mudguard Left', file: 'mudguardLeft.png', zIndex: 35, x: 46.5, y: 23, width: 15, height: 46 },
  //mirror left
  { id: 'mirrorLeft', name: 'mirror Left', file: 'mirrorLeft.png', zIndex: 35, x: 24, y: 33, width: 3, height: 4 },
  
],


rearRight: [
  { id: 'body', name: 'Car Body', file: 'body.png', zIndex: 10, x: 10, y: 10, width: 100, height: 100 },

  // Roof
  { id: 'roofEdgeRight', name: 'Right Roof Edge', file: 'roofEdgeRight.png', zIndex: 11, x: 36, y: 19.5, width: 39, height: 15 },
  { id: 'hood', name: 'Hood', file: 'hood.png', zIndex: 10, x: 22, y: 19, width: 46, height: 4 },

  // Rear bumper
  { id: 'rearBumper', name: 'Rear Bumper', file: 'bumperRear.png', zIndex: 30, x: 19, y: 59, width: 26, height: 18 },
  { id: 'frontBumper', name: 'Front Bumper', file: 'bumperFront.png', zIndex: 30, x: 79.5, y: 46, width: 1, height: 14 },

  // Doors
  { id: 'doorFrontRight', name: 'Front Right Door', file: 'doorFrontRight.png', zIndex: 40, x: 64, y: 37, width: 12, height: 25 },
  { id: 'doorRearRight', name: 'Rear Right Door', file: 'doorRearRight.png', zIndex: 20, x: 53, y: 37, width: 13, height: 31 },
  { id: 'doorRear', name: 'Rear Door', file: 'doorRear.png', zIndex: 30, x: 19, y: 23, width: 21, height: 49 },

  // Wheels
  { id: 'wheelFrontRight', name: 'Front Right Wheel', file: 'wheelFrontRight.png', zIndex: 22, x: 74, y: 51, width: 5, height: 18 },
  { id: 'wheelRearRight', name: 'Rear Right Wheel', file: 'wheelRearRight.png', zIndex: 22, x: 45, y: 60, width: 8, height: 21 },

  // Windows
  { id: 'windowFrontRight', name: 'Front Right Window', file: 'windowFrontRight.png', zIndex: 20, x: 64.5, y: 21, width: 11, height: 18 },
  { id: 'windowRearRight', name: 'Rear Right Window', file: 'windowRearRight.png', zIndex: 35, x: 41, y: 22, width: 12, height: 19 },
  { id: 'windowRear', name: 'Rear Window', file: 'windowRear.png', zIndex: 35, x: 22, y: 22, width: 15, height: 21 },
  { id: 'middleWindow', name: 'Middle Window', file: 'windowMiddle.png', zIndex: 35, x: 52, y: 22, width: 13, height: 17 },

  // Rear lights
  { id: 'lightRearRight', name: 'Rear Right Light', file: 'lightRearRight.png', zIndex: 35, x: 34, y: 50, width: 5, height: 11 },
  { id: 'lightRearLeft', name: 'Rear Left Light', file: 'lightRearLeft.png', zIndex: 35, x: 19.5, y: 46, width: 1.5, height: 9 },

  // Hem
  { id: 'hemRight', name: 'Hem Right', file: 'hem.png', zIndex: 35, x: 49, y: 53, width: 25, height: 19 },

  // Fender / Mudguard / Mirror
  { id: 'fenderRight', name: 'Fender Right', file: 'fenderRight.png', zIndex: 35, x: 74.5, y: 35, width: 6, height: 18 },
  { id: 'mudguardRight', name: 'Mudguard Right', file: 'mudguardRight.png', zIndex: 35, x: 37, y: 23, width: 19, height: 46 },
  { id: 'mirrorRight', name: 'Mirror Right', file: 'mirrorRight.png', zIndex: 35, x: 73, y: 33, width: 3, height: 5 },
]
};

const VAN_VIEWS = [
  { id: 'frontLeft', name: 'Front Left', label: 'Front Left View' },
  { id: 'frontRight', name: 'Front Right', label: 'Front Right View' },
  { id: 'rearLeft', name: 'Rear Left', label: 'Rear Left View' },
  { id: 'rearRight', name: 'Rear Right', label: 'Rear Right View' },
];

const VanViewer2D = ({ 
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
    const currentIndex = VAN_VIEWS.findIndex(v => v.id === currentView);
    const nextIndex = (currentIndex + 1) % VAN_VIEWS.length;
    setCurrentView(VAN_VIEWS[nextIndex].id);
  };

  const getImagePath = (view, partFile) => {
    return `/static/assets/img/van/${view}/${partFile}`;
  };

  const isPartSelected = (partId) => {
    return selectedParts.has(partId) || selectedAreas.includes(partId);
  };

  return (
    <div className={cn('w-full border rounded-lg overflow-hidden', className)}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Van Damage Assessment</h3>
            <p className="text-sm text-gray-600 mt-1">
              Click on van parts to mark damage. Rotate to view different angles.
            </p>
          </div>
          <button
            onClick={rotateCar}
            className="px-4 py-2 bg-[#fb5c14] text-white rounded-md hover:bg-[#ec550e] transition-colors text-sm font-medium"
          >
            Rotate Van
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

      <div className="relative" style={{ height: `${height}px` }}>
  {/* Car Views Container */}
  <div className="relative w-full h-full">
    {VAN_VIEWS.map((view) =>
      currentView === view.id ? (
        <div
          key={view.id}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* <div className="relative w-full h-64"> */}
          <div className="relative w-full max-w-4xl mx-auto aspect-[4/2]">
             {/* Base Car Body */}
  <img
    src={getImagePath(view.id, 'body.png')}
    alt="Car Body"
    className="absolute inset-0 w-full h-full object-contain"
    style={{ zIndex: 1 }}
  />
            {VAN_PARTS[view.id].filter((part) => part.id !== 'body') // body alag render ho chuki hai
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
                  transform: part.rotate ? `rotate(${part.rotate}deg)` : null
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
      {VAN_VIEWS.find((v) => v.id === currentView)?.label}
    </p>
  </div>

  {/* View Navigation */}
  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
    {VAN_VIEWS.map((view) => (
      <button
        key={view.id}
        onClick={() => setCurrentView(view.id)}
        className={cn(
          'px-3 py-1 rounded-full text-xs font-medium transition-colors',
          currentView === view.id
            ? 'bg-[#fb5c14] text-white'
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
          <h4 className="text-sm font-medium text-gray-800 mb-2">
            Selected Damaged Areas ({selectedParts.size || selectedAreas.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {Array.from(selectedParts).map((partId) => {
              const part = Object.values(VAN_PARTS).flat().find(p => p.id === partId);
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

export default VanViewer2D;
