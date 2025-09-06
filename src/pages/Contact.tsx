import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, ArrowRight, Building2, Users } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", company: "", subject: "", message: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "hello@ssenn.education",
      description: "Send us an email anytime - we typically respond within 24 hours"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (555) 123-4567",
      description: "Call us during business hours (9 AM - 6 PM EST)"
    },
    {
      icon: MapPin,
      title: "Headquarters", 
      details: "Global Operations",
      description: "Serving clients and partners worldwide"
    },
    {
      icon: Clock,
      title: "Response Time",
      details: "< 24 Hours",
      description: "Fast, professional responses to all inquiries"
    }
  ];

  const inquiryTypes = [
    { value: "brand", label: "Brand/Marketing Team" },
    { value: "creator", label: "Content Creator/Influencer" },
    { value: "agency", label: "Agency Partner" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header */}
      <section className="bg-gradient-hero text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-primary-light/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-white/95 leading-relaxed">
              Let's discuss how SSENN can elevate your next campaign or explore 
              partnership opportunities, striving for ihsaan in every collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Enhanced Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-elegant hover:shadow-glow transition-all duration-500 border-primary/10">
                <CardContent className="p-10 md:p-14">
                  <div className="mb-10">
                    <h2 className="text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                      Send us a Message
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Ready to start your next campaign or explore partnership opportunities? 
                      We typically respond within 24 hours with detailed, personalized responses.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-base font-medium">Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                          className="h-12 text-base"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-base font-medium">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                          className="h-12 text-base"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label htmlFor="company" className="text-base font-medium">Company/Organization</Label>
                        <Input
                          id="company"
                          type="text"
                          placeholder="Company name"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          className="h-12 text-base"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="subject" className="text-base font-medium">I am a...</Label>
                        <Select onValueChange={(value) => handleInputChange("subject", value)}>
                          <SelectTrigger className="h-12 text-base">
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            {inquiryTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="message" className="text-base font-medium">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your goals, audience size, or campaign objectives..."
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        rows={8}
                        required
                        className="text-base resize-none"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full shadow-button hover:shadow-glow transition-all duration-500 text-lg py-6"
                    >
                      Send Message
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Contact Information */}
            <div className="space-y-10">
              <div>
                <h3 className="text-3xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
                  Let's Connect
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                  Ready to start your next campaign or explore partnership opportunities? 
                  We pride ourselves on providing thoughtful, detailed responses to every inquiry.
                </p>
              </div>

              {contactInfo.map((info, index) => (
                <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-500 border-primary/10 hover:border-primary/20">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center flex-shrink-0 shadow-button">
                        <info.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">{info.title}</h4>
                        <p className="text-foreground text-lg mb-2 font-medium">{info.details}</p>
                        <p className="text-muted-foreground leading-relaxed">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Call-to-Action Sections */}
      <section className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* For Brands */}
            <Card className="shadow-elegant hover:shadow-glow transition-all duration-500 border-primary/10">
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-button">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-6">For Brands</h3>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  Get matched with pre-vetted influencers in your target market. 
                  First consultation is complimentary with detailed strategy recommendations.
                </p>
                <Button variant="default" className="shadow-button hover:shadow-glow text-lg px-8 py-4">
                  Start Your Campaign
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>

            {/* For Influencers */}
            <Card className="shadow-elegant hover:shadow-glow transition-all duration-500 border-primary/10">
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 bg-gradient-accent rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-button">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-6">For Influencers</h3>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  If you create quality content consistently that's beneficial to 
                  humanity and maintain authentic engagement with your audience, 
                  we'd love to explore partnership opportunities with premium brands.
                </p>
                <Button variant="outline" className="text-lg px-8 py-4 hover:bg-primary/5">
                  Join Our Network
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;