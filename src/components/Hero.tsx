import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-background py-20 md:py-28 overflow-hidden">
      {/* Modern geometric background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-40"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <Target className="w-4 h-4 mr-2" />
                Educational Excellence
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Transforming Education Through 
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Innovation</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                We build and nurture educational companies that create lasting impact through strategic innovation and forward-thinking solutions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg" 
                className="px-8 py-4 shadow-button hover:shadow-glow transition-all duration-300"
              >
                <Link to="/subsidiaries" className="flex items-center justify-center">
                  View Our Portfolio
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline"
                className="px-8 py-4 transition-all duration-300 hover:scale-105"
              >
                <Link to="/about" className="flex items-center justify-center">
                  Our Story
                </Link>
              </Button>
            </div>
          </div>

          {/* Right column - Visual elements */}
          <div className="relative lg:ml-8">
            <div className="grid grid-cols-2 gap-6">
              {/* Feature cards */}
              <div className="space-y-6">
                <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Strategic Partnerships</h3>
                  <p className="text-sm text-muted-foreground">Building meaningful relationships that drive educational innovation</p>
                </div>
                
                <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 lg:mt-8">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Focused Growth</h3>
                  <p className="text-sm text-muted-foreground">Carefully curated portfolio of high-impact educational ventures</p>
                </div>
              </div>
              
              <div className="space-y-6 lg:mt-8">
                <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-gradient-primary/20 rounded-xl flex items-center justify-center mb-4">
                    <Lightbulb className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Innovation First</h3>
                  <p className="text-sm text-muted-foreground">Pioneering solutions that reshape the educational landscape</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;