import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Target, Users, TrendingUp, Shield, Search, BarChart3 } from "lucide-react";

const Subsidiaries = () => {
  const subsidiaries = [
    {
      name: "Strategic Influence Ihsaan",
      tagline: "Authentic Digital Relationships",
      description: "We're more than just an influencer marketing agency—we're architects of authentic digital relationships that translate into genuine bonds. Grounded in the pursuit of ihsaan and striving for excellence in all that we do, our mission is simple: connect the right brands with the right influencers to create campaigns that feel natural, drive results, and contribute meaningfully to society through shared benefit and mutual growth.",
      established: "2024",
      focus: ["Influencer Marketing", "Digital Strategy", "Brand Partnerships"],
      services: [
        {
          icon: Search,
          title: "Selective Curation",
          description: "We work only with influencers who maintain authentic engagement, demonstrate consistent content quality, and align with ethical values."
        },
        {
          icon: Target,
          title: "Strategic Matching",
          description: "Our matching process goes beyond follower count—we analyze audience demographics, engagement patterns, and content alignment for perfect brand-influencer fit."
        },
        {
          icon: Users,
          title: "Campaign Management",
          description: "From initial outreach to final deliverables, we handle every detail. You focus on your business—we handle the influence."
        },
        {
          icon: BarChart3,
          title: "Performance Tracking",
          description: "Comprehensive reporting on campaign performance, engagement metrics, and ROI to ensure your influencer investments deliver measurable results."
        }
      ],
      status: "Active",
      website: "#"
    }
  ];

  const futureOpportunities = [
    "Educational Technology Platforms",
    "Digital Learning Solutions", 
    "Content Creation Studios",
    "Data Analytics Services"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Portfolio Companies
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Discover the innovative subsidiaries that make up the SSENN ecosystem, 
              each specializing in strategic solutions that create meaningful impact.
            </p>
          </div>
        </div>
      </section>

      {/* Current Subsidiaries */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Active Subsidiaries
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              Our current portfolio of companies, each operating at the forefront of their respective industries.
            </p>
          </div>

          {subsidiaries.map((subsidiary, index) => (
            <Card key={index} className="shadow-elegant hover:shadow-xl transition-all duration-300 mb-12">
              <CardContent className="p-8 md:p-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl md:text-3xl font-bold">{subsidiary.name}</h3>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {subsidiary.status}
                      </Badge>
                    </div>
                    <p className="text-lg text-muted-foreground italic">{subsidiary.tagline}</p>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <div className="text-sm text-muted-foreground">Established</div>
                    <div className="text-2xl font-bold text-primary">{subsidiary.established}</div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <p className="text-lg leading-relaxed text-foreground">
                    {subsidiary.description}
                  </p>
                </div>

                {/* Focus Areas */}
                <div className="mb-8">
                  <h4 className="font-semibold mb-4">Focus Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {subsidiary.focus.map((area, areaIndex) => (
                      <Badge key={areaIndex} variant="outline" className="text-sm">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div className="mb-8">
                  <h4 className="font-semibold mb-6">Core Services</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    {subsidiary.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                            <service.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2">{service.title}</h5>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="default" className="shadow-button">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline">
                    Contact Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Future Opportunities */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Future Expansion
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're always exploring new opportunities to expand our portfolio with 
              innovative companies that align with our mission and values.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="shadow-card">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6 text-center">
                  Areas of Interest
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {futureOpportunities.map((opportunity, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                      <TrendingUp className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="font-medium">{opportunity}</span>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button variant="outline">
                    Partnership Opportunities
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Subsidiaries;