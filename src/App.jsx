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
    <div className="min-h-screen">
      {/* Header */}
       <header className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 shadow-2xl border-b border-gray-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-sm opacity-75"></div>
                <Car className="relative h-10 w-10 text-white p-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  Vehicle Damage Assessment
                </h1>
                <p className="text-sm text-gray-400 font-medium">
                  Professional damage evaluation and reporting
                </p>
              </div>
            </div>
            
            {/* Navigation or additional elements can go here */}
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex items-center space-x-6">
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                  Services
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                  About
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                  Contact
                </a>
              </nav>
              <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>
      <Hero />

      {/* Progress Steps - Hide on success page */}
      {/* {currentStep !== STEPS.SUCCESS && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav aria-label="Progress">
              <ol className="flex items-center justify-center space-x-8">
                {Object.entries({
                  [STEPS.USER_DETAILS]: 'Personal Details',
                  [STEPS.DAMAGE_ASSESSMENT]: 'Damage Assessment',
                  [STEPS.SUCCESS]: 'Complete'
                }).map(([stepKey, stepName], index) => {
                  const completed = isStepCompleted(stepKey)
                  const active = isStepActive(stepKey)
                  
                  return (
                    <li key={stepKey} className="flex items-center">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`
                            flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors
                            ${
                              completed
                                ? 'bg-primary-600 border-primary-600 text-white'
                                : active
                                ? 'border-primary-600 text-primary-600'
                                : 'border-gray-300 text-gray-500'
                            }
                          `}
                        >
                          {completed ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            getStepIcon(stepKey)
                          )}
                        </div>
                        <span
                          className={`
                            text-sm font-medium transition-colors
                            ${
                              active
                                ? 'text-primary-600'
                                : completed
                                ? 'text-gray-900'
                                : 'text-gray-500'
                            }
                          `}
                        >
                          {stepName}
                        </span>
                      </div>
                      {index < 2 && (
                        <div className="hidden sm:block ml-8 w-16 h-0.5 bg-gray-300" />
                      )}
                    </li>
                  )
                })}
              </ol>
            </nav>
          </div>
        </div>
      )} */}
            {/* Progress Steps - Hide on success page */}
      {/* {currentStep !== STEPS.SUCCESS && (
        <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 border-b border-gray-200/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <nav aria-label="Progress">
              <ol className="flex items-center justify-center space-x-12">
                {Object.entries({
                  [STEPS.USER_DETAILS]: 'Personal Details',
                  [STEPS.DAMAGE_ASSESSMENT]: 'Damage Assessment',
                  [STEPS.SUCCESS]: 'Complete'
                }).map(([stepKey, stepName], index) => {
                  const completed = isStepCompleted(stepKey)
                  const active = isStepActive(stepKey)
                  
                  return (
                    <li key={stepKey} className="flex items-center">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`
                            relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 transform hover:scale-105
                            ${
                              completed
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                                : active
                                ? 'border-cyan-500 text-cyan-600 bg-cyan-50 shadow-md shadow-cyan-500/20'
                                : 'border-gray-300 text-gray-400 bg-gray-50'
                            }
                          `}
                        >
                          {completed && (
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-sm opacity-50"></div>
                          )}
                          {completed ? (
                            <CheckCircle2 className="relative h-6 w-6" />
                          ) : (
                            <div className="relative">{getStepIcon(stepKey)}</div>
                          )}
                        </div>
                        <span
                          className={`
                            text-base font-semibold transition-all duration-300
                            ${
                              active
                                ? 'text-cyan-600'
                                : completed
                                ? 'text-gray-800'
                                : 'text-gray-500'
                            }
                          `}
                        >
                          {stepName}
                        </span>
                      </div>
                      {index < 2 && (
                        <div className={`hidden sm:block ml-10 w-20 h-1 rounded-full transition-colors duration-500 ${completed ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gray-200'}`} />
                      )}
                    </li>
                  )
                })}
              </ol>
            </nav>
          </div>
        </div>
      )} */}

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
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
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>
              © 2024 Vehicle Damage Assessment System. 
              Secure, professional, and reliable.
            </p>
          </div>
        </div>
      </footer>
    </div>
    </>

  )
}

export default App
