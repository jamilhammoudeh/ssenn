import { Card, CardContent } from "@/components/ui/card";
import { Eye, Target, Heart, Users, Award, Globe } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Ihsaan Excellence",
      description: "We pursue ihsaan—excellence in all that we do—striving for perfection in our work, relationships, and impact on society."
    },
    {
      icon: Users,
      title: "Authentic Relationships",
      description: "Building genuine connections and partnerships based on trust, transparency, and mutual respect."
    },
    {
      icon: Target,
      title: "Strategic Vision",
      description: "Long-term thinking that prioritizes sustainable growth and meaningful impact over short-term gains."
    },
    {
      icon: Award,
      title: "Quality Focus",
      description: "Quality over quantity in everything we do—from partnerships to projects to people."
    },
    {
      icon: Globe,
      title: "Social Impact",
      description: "Contributing meaningfully to society through education, innovation, and responsible business practices."
    }
  ];

  const stats = [
    { number: "2024", label: "Founded" },
    { number: "1", label: "Active Subsidiary" },
    { number: "100%", label: "Commitment to Excellence" },
    { number: "∞", label: "Growth Potential" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About SSENN
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              A holding corporation built on the principles of excellence, authenticity, 
              and meaningful impact in education and digital innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                To build and nurture a portfolio of exceptional companies that drive innovation in 
                education and digital transformation, while maintaining the highest standards of 
                excellence and contributing meaningfully to society.
              </p>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">Our Vision</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To become a leading holding corporation that sets the standard for ethical business 
                practices, authentic relationships, and sustainable growth in the education and 
                technology sectors.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center shadow-card">
                  <CardContent className="pt-8 pb-6">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision we make and every relationship we build.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Approach
              </h2>
              <p className="text-lg text-muted-foreground">
                Quality over quantity. Strategy over scale. Results over vanity metrics.
              </p>
            </div>

            <div className="space-y-12">
              <Card className="shadow-elegant">
                <CardContent className="p-8 md:p-12">
                  <h3 className="text-2xl font-bold mb-6">Strategic Portfolio Management</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    We don't just acquire companies—we carefully select and nurture businesses that 
                    align with our values and have the potential for significant positive impact. 
                    Each subsidiary receives the support, resources, and strategic guidance needed 
                    to achieve excellence in their respective fields.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our selective approach means we work only with companies and partners who 
                    understand the bigger picture—that their influence carries responsibility and 
                    potential for positive societal impact. We prioritize partnerships that promote 
                    beneficial knowledge, educational content, and services that genuinely serve humanity.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-elegant">
                <CardContent className="p-8 md:p-12">
                  <h3 className="text-2xl font-bold mb-6">Long-term Excellence</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    In an industry often driven by inflated metrics and fleeting trends, we focus 
                    on what stands the test of time: real engagement, genuine audiences, measurable 
                    results, and meaningful impact that extends beyond commerce. When you work with 
                    SSENN and our subsidiaries, you're not just getting access to our growing 
                    network—you're getting a partner invested in excellence and your long-term 
                    success in creating influence that matters.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;