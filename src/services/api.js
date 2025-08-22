// Simple MotorAPI v1 Service
class MotorAPI {
  constructor() {
    this.baseURL = import.meta.env.PROD
  ? "https://v1.motorapi.dk"   // production build
  : "/api";;
    this.apiKey = import.meta.env.VITE_MOTOR_API_KEY || ""; // set API key in .env
  }

  // ✅ Get single vehicle info by registration no. or VIN
  async getVehicle(registrationOrVin) {
    try {
      const response = await fetch(`${this.baseURL}/vehicles/${registrationOrVin}`, {
        headers: {
          "X-AUTH-TOKEN": this.apiKey,
        },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      return { success: true, data: await response.json() };
    } catch (err) {
      console.error("getVehicle error:", err);
      return { success: false, error: err.message };
    }
  }

  // ✅ Get list of vehicles (with optional status filter)
  async getVehicles({ registration_number, status } = {}) {
    try {
      const params = new URLSearchParams();
      if (registration_number) params.append("registration_number", registration_number);
      if (status) params.append("status", status);

      const response = await fetch(`${this.baseURL}/vehicles?${params}`, {
        headers: {
          "X-AUTH-TOKEN": this.apiKey,
        },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      return { success: true, data: await response.json() };
    } catch (err) {
      console.error("getVehicles error:", err);
      return { success: false, error: err.message, data: [] };
    }
  }
}

// Singleton export
const motorAPI = new MotorAPI();
export default motorAPI;

// Direct function exports
export const getVehicle = (regOrVin) => motorAPI.getVehicle(regOrVin);
export const getVehicles = (params) => motorAPI.getVehicles(params);

// Assessment-related functions - these would need to be implemented based on your actual backend
// For now, they return mock responses for development
export const submitAssessment = () => {
  console.warn('submitAssessment is not implemented for MotorAPI. Use your actual assessment service.');
  return Promise.resolve({
    success: false,
    error: 'Assessment submission not implemented for MotorAPI'
  });
};

export const getAssessments = () => {
  console.warn('getAssessments is not implemented for MotorAPI. Use your actual assessment service.');
  return Promise.resolve({ success: false, error: 'Not implemented', data: [] });
};

export const getAssessment = () => {
  console.warn('getAssessment is not implemented for MotorAPI. Use your actual assessment service.');
  return Promise.resolve({ success: false, error: 'Not implemented' });
};

export const updateAssessmentStatus = () => {
  console.warn('updateAssessmentStatus is not implemented for MotorAPI. Use your actual assessment service.');
  return Promise.resolve({ success: false, error: 'Not implemented' });
};
