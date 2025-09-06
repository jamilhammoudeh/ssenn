import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Target, Users, Search, BarChart3, Mail, Phone, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Ihsaan = () => {
  const services = [
    {
      icon: Search,
      title: "Selective Curation",
      description: "We work only with influencers who maintain authentic engagement, demonstrate consistent content quality, and align with ethical values.",
      features: ["Authenticity verification", "Content quality assessment", "Values alignment check", "Engagement analysis"]
    },
    {
      icon: Target,
      title: "Strategic Matching",
      description: "Our matching process goes beyond follower count—we analyze audience demographics, engagement patterns, and content alignment for perfect brand-influencer fit.",
      features: ["Demographic analysis", "Engagement pattern study", "Content alignment assessment", "Brand-influencer compatibility"]
    },
    {
      icon: Users,
      title: "Campaign Management",
      description: "From initial outreach to final deliverables, we handle every detail. You focus on your business—we handle the influence.",
      features: ["End-to-end campaign management", "Professional outreach", "Content coordination", "Timeline management"]
    },
    {
      icon: BarChart3,
      title: "Performance Tracking",
      description: "Comprehensive reporting on campaign performance, engagement metrics, and ROI to ensure your influencer investments deliver measurable results.",
      features: ["Real-time analytics", "ROI measurement", "Engagement tracking", "Comprehensive reporting"]
    }
  ];

  const stats = [
    { label: "Successful Campaigns", value: "150+" },
    { label: "Brand Partners", value: "50+" },
    { label: "Influencer Network", value: "500+" },
    { label: "Industries Served", value: "15+" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20">
              SSENN Subsidiary
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Strategic Influence Ihsaan
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 italic">
              Authentic Digital Relationships
            </p>
            <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto mb-12">
              We're more than just an influencer marketing agency—we're architects of authentic digital relationships that translate into genuine bonds. Grounded in the pursuit of ihsaan and striving for excellence in all that we do.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8 py-4">
                <Mail className="mr-2 h-5 w-5" />
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 border-white/20 text-white hover:bg-white/10">
                <Phone className="mr-2 h-5 w-5" />
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-elegant">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our mission is simple: connect the right brands with the right influencers to create campaigns that feel natural, drive results, and contribute meaningfully to society through shared benefit and mutual growth.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Core Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive influencer marketing solutions designed to create authentic connections and drive measurable results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="shadow-card hover:shadow-glow transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-elegant bg-gradient-primary text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Build Authentic Relationships?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Let's discuss how Strategic Influence Ihsaan can help your brand connect with the right influencers for meaningful, results-driven campaigns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="px-8 py-4">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Our Team
                </Button>
                <Button asChild size="lg" variant="outline" className="px-8 py-4 border-white/20 text-white hover:bg-white/10">
                  <Link to="/subsidiaries">
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Back to Portfolio
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Ihsaan;