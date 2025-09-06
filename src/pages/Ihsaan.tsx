import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Shield, BarChart3, Lock, ArrowRight, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Ihsaan = () => {
  const features = [
    {
      icon: Target,
      title: "Pre-Vetted Network",
      description: "Every influencer in our network demonstrates authentic engagement, ethical content practices, and genuine connection with their audience. We do the research so you don't have to."
    },
    {
      icon: Shield,
      title: "Full Campaign Management",
      description: "From initial outreach to final deliverables, we handle every detail. You focus on your business—we handle the influence."
    },
    {
      icon: BarChart3,
      title: "Performance-Based Pricing",
      description: "We only succeed when you do. Our commission-based model ensures we're invested in delivering real results, not just connections."
    },
    {
      icon: Lock,
      title: "Risk-Free Partnerships",
      description: "No upfront fees, no long-term contracts. Pay only for successful campaign deliveries and proven performance."
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Discovery Call",
      description: "We learn about your brand, goals, and target audience to identify the perfect influencer matches"
    },
    {
      number: "2", 
      title: "Strategic Matching",
      description: "Our team presents pre-vetted influencer options with proven track records in your niche"
    },
    {
      number: "3",
      title: "Campaign Launch", 
      description: "We handle negotiations, contracts, and campaign management from start to finish"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-blue-700/90 to-purple-700/90"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20">
              SSENN Subsidiary
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Connect. Create. Convert.
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto mb-12">
              We bridge the gap between premium brands and top-tier influencers, striving for excellence in all that we do and ensuring that our influence has a meaningful impact on society. We deliver authentic partnerships that drive real results. No guesswork. No wasted budgets. Just strategic influence that works.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="px-8 py-4 bg-white text-blue-700 hover:bg-white/90 font-semibold">
                <Link to="/contact">
                  For Brands
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-8 py-4 border-white/30 text-white hover:bg-white/10 font-semibold">
                <Link to="/contact">
                  For Influencers
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Strategic Influence Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              Why Strategic Influence?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We don't just connect brands and influencers—we architect authentic relationships rooted in excellence and deep impact that deliver measurable results for both sides.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to launch your next successful campaign
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-elegant bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white border-0">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Build Authentic Relationships?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Let's discuss how Strategic Influence Ihsaan can help your brand connect with the right influencers for meaningful, results-driven campaigns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="px-8 py-4 bg-white text-blue-700 hover:bg-white/90 font-semibold">
                  <Link to="/contact">
                    <Mail className="mr-2 h-5 w-5" />
                    Contact Our Team
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="px-8 py-4 border-white/30 text-white hover:bg-white/10 font-semibold">
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