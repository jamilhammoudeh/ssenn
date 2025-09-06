import { Button } from "@/components/ui/button";
import { ArrowRight, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Modern geometric background */}
      <div className="absolute inset-0 bg-gradient-warm"></div>
      
      {/* Animated geometric shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-white/5 to-accent/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left side - Content */}
          <div className="text-left space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white/90 text-sm font-medium">
                <Building2 className="w-5 h-5" />
                Education Holdings Corporation
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-tight">
                SSENN
              </h1>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-white/90 font-light leading-relaxed">
                Building tomorrow's educational ecosystem
              </h2>
            </div>

            <p className="text-xl text-white/80 leading-relaxed max-w-2xl">
              We're a forward-thinking holding corporation that transforms education through 
              strategic investments, innovative subsidiaries, and cutting-edge solutions that 
              create lasting impact in the educational landscape.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-2xl hover:shadow-glow transition-all duration-500 hover:scale-105 font-semibold text-lg px-8 py-6"
              >
                <Link to="/subsidiaries">
                  Explore Portfolio
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                asChild
                size="lg" 
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-500 hover:scale-105 font-semibold text-lg px-8 py-6"
              >
                <Link to="/about">
                  Our Story
                </Link>
              </Button>
            </div>
          </div>

          {/* Right side - Visual element */}
          <div className="relative lg:flex hidden justify-center items-center">
            <div className="relative">
              {/* Main circle */}
              <div className="w-80 h-80 bg-gradient-to-br from-white/20 to-white/5 rounded-full backdrop-blur-sm border border-white/20 shadow-2xl flex items-center justify-center">
                <div className="w-60 h-60 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center">
                  <Building2 className="w-20 h-20 text-white drop-shadow-lg" />
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-accent/30 rounded-full backdrop-blur-sm animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm animate-pulse delay-500"></div>
              <div className="absolute top-1/2 -left-12 w-8 h-8 bg-primary-light/40 rounded-full backdrop-blur-sm animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;