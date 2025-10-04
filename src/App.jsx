import { useState } from 'react'
import UserDetailsForm from './components/forms/UserDetailsForm'
import DamageAssessmentForm from './components/forms/DamageAssessmentForm'
import SuccessPage from './pages/SuccessPage'
// eslint-disable-next-line no-unused-vars
// import { submitAssessment, getVehicles } from './services/api'
import { Car, FileText, CheckCircle2 } from 'lucide-react'
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";


import Hero from './pages/Hero'

const STEPS = {
  USER_DETAILS: 'user_details',
  DAMAGE_ASSESSMENT: 'damage_assessment',
  PROCESSING: 'processing',   // 👈 new step

  SUCCESS: 'success'
}

function App() {
  const [currentStep, setCurrentStep] = useState(STEPS.USER_DETAILS)
  const [userDetails, setUserDetails] = useState(null)
  const [assessmentResult, setAssessmentResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleUserDetailsNext = (data) => {
    setUserDetails(data)
    setCurrentStep(STEPS.DAMAGE_ASSESSMENT)
  }

  const handleDamageAssessmentSubmit = async (assessmentData) => {
    setLoading(true)

    setCurrentStep(STEPS.PROCESSING); // 👈 Show processing screen immediately

    try {
      // const result = await submitAssessment(assessmentData)
      // Merge data from step 1 (UserDetails) + step 2 (DamageAssessment)
      const finalData = {
        ...userDetails,          // from UserDetailsForm
        ...assessmentData,       // from DamageAssessmentForm
        submittedAt: new Date().toISOString(),
      };

      const formData = new FormData();
      // Object.keys(finalData).forEach((key) => {
      //   if (key === "images") {
      //     // Attach files
      //     finalData.images.forEach((img, index) => {
      //       if (img.file instanceof File) {
      //         formData.append(`image_${index + 1}`, img.file, img.name);
      //       }
      //     });
      //   } else if (typeof finalData[key] === "object") {
      //     // Stringify nested objects/arrays (like damages)
      //     formData.append(key, JSON.stringify(finalData[key]));
      //   } else {
      //     formData.append(key, finalData[key]);
      //   }
      // });
      // --- User Details ---
      formData.append("name", finalData.name || "");
      formData.append("email", finalData.email || "");
      formData.append("mobile", finalData.mobile || "");
      formData.append("address", finalData.address || "");
      formData.append("carNumberPlate", finalData.carNumberPlate || "");
      formData.append("serviceType", finalData.serviceType || "");

      // --- Car Info (flatten key fields) ---
      if (finalData.carInfo) {
        formData.append("car_make", finalData.carInfo.make || "");
        formData.append("car_model", finalData.carInfo.model || "");

      }

      // --- Damages (flatten each one) ---
      if (Array.isArray(finalData.damages)) {
        finalData.damages.forEach((damage, index) => {
          formData.append(
            `damage_${index + 1}`,
            `${damage.areaLabel} `
          );
        });
      }

      // --- Images (files) ---
      if (Array.isArray(finalData.images)) {
        finalData.images.forEach((img, index) => {
          if (img.file instanceof File) {
            formData.append(`image_${index + 1}`, img.file, img.name);
          }
        });
      }

      // --- Metadata ---
      formData.append("totalDamageAreas", finalData.damages?.length || 0);
      formData.append("submittedAt", finalData.submittedAt);

      // --- FormSubmit settings ---
      formData.append("_subject", "🚗 New Vehicle Damage Assessment");
      formData.append("_template", "table"); // makes email structured
      formData.append("_captcha", "false");  // disable captcha

      // --- Auto reply to customer ---
      formData.append("_autoresponse", "✅ Thanks for using our service! We will call you shortly.");


      const response = await fetch("/api/sendEmail", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("✅ Assessment submitted successfully!");

        setAssessmentResult(finalData);
        setCurrentStep(STEPS.SUCCESS);
      } else {
        toast.error("Failed to submit assessment. Please try again.");
        setCurrentStep(STEPS.SUCCESS);

      }
      // if (result.success) {
      //   setAssessmentResult(result)
      //   setCurrentStep(STEPS.SUCCESS)
      // } else {
      //   alert('Error submitting assessment: ' + result.error)
      // }
    } catch (error) {
      toast.error("Something went wrong while submitting.", error);
      setCurrentStep(STEPS.SUCCESS);

    } finally {
      setLoading(false)
    }
  }

  const handleBackToUserDetails = () => {
    setCurrentStep(STEPS.USER_DETAILS)
  }

  const handleStartNew = () => {
    setCurrentStep(STEPS.USER_DETAILS)
    setUserDetails(null)
    setAssessmentResult(null)
  }

  const getStepIcon = (step) => {
    switch (step) {
      case STEPS.USER_DETAILS:
        return <FileText className="h-5 w-5" />
      case STEPS.DAMAGE_ASSESSMENT:
        return <Car className="h-5 w-5" />
      case STEPS.SUCCESS:
        return <CheckCircle2 className="h-5 w-5" />
      default:
        return null
    }
  }

  const isStepCompleted = (step) => {
    switch (step) {
      case STEPS.USER_DETAILS:
        return userDetails !== null
      case STEPS.DAMAGE_ASSESSMENT:
        return assessmentResult !== null
      case STEPS.SUCCESS:
        return true
      default:
        return false
    }
  }

  const isStepActive = (step) => {
    return currentStep === step
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Hero */}
        <Hero />

        {/* Progress Steps */}
        {currentStep !== STEPS.SUCCESS && (
          <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 border-b border-gray-200/50 shadow-sm flex justify-around">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <nav aria-label="Progress">
                <ol className="  flex flex-col space-y-6 sm:flex-row sm:items-center sm:justify-between sm:space-y-0
          ">
                  {Object.entries({
                    [STEPS.USER_DETAILS]: "Brugeroplysninger",
                    [STEPS.DAMAGE_ASSESSMENT]: "Vurdering",
                    [STEPS.SUCCESS]: "Komplet",
                  }).map(([stepKey, stepName], index) => {
                    const completed = isStepCompleted(stepKey)
                    const active = isStepActive(stepKey)

                    return (
                      <li key={stepKey} className="flex items-center sm:flex-1">
                        <div className="flex items-center space-x-3">
                          {/* Circle */}
                          <div
                            className={`
                        flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all
                        ${completed
                                ? "bg-orange-500 border-orange-500 text-white"
                                : active
                                  ? "border-orange-500 text-orange-600"
                                  : "border-gray-300 text-gray-400"
                              }
                      `}
                          >
                            {completed ? (
                              <CheckCircle2 className="h-5 w-5" />
                            ) : (
                              getStepIcon(stepKey)
                            )}
                          </div>
                          {/* Label */}
                          <span
                            className={`
                        text-sm font-medium truncate max-w-[90px] sm:max-w-none
                        ${active
                                ? "text-orange-600"
                                : completed
                                  ? "text-gray-900"
                                  : "text-gray-500"
                              }
                      `}
                          >
                            {stepName}
                          </span>
                        </div>

                        {/* Connector */}
                        {index < 2 && (
                          <div className="hidden sm:block flex-1 h-0.5 mx-4 bg-gray-200" />
                        )}
                      </li>
                    )
                  })}
                </ol>
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {currentStep === STEPS.USER_DETAILS && (
              <UserDetailsForm
                onNext={handleUserDetailsNext}
                initialData={userDetails}
              />
            )}

            {currentStep === STEPS.DAMAGE_ASSESSMENT && (
              <DamageAssessmentForm
                onSubmit={handleDamageAssessmentSubmit}
                onBack={handleBackToUserDetails}
                userDetails={userDetails}
                loading={loading}
              />
            )}

            {currentStep === STEPS.PROCESSING && (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center animate-fadeIn">
                <div className="relative flex items-center justify-center mb-6">
                  <div className="w-14 h-14 border-4 border-orange-200 rounded-full animate-ping absolute"></div>
                  <div className="w-14 h-14 border-4 border-[#fb5c14] border-t-transparent rounded-full animate-spin"></div>
                </div>

                <h2 className="text-xl font-semibold text-[#fb5c14]">
                  Submitting Your Assessment...
                </h2>
                <p className="text-gray-600 mt-2 text-sm max-w-sm">
                  Please wait a few seconds while we process your data and send confirmation.
                </p>
              </div>
            )}

            {currentStep === STEPS.SUCCESS && assessmentResult && (
              <SuccessPage
                assessmentData={assessmentResult}
                onStartNew={handleStartNew}
              />
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center font-bold text-sm text-gray-500">
            © 2025 Quick Repair Vehicle Damage Assessment
          </div>
        </footer>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: "#fff", color: "#333", border: "1px solid #fb5c14" },
          success: { iconTheme: { primary: "#fb5c14", secondary: "#fff" } },
        }}
      />

    </>

  )
}

export default App
