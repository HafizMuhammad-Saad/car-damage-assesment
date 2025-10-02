import { CheckCircle, Download, Mail, Phone, Clock } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card'
import Button from '../components/ui/Button'

const SuccessPage = ({ assessmentData, onStartNew }) => {
//   const { data: result } = assessmentData

//   const handlePrint = () => {
//     window.print()
//   }

//   const handleDownloadSummary = () => {
//     // Create a simple text summary
//     const summary = `
// VEHICLE DAMAGE ASSESSMENT SUMMARY
// ================================

// Assessment ID: ${result.assessmentId}
// Submission Date: ${new Date(result.submissionTime).toLocaleDateString()}

// CUSTOMER INFORMATION:
// Name: ${result.summary.customerName}
// Vehicle: ${result.summary.vehiclePlate}
// Service Type: ${result.summary.serviceType}

// DAMAGE SUMMARY:
// Total Areas Affected: ${result.summary.damageAreas}
// Images Submitted: ${result.summary.imagesUploaded}

// Damage Breakdown:
// ${Object.entries(result.summary.totalDamages).map(([severity, count]) => 
//   `- ${severity.charAt(0).toUpperCase() + severity.slice(1)}: ${count} area(s)`
// ).join('\n')}

// NEXT STEPS:
// Your assessment has been submitted and is being reviewed by our team.
// Estimated processing time: ${result.estimatedProcessingTime}
// Reference ID: ${result.contactReference}

// For questions, please contact us with your reference ID.
//     `

//     const blob = new Blob([summary], { type: 'text/plain' })
//     const url = URL.createObjectURL(blob)
//     const a = document.createElement('a')
//     a.href = url
//     a.download = `assessment-${result?.assessmentId}.txt`
//     document.body.appendChild(a)
//     a.click()
//     document.body.removeChild(a)
//     URL.revokeObjectURL(url)
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Success Header */}
//         <div className="text-center mb-8">
//           <CheckCircle className="mx-auto h-20 w-20 text-green-500 mb-4" />
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Assessment Submitted Successfully!
//           </h1>
//           <p className="text-lg text-gray-600">
//             Thank you for submitting your vehicle damage assessment. We've received all your information.
//           </p>
//         </div>

//         {/* Reference Information */}
//         <Card className="mb-6 bg-green-50 border-green-200">
//           <CardContent className="pt-6">
//             <div className="flex items-center justify-center space-x-2 text-green-800">
//               <CheckCircle className="h-5 w-5" />
//               <span className="text-sm font-medium">Assessment ID:</span>
//               <span className="text-lg font-bold font-mono">{result?.assessmentId}</span>
//             </div>
//             <p className="text-center text-sm text-green-700 mt-2">
//               Please save this reference number for your records
//             </p>
//           </CardContent>
//         </Card>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           {/* Assessment Summary */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Assessment Summary</CardTitle>
//               <CardDescription>
//                 Review of your submitted information
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center py-2 border-b">
//                   <span className="font-medium text-gray-700">Customer:</span>
//                   <span className="text-gray-900">{result.summary.customerName}</span>
//                 </div>
                
//                 <div className="flex justify-between items-center py-2 border-b">
//                   <span className="font-medium text-gray-700">Vehicle Plate:</span>
//                   <span className="text-gray-900 font-mono">{result.summary.vehiclePlate}</span>
//                 </div>
                
//                 <div className="flex justify-between items-center py-2 border-b">
//                   <span className="font-medium text-gray-700">Service Type:</span>
//                   <span className="text-gray-900 capitalize">
//                     {result.summary.serviceType.replace('-', ' ')}
//                   </span>
//                 </div>
                
//                 <div className="flex justify-between items-center py-2 border-b">
//                   <span className="font-medium text-gray-700">Damage Areas:</span>
//                   <span className="text-gray-900">{result.summary.damageAreas}</span>
//                 </div>
                
//                 <div className="flex justify-between items-center py-2 border-b">
//                   <span className="font-medium text-gray-700">Images Uploaded:</span>
//                   <span className="text-gray-900">{result.summary.imagesUploaded}</span>
//                 </div>

//                 <div className="pt-2">
//                   <span className="font-medium text-gray-700 block mb-2">Damage Severity:</span>
//                   <div className="space-y-1">
//                     {Object.entries(result.summary.totalDamages).map(([severity, count]) => (
//                       <div key={severity} className="flex justify-between text-sm">
//                         <span className="capitalize">{severity}:</span>
//                         <span>{count} area{count !== 1 ? 's' : ''}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Next Steps */}
//           <Card>
//             <CardHeader>
//               <CardTitle>What Happens Next?</CardTitle>
//               <CardDescription>
//                 Timeline and next steps for your assessment
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex items-start space-x-3">
//                   <Clock className="h-5 w-5 text-primary-500 mt-1" />
//                   <div>
//                     <h4 className="font-medium text-gray-900">Review Process</h4>
//                     <p className="text-sm text-gray-600">
//                       Our team will review your assessment within {result.estimatedProcessingTime}.
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start space-x-3">
//                   <Mail className="h-5 w-5 text-primary-500 mt-1" />
//                   <div>
//                     <h4 className="font-medium text-gray-900">Email Confirmation</h4>
//                     <p className="text-sm text-gray-600">
//                       You'll receive an email confirmation with detailed next steps.
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start space-x-3">
//                   <Phone className="h-5 w-5 text-primary-500 mt-1" />
//                   <div>
//                     <h4 className="font-medium text-gray-900">Contact Support</h4>
//                     <p className="text-sm text-gray-600">
//                       Have questions? Contact us with reference ID: <strong>{result.contactReference}</strong>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Action Buttons */}
//         <Card>
//           <CardContent className="pt-6">
//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//               <Button
//                 onClick={handleDownloadSummary}
//                 variant="primary"
//                 className="w-full sm:w-auto"
//               >
//                 <Download className="h-4 w-4 mr-2" />
//                 Download Summary
//               </Button>
              
//               <Button
//                 onClick={handlePrint}
//                 variant="secondary"
//                 className="w-full sm:w-auto"
//               >
//                 Print This Page
//               </Button>
              
//               <Button
//                 onClick={onStartNew}
//                 variant="outline"
//                 className="w-full sm:w-auto"
//               >
//                 Submit New Assessment
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Footer Information */}
//         <div className="mt-8 text-center text-sm text-gray-500">
//           <p>
//             Submitted on {new Date(result.submissionTime).toLocaleDateString()} at{' '}
//             {new Date(result.submissionTime).toLocaleTimeString()}
//           </p>
//           <p className="mt-2">
//             Keep your reference ID <strong>{result.assessmentId}</strong> for future correspondence.
//           </p>
//         </div>
//       </div>
//     </div>
//   )
 if (!assessmentData) {
    return <p>No assessment data available.</p>;
  }

  // No nested .data anymore
  const result = assessmentData;

  // const handlePrint = () => {
  //   window.print();
  // };

//   const handleDownloadSummary = () => {
//     const summary = `
// VEHICLE DAMAGE ASSESSMENT SUMMARY
// ================================

// Submission Date: ${new Date(result.submittedAt).toLocaleDateString()}

// CUSTOMER INFORMATION:
// Name: ${result.name}
// Email: ${result.email}
// Service Type: ${result.serviceType}

// DAMAGE SUMMARY:
// Total Areas Affected: ${result.totalDamageAreas}
// Images Submitted: ${result.images?.length || 0}

// Raw Damage Data:
// ${JSON.stringify(result.damages, null, 2)}
//     `;

//     const blob = new Blob([summary], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `assessment-summary.txt`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

  return (
   <div className="flex items-center justify-center py-8 bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg max-w-lg w-full p-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">
          Assessment Submitted Successfully
        </h2>
        <p className="mt-3 text-gray-600">
          Thank you, <span className="font-semibold">{result.name}</span>.
          <br />
          Your vehicle damage assessment has been received.
        </p>

        {/* Info Card */}
        <div className="mt-6 bg-gray-50 border rounded-lg p-4 text-left">
          <p className="text-gray-700 text-sm">
            <span className="font-medium">Service Type:</span>{" "}
            {result.serviceType}
          </p>
          <p className="text-gray-700 text-sm">
            <span className="font-medium">Total Damages:</span>{" "}
            {result.totalDamageAreas}
          </p>
          <p className="text-gray-700 text-sm">
            <span className="font-medium">Submitted At:</span>{" "}
            {new Date(result.submittedAt).toLocaleString()}
          </p>
        </div>

        {/* Action */}
        <div className="mt-8">
          <button
            onClick={onStartNew}
            className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg shadow transition cursor-pointer"
          >
            Start New Assessment
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage
