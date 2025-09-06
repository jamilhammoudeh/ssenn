import { Button } from "@/components/ui/button";
import { ArrowRight, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center bg-gradient-hero text-primary-foreground overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/30"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Enhanced Logo/Brand */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-white/10 rounded-full backdrop-blur-sm mb-8 shadow-glow hover:scale-110 transition-all duration-500">
              <Building2 className="w-16 h-16 text-white drop-shadow-lg" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight leading-tight">
              SSENN
            </h1>
            <div className="text-2xl md:text-3xl text-white/95 mb-4 font-light">
              Education Holdings
            </div>
          </div>

          {/* Enhanced tagline */}
          <p className="text-2xl md:text-3xl text-white/95 mb-10 leading-relaxed font-light">
            Building the future through strategic educational initiatives and innovative solutions
          </p>

          {/* Enhanced description */}
          <p className="text-xl text-white/85 mb-16 max-w-3xl mx-auto leading-relaxed">
            SSENN is a forward-thinking holding corporation dedicated to excellence in education and digital innovation. 
            We foster growth through our carefully curated portfolio of subsidiary companies, each specializing in 
            strategic solutions that create meaningful impact.
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              asChild
              size="lg" 
              variant="secondary"
              className="text-xl px-12 py-6 shadow-elegant hover:shadow-glow transition-all duration-500 hover:scale-105 font-medium"
            >
              <Link to="/subsidiaries">
                Explore Our Companies
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline"
              className="text-xl px-12 py-6 border-white/40 text-white hover:bg-white/15 backdrop-blur-sm transition-all duration-500 hover:scale-105 font-medium"
            >
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
    </section>
  );
};

export default Hero;