import Hero from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Users, Globe, Lightbulb } from "lucide-react";

const Home = () => {
  const highlights = [
    {
      icon: Target,
      title: "Strategic Vision",
      description: "Focused on long-term growth and sustainable impact across our portfolio companies."
    },
    {
      icon: Users,
      title: "Expert Leadership",
      description: "Experienced management team with proven track records in education and technology."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "International perspective with local expertise in key educational markets."
    },
    {
      icon: Lightbulb,
      title: "Innovation Focus",
      description: "Committed to advancing educational technology and digital transformation."
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Company Overview */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              A Holding Corporation Built for Growth
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              SSENN serves as the parent company for a carefully selected portfolio of subsidiaries, 
              each operating at the forefront of educational innovation and digital excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <Card key={index} className="text-center shadow-card hover:shadow-elegant transition-all duration-300">
                <CardContent className="pt-8 pb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6">
                    <highlight.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{highlight.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subsidiaries Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Portfolio Companies
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the innovative subsidiaries driving educational excellence and digital transformation.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="shadow-elegant hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                      Strategic Influence Ihsaan
                    </h3>
                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                      Our flagship subsidiary specializing in authentic digital relationships and 
                      strategic influencer marketing that creates meaningful connections between 
                      brands and communities.
                    </p>
                    <Button asChild variant="default" className="shadow-button">
                      <Link to="/subsidiaries">
                        Explore All Companies
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="bg-gradient-primary rounded-2xl p-8 text-center text-white">
                    <div className="text-4xl font-bold mb-2">2024</div>
                    <div className="text-lg opacity-90">Founded</div>
                    <div className="mt-6 space-y-2">
                      <div className="text-sm opacity-80">Specializing in</div>
                      <div className="font-semibold">Influencer Marketing</div>
                      <div className="font-semibold">Digital Strategy</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Partner with SSENN
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Explore opportunities to collaborate with our growing portfolio of innovative companies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-4"
            >
              <Link to="/contact">
                Get in Touch
              </Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10"
            >
              <Link to="/about">
                Learn About Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;