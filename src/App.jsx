import { useState } from 'react'
import UserDetailsForm from './components/forms/UserDetailsForm'
import DamageAssessmentForm from './components/forms/DamageAssessmentForm'
import SuccessPage from './pages/SuccessPage'
import { submitAssessment, getVehicles } from './services/api'
import { Car, FileText, CheckCircle2 } from 'lucide-react'
import Hero from './pages/Hero'

const STEPS = {
  USER_DETAILS: 'user_details',
  DAMAGE_ASSESSMENT: 'damage_assessment',
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
    try {
      const result = await submitAssessment(assessmentData)
      
      if (result.success) {
        setAssessmentResult(result)
        setCurrentStep(STEPS.SUCCESS)
      } else {
        alert('Error submitting assessment: ' + result.error)
      }
    } catch (error) {
      alert('Error submitting assessment: ' + error.message)
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
          <ol className="flex items-center justify-between">
            {Object.entries({
              [STEPS.USER_DETAILS]: "1",
              [STEPS.DAMAGE_ASSESSMENT]: "2",
              [STEPS.SUCCESS]: "3",
            }).map(([stepKey, stepName], index) => {
              const completed = isStepCompleted(stepKey)
              const active = isStepActive(stepKey)

              return (
                <li key={stepKey} className="flex-1 flex items-center">
                  <div className="flex items-center space-x-3">
                    {/* Circle */}
                    <div
                      className={`
                        flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all
                        ${
                          completed
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
                        text-sm font-medium
                        ${
                          active
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
                    <div className="flex-1 h-0.5 mx-4 bg-gray-200" />
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500">
      © 2025 quick repair vehicle damage assessment
    </div>
  </footer>
</div>

    </>

  )
}

export default App
