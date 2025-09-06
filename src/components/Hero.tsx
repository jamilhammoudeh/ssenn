import { Button } from "@/components/ui/button";
import { ArrowRight, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero text-primary-foreground overflow-hidden">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-accent/20 to-primary-light/30"></div>
        <div className="absolute inset-0 bg-gradient-glow"></div>
        
        {/* Animated floating elements */}
        <div className="absolute top-1/4 left-1/6 w-[500px] h-[500px] bg-primary/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/6 w-[400px] h-[400px] bg-accent/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-light/15 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-accent/20 rotate-45 rounded-lg animate-pulse delay-700"></div>
        <div className="absolute bottom-32 left-32 w-24 h-24 bg-primary/25 rotate-12 rounded-lg animate-pulse delay-300"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Premium Logo/Brand section */}
          <div className="mb-16 animate-fade-in">
            <div className="inline-flex items-center justify-center w-40 h-40 bg-white/15 rounded-full backdrop-blur-md mb-12 shadow-hero hover:scale-110 hover:bg-white/20 transition-all duration-700 border border-white/20">
              <Building2 className="w-20 h-20 text-white drop-shadow-2xl" />
            </div>
            <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tight leading-none bg-gradient-to-r from-white via-white to-accent-light bg-clip-text text-transparent drop-shadow-2xl">
              SSENN
            </h1>
            <div className="text-3xl md:text-4xl text-white/95 mb-6 font-extralight tracking-wide">
              Education Holdings
            </div>
          </div>

          {/* Enhanced tagline with gradient text */}
          <div className="mb-12 animate-fade-in delay-200">
            <p className="text-3xl md:text-4xl text-transparent bg-gradient-to-r from-white via-accent-light to-white bg-clip-text mb-12 leading-relaxed font-light max-w-4xl mx-auto">
              Building the future through strategic educational excellence
            </p>
          </div>

          {/* Enhanced description */}
          <div className="mb-20 animate-fade-in delay-400">
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto font-light">
              SSENN is a visionary holding corporation dedicated to transformative education and innovation. 
              We cultivate excellence through our carefully curated portfolio of subsidiary companies, 
              each pioneering solutions that shape the future of learning and growth.
            </p>
          </div>

          {/* Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center animate-fade-in delay-600">
            <Button 
              asChild
              size="lg" 
              variant="secondary"
              className="text-xl px-16 py-8 shadow-hero hover:shadow-glow transition-all duration-700 hover:scale-110 font-semibold text-primary border-2 border-transparent hover:border-white/30 bg-white/95 hover:bg-white"
            >
              <Link to="/subsidiaries">
                Explore Our Companies
                <ArrowRight className="ml-4 h-6 w-6" />
              </Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline"
              className="text-xl px-16 py-8 border-2 border-white/50 text-white hover:bg-white/20 hover:border-white/80 backdrop-blur-md transition-all duration-700 hover:scale-110 font-semibold bg-white/10"
            >
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Smooth transition to content */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-accent/60 rounded-full animate-pulse delay-1500"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse delay-800"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-primary-light/50 rounded-full animate-pulse delay-1200"></div>
      </div>
    </section>
  );
};

export default Hero;