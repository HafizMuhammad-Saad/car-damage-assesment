import React from 'react';
import { ArrowRight, ArrowDown, Star, Shield, Clock } from 'lucide-react';

function Hero() {
  return (
<div className=""
     >      {/* Hero Section */}
      <section className="relative md:min-h-[50vh] min-h-[50vh]  flex items-center justify-center px-4 sm:px-6 md:px-8 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/hero.jpg)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/90 via-yellow-900/80 to-orange-900/90" style={{background: '#56471a', opacity: 0.8}}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 text-center">
          <div className="space-y-8 sm:space-y-8 pt-16">
            {/* Badge */}
            {/* <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium">
              <Star className="w-4 h-4 mr-2 text-yellow-400" />
              Professional Vehicle Assessment
            </div> */}

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
              <span className="block text-white-500">
                Skadesanmeldelse
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-2xl text-white/80 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-2">
              Identificér nemt din bil og dens skader – indtast blot din nummerplade, bekræft din bils oplysninger, og vis os, hvor skaden er.
            </p>

            {/* CTA Buttons */}
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <button className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                Start Assessment
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-full transition-all duration-300">
                Learn More
              </button>
            </div> */}

            {/* Features */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4 group-hover:bg-white/20 transition-colors">
                  <Shield className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Secure & Reliable</h3>
                <p className="text-white/70">Bank-level security with encrypted data transmission</p>
              </div>

              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4 group-hover:bg-white/20 transition-colors">
                  <Clock className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Fast Processing</h3>
                <p className="text-white/70">Get your assessment results in minutes, not hours</p>
              </div>

              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4 group-hover:bg-white/20 transition-colors">
                  <Star className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Expert Analysis</h3>
                <p className="text-white/70">Professional-grade assessment by certified experts</p>
              </div>
            </div> */}<div className="flex justify-center">
          <ArrowDown className="w-6 h-6 sm:w-8 sm:h-8 animate-bounce mt-6 mb-3 text-white" />
        </div>
          </div>
        </div>
   </section>
    </div>
  );
}

export default Hero;