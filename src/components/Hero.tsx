import { Button } from "@/components/ui/button";
import { ArrowRight, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-hero text-primary-foreground overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-accent/10 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Simple icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15 rounded-xl backdrop-blur-sm mb-8 shadow-card border border-white/20">
            <Building2 className="w-8 h-8 text-white" />
          </div>

          {/* Main headline */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
            Strategic Educational Excellence
          </h1>

          {/* Value proposition */}
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed font-light">
            Building the future through innovative educational initiatives and strategic digital solutions
          </p>

          {/* Description */}
          <p className="text-base text-white/75 mb-10 leading-relaxed max-w-2xl mx-auto">
            We are a forward-thinking holding corporation dedicated to fostering growth through our carefully curated portfolio of subsidiary companies, each specializing in creating meaningful educational impact.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild
              size="lg" 
              variant="secondary"
              className="px-8 py-3 shadow-button hover:shadow-glow transition-all duration-300 hover:scale-105 font-medium"
            >
              <Link to="/subsidiaries" className="flex items-center justify-center">
                Explore Our Portfolio
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline"
              className="px-8 py-3 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 font-medium hover:border-white/50"
            >
              <Link to="/about" className="flex items-center justify-center">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;