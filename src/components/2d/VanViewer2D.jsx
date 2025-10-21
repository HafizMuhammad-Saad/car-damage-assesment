 import { useState } from 'react';
import { cn } from '../../utils/cn';
import { FaSync } from 'react-icons/fa';

// Define car parts for each view with positioning coordinates
const VAN_PARTS = {
 frontLeft: [
  { id: 'body', name: 'Bilkarrosseri', file: 'body.png', zIndex: 10, x: 10, y: 10, width: 100, height: 100 },
  { id: 'hood', name: 'Tag', file: 'hood.png', zIndex: 36, x: 38, y: 18, width: 40, height: 6 },
  { id: 'mirrorLeft', name: 'Venstre sidespejl', file: 'mirrorLeft.png', zIndex: 40, x: 47, y: 37, width: 5.5, height: 6 },
  { id: 'mudguardLeft', name: 'Venstre bagskærm', file: 'mudguardLeft.png', zIndex: 29, x: 69.5, y: 20, width: 11, height: 42 },
  { id: 'fenderLeft', name: 'Venstre forskærm', file: 'fenderLeft.png', zIndex: 21, x: 37, y: 42, width: 10, height: 23 },
  { id: 'roofEdgeLeft', name: 'Venstre tagstolpe', file: 'roofEdgeFront.png', zIndex: 28, x: 42, y: 18, width: 37, height: 27 },
  { id: 'frontBumper', name: 'Forreste kofanger', file: 'bumperFront.png', zIndex: 30, x: 19, y: 56, width: 21, height: 22 },
  { id: 'rearBumper', name: 'Bageste kofanger', file: 'bumperRear.png', zIndex: 30, x: 77, y: 46, width: 4, height: 14 },

  { id: 'doorFrontLeft', name: 'Venstre fordør', file: 'doorFrontLeft.png', zIndex: 30, x: 46, y: 40, width: 14, height: 32 },
  { id: 'doorRearLeft', name: 'Venstre sidedør', file: 'doorRearLeft.png', zIndex: 30, x: 59, y: 37, width: 11, height: 30 },

  { id: 'wheelFrontLeft', name: 'Venstre forhjul', file: 'wheelFrontLeft.png', zIndex: 22, x: 39, y: 63, width: 9, height: 21 },
  { id: 'wheelRearLeft', name: 'Venstre baghjul', file: 'wheelRearLeft.png', zIndex: 30, x: 72, y: 51, width: 5, height: 17 },
  { id: 'bonnet', name: 'Motorhjelm', file: 'bonnet.png', zIndex: 19, x: 21, y: 39, width: 22, height: 15 },
  { id: 'panelLeft', name: 'Venstre panel', file: 'panelLeft.png', zIndex: 35, x: 49, y: 62, width: 22, height: 11 },
  { id: 'windowRearLeft', name: 'Venstre bagrude', file: 'windowRearLeft.png', zIndex: 35, x: 69, y: 21, width: 8, height: 15 },
  { id: 'lightRearLeft', name: 'Venstre baglygte', file: 'lightRearLeft.png', zIndex: 35, x: 79.5, y: 40, width: 1, height: 8 },
  { id: 'lightFrontLeft', name: 'Venstre forlygte', file: 'lightFrontLeft.png', zIndex: 35, x: 29, y: 54, width: 10, height: 8 },
  { id: 'windowFrontLeft', name: 'Venstre forrude', file: 'windowFrontLeft.png', zIndex: 35, x: 45, y: 23, width: 12, height: 21 },
  { id: 'windowFront', name: 'Forrude', file: 'windowFront.png', zIndex: 25, x: 28, y: 22, width: 21, height: 20 },

  { id: 'middleWindowLeft', name: 'Venstre bagdørsvindue', file: 'windowMiddle.png', zIndex: 35, x: 58, y: 22, width: 12, height: 17 },
],

frontRight: [
  { id: 'body', name: 'Bilkarrosseri', file: 'body.png', zIndex: 10, x: 10, y: 10, width: 100, height: 100 },
  { id: 'hood', name: 'Tag', file: 'hood.png', zIndex: 20, x: 23, y: 16, width: 40, height: 9 },
  { id: 'mirrorRight', name: 'Højre sidespejl', file: 'mirrorRight.png', zIndex: 35, x: 47, y: 37, width: 6.5, height: 7 },
  { id: 'mudguardRight', name: 'Højre bagskærm', file: 'mudguardRight.png', zIndex: 22, x: 19.5, y: 20, width: 11, height: 43 },
  { id: 'fenderRight', name: 'Højre forskærm', file: 'fenderRight.png', zIndex: 21, x: 53, y: 41, width: 10, height: 25 },
  { id: 'roofEdgeFrontLeft', name: 'Højre tagstolpe', file: 'roofEdgeFront.png', zIndex: 20, x: 22, y: 19, width: 35, height: 23 },

  { id: 'frontBumper', name: 'Forreste kofanger', file: 'bumperFront.png', zIndex: 30, x: 59, y: 54, width: 23, height: 27 },
  { id: 'rearBumper', name: 'Bageste kofanger', file: 'bumperRear.png', zIndex: 30, x: 19, y: 45, width: 4, height: 16 },

  { id: 'doorFrontRight', name: 'Højre fordør', file: 'doorFrontRight.png', zIndex: 30, x: 41, y: 39, width: 13, height: 33 },
  { id: 'doorRearRight', name: 'Højre sidedør', file: 'doorRearRight.png', zIndex: 30, x: 29.5, y: 36.5, width: 12, height: 31 },

  { id: 'wheelFrontRight', name: 'Højre forhjul', file: 'wheelFrontRight.png', zIndex: 35, x: 52, y: 62, width: 9, height: 23 },
  { id: 'wheelRearRight', name: 'Højre baghjul', file: 'wheelRearRight.png', zIndex: 35, x: 23, y: 50, width: 5, height: 17 },
  { id: 'bonnet', name: 'Motorhjelm', file: 'bonnet.png', zIndex: 20, x: 56, y: 37, width: 24, height: 19 },
  { id: 'panelRight', name: 'Højre panel', file: 'panelRight.png', zIndex: 35, x: 28.5, y: 61.5, width: 23, height: 12 },
  { id: 'windowRearRight', name: 'Højre bagrude', file: 'windowRearRight.png', zIndex: 35, x: 22, y: 20, width: 10, height: 17 },
  { id: 'lightRearRight', name: 'Højre baglygte', file: 'lightRearRight.png', zIndex: 35, x: 19.5, y: 40, width: 1, height: 7 },
  { id: 'lightFrontRight', name: 'Højre forlygte', file: 'lightFrontRight.png', zIndex: 35, x: 61, y: 53, width: 11, height: 10 },
  { id: 'windowFrontRight', name: 'Højre forrude', file: 'windowFrontRight.png', zIndex: 20, x: 42.5, y: 23, width: 13, height: 22 },
  { id: 'windowFront', name: 'Forrude', file: 'windowFront.png', zIndex: 30, x: 50, y: 21, width: 23, height: 24 },

  { id: 'middleWindowRight', name: 'Højre bagdørsvindue', file: 'windowMiddle.png', zIndex: 35, x: 30, y: 22, width: 12, height: 17 },
],

rearLeft: [
  { id: 'body', name: 'Bilkarrosseri', file: 'body.png', zIndex: 10, x: 10, y: 10, width: 100, height: 100 },
  { id: 'roofEdgeLeft', name: 'Venstre tagstolpe', file: 'roofEdgeLeft.png', zIndex: 11, x: 26, y: 20.5, width: 37.5, height: 12 },
  { id: 'hood', name: 'Tag', file: 'hood.png', zIndex: 10, x: 31, y: 19, width: 46, height: 4 },

  // Bagkofanger
  { id: 'rearBumper', name: 'Bageste kofanger', file: 'bumperRear.png', zIndex: 30, x: 55.5, y: 60, width: 25, height: 17 },
  { id: 'frontBumper', name: 'Forreste kofanger', file: 'bumperFront.png', zIndex: 30, x: 19.5, y: 46, width: 1, height: 14 },

  // Døre
  { id: 'doorFrontLeft', name: 'Venstre fordør', file: 'doorFrontLeft.png', zIndex: 40, x: 24, y: 37, width: 11, height: 28 },
  { id: 'doorRearLeft', name: 'Venstre sidedør', file: 'doorRearLeft.png', zIndex: 20, x: 34, y: 38, width: 13, height: 32 },
  { id: 'doorRear', name: 'Bagdør', file: 'doorRear.png', zIndex: 30, x: 61, y: 20, width: 19, height: 52 },

  // Hjul
  { id: 'wheelFrontLeft', name: 'Venstre forhjul', file: 'wheelFrontLeft.png', zIndex: 22, x: 21, y: 51, width: 5, height: 18 },
  { id: 'wheelRearLeft', name: 'Venstre baghjul', file: 'wheelRearLeft.png', zIndex: 36, x: 47, y: 60, width: 8, height: 21 },

  // Ruder
  { id: 'windowFrontLeft', name: 'Venstre forrude', file: 'windowFrontLeft.png', zIndex: 20, x: 25, y: 22, width: 10, height: 16 },
  { id: 'windowRearLeft', name: 'Venstre bagrude', file: 'windowRearLeft.png', zIndex: 40, x: 47, y: 22, width: 12, height: 19 },
  { id: 'windowRear', name: 'Bagrude', file: 'windowRear.png', zIndex: 35, x: 63.5, y: 22, width: 15, height: 21 },
  { id: 'middleWindowLeft', name: 'Venstre midtervindue', file: 'middleWindow.png', zIndex: 35, x: 35, y: 22, width: 13, height: 17 },

  // Baglygter
  { id: 'lightRearLeft', name: 'Venstre baglygte', file: 'lightRearLeft.png', zIndex: 35, x: 61, y: 50, width: 5, height: 11 },
  { id: 'lightRearRight', name: 'Højre baglygte', file: 'lightRearRight.png', zIndex: 35, x: 79.5, y: 46, width: 1, height: 9 },

  // Panel
  { id: 'panelLeft', name: 'Venstre panel', file: 'panelLeft.png', zIndex: 35, x: 26, y: 62, width: 21, height: 9 },
  
  // Skærm / spejl
  { id: 'fenderLeft', name: 'Venstre forskærm', file: 'fenderLeft.png', zIndex: 35, x: 20, y: 36, width: 5, height: 16 },
  { id: 'mudguardLeft', name: 'Venstre bagskærm', file: 'mudguardLeft.png', zIndex: 35, x: 46, y: 22, width: 15.5, height: 49 },
  { id: 'mirrorLeft', name: 'Venstre sidespejl', file: 'mirrorLeft.png', zIndex: 35, x: 24, y: 33, width: 3, height: 4 },
],

rearRight: [
  { id: 'body', name: 'Bilkarrosseri', file: 'body.png', zIndex: 10, x: 10, y: 10, width: 100, height: 100 },

  // Tag
  { id: 'roofEdgeRight', name: 'Højre tagstolpe', file: 'roofEdgeRight.png', zIndex: 11, x: 36, y: 19.5, width: 39, height: 15 },
  { id: 'hood', name: 'Tag', file: 'hood.png', zIndex: 10, x: 22, y: 19, width: 46, height: 4 },

  // Bagkofanger
  { id: 'rearBumper', name: 'Bageste kofanger', file: 'bumperRear.png', zIndex: 30, x: 19, y: 59, width: 26, height: 18 },
  { id: 'frontBumper', name: 'Forreste kofanger', file: 'bumperFront.png', zIndex: 30, x: 79.5, y: 46, width: 1, height: 14 },

  // Døre
  { id: 'doorFrontRight', name: 'Højre fordør', file: 'doorFrontRight.png', zIndex: 40, x: 65, y: 37, width: 11, height: 28 },
  { id: 'doorRearRight', name: 'Højre sidedør', file: 'doorRearRight.png', zIndex: 20, x: 53.5, y: 38, width: 12, height: 32 },
  { id: 'doorRear', name: 'Bagdør', file: 'doorRear.png', zIndex: 30, x: 19, y: 19, width: 21, height: 53 },

  // Hjul
  { id: 'wheelFrontRight', name: 'Højre forhjul', file: 'wheelFrontRight.png', zIndex: 35, x: 74, y: 51, width: 5, height: 18 },
  { id: 'wheelRearRight', name: 'Højre baghjul', file: 'wheelRearRight.png', zIndex: 36, x: 45, y: 60, width: 8, height: 21 },

  // Ruder
  { id: 'windowFrontRight', name: 'Højre forrude', file: 'windowFrontRight.png', zIndex: 20, x: 64.5, y: 21, width: 11, height: 18 },
  { id: 'windowRearRight', name: 'Højre bagrude', file: 'windowRearRight.png', zIndex: 40, x: 41, y: 22, width: 13, height: 19 },
  { id: 'windowRear', name: 'Bagrude', file: 'windowRear.png', zIndex: 35, x: 21, y: 22, width: 16, height: 21 },
  { id: 'middleWindowRight', name: 'Højre midtervindue', file: 'windowMiddle.png', zIndex: 35, x: 52, y: 21, width: 13, height: 19 },

  // Baglygter
  { id: 'lightRearRight', name: 'Højre baglygte', file: 'lightRearRight.png', zIndex: 35, x: 34, y: 50, width: 5, height: 11 },
  { id: 'lightRearLeft', name: 'Venstre baglygte', file: 'lightRearLeft.png', zIndex: 35, x: 19.5, y: 46, width: 1.5, height: 9 },

  // Panel
  { id: 'panelRight', name: 'Højre panel', file: 'panelRight.png', zIndex: 36, x: 53, y: 62, width: 21, height: 9 },

  // Skærm / spejl
  { id: 'fenderRight', name: 'Højre forskærm', file: 'fenderRight.png', zIndex: 35, x: 74.5, y: 35, width: 6, height: 18 },
  { id: 'mudguardRight', name: 'Højre bagskærm', file: 'mudguardRight.png', zIndex: 35, x: 38, y: 21, width: 17, height: 50 },
  { id: 'mirrorRight', name: 'Højre sidespejl', file: 'mirrorRight.png', zIndex: 35, x: 73.5, y: 33, width: 3, height: 5 },
],

};

const VAN_VIEWS = [
  { id: 'frontLeft', name: 'Foran venstre', label: 'Foran venstre visning' },
  { id: 'frontRight', name: 'Foran højre', label: 'Foran højre visning' },
  { id: 'rearLeft', name: 'Bag venstre', label: 'Bag venstre visning' },
  { id: 'rearRight', name: 'Bag højre', label: 'Bag højre visning' },
];

const VanViewer2D = ({ 
  onAreaSelect, 
  selectedAreas = [], 
  className,
  height = 400 
}) => {
  const [currentView, setCurrentView] = useState('frontLeft');
  const [selectedParts, setSelectedParts] = useState(new Set());

  // const [activePart, setActivePart] = useState(null);


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

  const [rotating, setRotating] = useState(false);

  const rotateCar = () => {
    setRotating(true); // start animation

    const currentIndex = VAN_VIEWS.findIndex(v => v.id === currentView);
    const nextIndex = (currentIndex + 1) % VAN_VIEWS.length;
    setCurrentView(VAN_VIEWS[nextIndex].id);

    setTimeout(() => {
      setRotating(false); // end animation after rotation
    }, 600);
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
        <div className="flex items-center justify-between flex-col md:flex-row gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Vurdering af varevognsskader</h3>
            <p className="text-sm text-gray-600 mt-1">
Klik på varevognsdele for at markere skader. Drej for at se fra forskellige vinkler.

            </p>
          </div>
          <button
            onClick={rotateCar}
            className="flex items-center gap-2 px-4 py-2 bg-[#fb5c14] text-white rounded-md hover:bg-[#ec550e] transition-colors text-sm font-medium"
          >
            Roter varevogn
            <FaSync
    className={`w-3 h-3 transition-transform duration-500 ${
      rotating ? 'animate-spin' : ''
    }`} />
          </button>

          
        </div>
      </div>

      
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
                      // zIndex: activePart === part.id ? 1 : part.zIndex,
                  top: `${part.y}%`,
                  left: `${part.x}%`,
                  width: `${part.width}%`,
                  height: `${part.height}%`,
                  transform: part.rotate ? `rotate(${part.rotate}deg)` : null
                }}
                data-area={part.id}
                onClick={(e) => {
  e.stopPropagation(); // prevent bubbling
      // setActivePart(part.id);
  handlePartClick(part.id, part.name);
}}
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
   <div className="absolute top-4 right-4 z-10 flex sm:hidden">

    <img src="/Zoom In.gif" alt="" className='w-16'/>
  </div>
  <div className="absolute top-4 left-4 bg-gray-200 z-10 bg-opacity-0 rounded-md px-3 py-2">
    
    <p className="text-sm font-medium text-gray-700">
      {VAN_VIEWS.find((v) => v.id === currentView)?.label}
    </p>

   
  </div>

  {/* View Navigation */}
  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
    {VAN_VIEWS.map((view) => (
      <button
        key={view.id}
        onClick={() => setCurrentView(view.id)}
        className={cn(
          'px-3 py-1 rounded-full text-xs font-light transition-colors',
          currentView === view.id
            ? 'bg-[#fb5c14] text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-100'
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
            Udvalgte beskadigede områder ({selectedParts.size || selectedAreas.length})
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
