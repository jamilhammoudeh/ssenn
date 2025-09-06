import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Rocket, Code, Smartphone, Globe, Database, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const DigitalSolutions = () => {
  const futureSolutions = [
    {
      icon: Code,
      title: "Educational Technology Platforms",
      description: "Custom learning management systems and educational software solutions",
      status: "Planning"
    },
    {
      icon: Smartphone,
      title: "Mobile Learning Applications",
      description: "Innovative mobile apps for enhanced learning experiences",
      status: "Research"
    },
    {
      icon: Database,
      title: "Analytics & Insights",
      description: "Data-driven solutions for educational institutions and businesses",
      status: "Development"
    },
    {
      icon: Globe,
      title: "Digital Infrastructure",
      description: "Scalable cloud solutions and digital transformation services",
      status: "Planning"
    },
    {
      icon: Shield,
      title: "Security Solutions",
      description: "Cybersecurity and data protection for educational environments",
      status: "Research"
    }
  ];

  const currentCapabilities = [
    "Digital Strategy Consulting",
    "Web Development & Design",
    "Mobile Application Development",
    "Cloud Infrastructure Setup",
    "Digital Marketing Solutions",
    "Data Analytics & Reporting"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-3xl backdrop-blur-sm mb-6">
              <Rocket className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Digital Solutions
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Innovative technology solutions that power the future of education and digital transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="shadow-elegant bg-gradient-subtle border-primary/20">
              <CardContent className="p-8 md:p-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-6">
                  Launching Soon
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  We're developing cutting-edge digital solutions that will revolutionize how 
                  educational institutions and businesses approach technology. Our upcoming 
                  digital solutions division will offer comprehensive services from custom 
                  software development to complete digital transformation strategies.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild variant="default" size="lg" className="shadow-button">
                    <Link to="/contact">
                      Get Early Access
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/subsidiaries">
                      Explore Current Services
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Future Solutions */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Solutions in Development
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A preview of the innovative digital solutions we're building to transform 
              education and business operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {futureSolutions.map((solution, index) => (
              <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
                <CardContent className="pt-8 pb-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <solution.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={
                        solution.status === "Development" 
                          ? "bg-accent/10 text-accent" 
                          : solution.status === "Planning"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted"
                      }
                    >
                      {solution.status}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{solution.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{solution.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Capabilities */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Available Now
              </h2>
              <p className="text-lg text-muted-foreground">
                Through our existing subsidiary network, we currently offer these digital capabilities.
              </p>
            </div>

            <Card className="shadow-elegant">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-8 text-center">
                  Current Digital Services
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {currentCapabilities.map((capability, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gradient-primary rounded-full flex-shrink-0"></div>
                      <span className="font-medium">{capability}</span>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <p className="text-muted-foreground mb-6">
                    Ready to explore how our current digital capabilities can benefit your organization?
                  </p>
                  <Button asChild variant="default" className="shadow-button">
                    <Link to="/contact">
                      Discuss Your Project
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Partner with Our Innovation
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join us in shaping the future of educational technology and digital transformation. 
              We're always looking for innovative partners and early adopters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg" 
                variant="secondary"
                className="text-lg px-8 py-4"
              >
                <Link to="/contact">
                  Become a Partner
                </Link>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10"
              >
                <Link to="/about">
                  Learn More About Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalSolutions;