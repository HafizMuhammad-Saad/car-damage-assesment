import { useRef, useState, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Text, Box, useGLTF } from '@react-three/drei'
import { cn } from '../../utils/cn'

// Define clickable areas of the car
const CAR_AREAS = [
  { id: 'hood', position: [0, 0.8, 2], label: 'Hood', color: '#4F46E5' },
  { id: 'front-bumper', position: [0, 0.3, 2.8], label: 'Front Bumper', color: '#7C3AED' },
  { id: 'windshield', position: [0, 1.4, 1], label: 'Windshield', color: '#059669' },
  { id: 'roof', position: [0, 1.8, 0], label: 'Roof', color: '#DC2626' },
  { id: 'rear-windshield', position: [0, 1.4, -1], label: 'Rear Windshield', color: '#059669' },
  { id: 'trunk', position: [0, 0.8, -2], label: 'Trunk', color: '#4F46E5' },
  { id: 'rear-bumper', position: [0, 0.3, -2.8], label: 'Rear Bumper', color: '#7C3AED' },
  { id: 'left-door-front', position: [-1.2, 0.8, 0.8], label: 'Left Front Door', color: '#EA580C' },
  { id: 'left-door-rear', position: [-1.2, 0.8, -0.8], label: 'Left Rear Door', color: '#EA580C' },
  { id: 'right-door-front', position: [1.2, 0.8, 0.8], label: 'Right Front Door', color: '#EA580C' },
  { id: 'right-door-rear', position: [1.2, 0.8, -0.8], label: 'Right Rear Door', color: '#EA580C' },
  { id: 'left-side', position: [-1.4, 0.6, 0], label: 'Left Side Panel', color: '#0891B2' },
  { id: 'right-side', position: [1.4, 0.6, 0], label: 'Right Side Panel', color: '#0891B2' },
]

// Individual clickable area component
function ClickableArea({ area, onAreaClick, isSelected, damage }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  const baseColor = area.color
  const selectedColor = '#EF4444'
  const hoveredColor = '#FCD34D'
  
  let currentColor = baseColor
  if (isSelected) currentColor = selectedColor
  else if (hovered) currentColor = hoveredColor
  
  return (
    <group>
      <Box
        ref={meshRef}
        position={area.position}
        args={[0.4, 0.3, 0.3]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={() => onAreaClick(area)}
      >
        <meshStandardMaterial 
          color={currentColor} 
          transparent
          opacity={isSelected || hovered ? 0.8 : 0.3}
        />
      </Box>
      
      {(hovered || isSelected) && (
        <Text
          position={[area.position[0], area.position[1] + 0.5, area.position[2]]}
          fontSize={0.2}
          color={isSelected ? '#EF4444' : '#374151'}
          anchorX="center"
          anchorY="middle"
        >
          {area.label}
          {damage && `\n(${damage.severity})`}
        </Text>
      )}
    </group>
  )
}

// Realistic 3D car model using GLTF with fallback
function RealCarModel() {
  const { scene } = useGLTF('/models/car.glb', true, undefined, (error) => {
    console.warn('Could not load car.glb, using fallback box model:', error.message);
  });

  if (!scene) {
    // Fallback to simple box model when GLB is not available
    return (
      <group>
        {/* Main body */}
        <Box position={[0, 0.6, 0]} args={[2.4, 0.8, 4.5]}>
          <meshStandardMaterial color="#E5E7EB" />
        </Box>
        
        {/* Cabin */}
        <Box position={[0, 1.4, 0]} args={[2, 0.8, 2.5]}>
          <meshStandardMaterial color="#9CA3AF" />
        </Box>
        
        {/* Wheels */}
        {[[-1, 0, 1.5], [1, 0, 1.5], [-1, 0, -1.5], [1, 0, -1.5]].map((pos, i) => (
          <group key={i}>
            <mesh position={pos} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.35, 0.35, 0.3]} />
              <meshStandardMaterial color="#1F2937" />
            </mesh>
          </group>
        ))}
      </group>
    );
  }

  return <primitive object={scene} />;
}

// Camera controller for better initial view
function CameraController() {
  const { camera } = useThree()
  
  useEffect(() => {
    camera.position.set(5, 3, 5)
    camera.lookAt(0, 0, 0)
  }, [camera])
  
  return null
}

const CarModel = ({ 
  onAreaSelect, 
  selectedAreas = [], 
  damages = {},
  className,
  height = 400 
}) => {
  const handleAreaClick = (area) => {
    onAreaSelect(area.id, area.label)
  }

  const isAreaSelected = (areaId) => {
    return selectedAreas.includes(areaId)
  }

  return (
    <div className={cn('w-full border rounded-lg overflow-hidden bg-gray-50', className)}>
      <div className="p-4 bg-white border-b">
        <h3 className="text-lg font-semibold text-gray-900">Select Damage Areas</h3>
        <p className="text-sm text-gray-600 mt-1">
          Click on the highlighted areas to select damaged parts of your vehicle
        </p>
      </div>
      
      <div style={{ height: `${height}px` }} className="relative">
        <Canvas
          camera={{ position: [5, 3, 5], fov: 75 }}
          style={{ background: '#F9FAFB' }}
        >
          <CameraController />
          
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1}
            castShadow
          />
          <pointLight position={[-10, -10, -5]} intensity={0.3} />
          
          {/* Car body */}
          <RealCarModel />
          
          {/* Clickable areas */}
          {CAR_AREAS.map((area) => (
            <ClickableArea
              key={area.id}
              area={area}
              onAreaClick={handleAreaClick}
              isSelected={isAreaSelected(area.id)}
              damage={damages[area.id]}
            />
          ))}
          
          {/* Controls */}
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
            minDistance={3}
            maxDistance={15}
          />
        </Canvas>
        
        {/* Instructions overlay */}
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-lg p-3 text-sm text-gray-700 max-w-xs">
          <p><strong>Controls:</strong></p>
          <p>• Click on colored areas to select damage</p>
          <p>• Drag to rotate • Scroll to zoom</p>
          <p>• Right-drag to pan</p>
        </div>
      </div>
      
      {/* Selected areas summary */}
      {selectedAreas.length > 0 && (
        <div className="p-4 bg-blue-50 border-t">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            Selected Areas ({selectedAreas.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedAreas.map((areaId) => {
              const area = CAR_AREAS.find(a => a.id === areaId)
              return (
                <span
                  key={areaId}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {area?.label}
                </span>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default CarModel
