import { Button } from "@/components/ui/button";
import { ArrowRight, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-hero text-primary-foreground overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo/Brand */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 rounded-3xl backdrop-blur-sm mb-6">
              <Building2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
              SSENN
            </h1>
            <div className="text-xl md:text-2xl text-white/90 mb-2">
              Education Holdings
            </div>
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Building the future through strategic educational initiatives and innovative digital solutions
          </p>

          {/* Description */}
          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            SSENN is a forward-thinking holding corporation dedicated to excellence in education and digital innovation. 
            We foster growth through our carefully curated portfolio of subsidiary companies, each specializing in 
            strategic solutions that create meaningful impact.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-4 shadow-elegant hover:shadow-xl transition-all duration-300"
            >
              <Link to="/subsidiaries">
                Explore Our Companies
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;