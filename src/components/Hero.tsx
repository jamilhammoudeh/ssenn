import { Button } from "@/components/ui/button";
import { ArrowRight, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-hero text-primary-foreground overflow-hidden">
      {/* Refined background decoration */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"></div>
        <div className="absolute top-1/3 left-1/5 w-64 h-64 bg-primary/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/5 w-48 h-48 bg-accent/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-black/5"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Refined Logo/Brand */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/15 rounded-2xl backdrop-blur-sm mb-6 shadow-card hover:scale-105 transition-all duration-300 border border-white/20">
              <Building2 className="w-10 h-10 text-white drop-shadow-sm" />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-3 tracking-tight leading-tight bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
              SSENN
            </h1>
            <div className="text-lg md:text-xl text-white/80 mb-6 font-medium tracking-wide">
              Education Holdings
            </div>
          </div>

          {/* Refined tagline */}
          <h2 className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-8 leading-relaxed font-light max-w-3xl mx-auto">
            Building the future through strategic educational initiatives and innovative solutions
          </h2>

          {/* Refined description */}
          <p className="text-base md:text-lg text-white/75 mb-12 max-w-2xl mx-auto leading-relaxed">
            SSENN is a forward-thinking holding corporation dedicated to excellence in education and digital innovation. 
            We foster growth through our carefully curated portfolio of subsidiary companies, each specializing in 
            strategic solutions that create meaningful impact.
          </p>

          {/* Refined CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild
              size="lg" 
              variant="secondary"
              className="text-base px-8 py-4 shadow-button hover:shadow-glow transition-all duration-300 hover:scale-105 font-medium min-w-[200px]"
            >
              <Link to="/subsidiaries" className="flex items-center justify-center">
                Explore Our Companies
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline"
              className="text-base px-8 py-4 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 font-medium min-w-[200px] hover:border-white/50"
            >
              <Link to="/about" className="flex items-center justify-center">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Refined bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/30 to-transparent"></div>
    </section>
  );
};

export default Hero;