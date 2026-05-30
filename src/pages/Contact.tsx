import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageHeader from "@/components/PageHeader";
import { Envelope, Phone, MapPin, Clock } from "@phosphor-icons/react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description:
        "Thank you for reaching out. We'll get back to you within one business day.",
    });
    setFormData({ name: "", email: "", company: "", subject: "", message: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Envelope,
      title: "Email",
      details: "hello@ssenn.education",
      description: "Send us an email any time, and we typically reply within a day.",
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (555) 123-4567",
      description: "Call during business hours, 9am – 6pm EST.",
    },
    {
      icon: MapPin,
      title: "Headquarters",
      details: "Global operations",
      description: "Serving clients and partners worldwide.",
    },
    {
      icon: Clock,
      title: "Response time",
      details: "Under 24 hours",
      description: "Fast, considered responses to every enquiry.",
    },
  ];

  const inquiryTypes = [
    { value: "brand", label: "Brand / marketing team" },
    { value: "creator", label: "Content creator / influencer" },
    { value: "agency", label: "Agency partner" },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Let's discuss how SSENN can elevate your next campaign or explore a partnership, with ihsaan in every collaboration."
      />

      <section className="container mx-auto px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Contact details */}
          <div>
            <h2 className="text-2xl font-semibold">Talk to us</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Whether you're a brand looking for the right creators, a creator
              looking for the right brands, or a potential partner, we'd love
              to hear from you.
            </p>

            <div className="mt-10 space-y-8">
              {contactInfo.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <item.icon
                    className="mt-0.5 h-6 w-6 flex-shrink-0 text-primary"
                    weight="light"
                  />
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-foreground">{item.details}</div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <Card className="shadow-card">
            <CardContent className="p-8 md:p-10">
              <h2 className="text-2xl font-semibold">Send us a message</h2>
              <p className="mt-2 text-muted-foreground">
                We typically respond within one business day with a detailed,
                personal reply.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company / channel</Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Company name"
                      value={formData.company}
                      onChange={(e) =>
                        handleInputChange("company", e.target.value)
                      }
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">I am a…</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) =>
                        handleInputChange("subject", value)
                      }
                    >
                      <SelectTrigger id="subject" className="h-11">
                        <SelectValue placeholder="Select one" />
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

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your goals, audience, or campaign objectives…"
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    rows={7}
                    required
                    className="resize-none"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Send message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* For brands / creators */}
      <section className="border-t border-border bg-secondary/40">
        <div className="container mx-auto px-4 py-20 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
            <div className="bg-card p-8 md:p-10">
              <span className="eyebrow">For brands</span>
              <h3 className="mt-4 text-2xl font-semibold">
                Find your audience
              </h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Get matched with pre-vetted creators in your target market. Your
                first consultation is complimentary, with detailed strategy
                recommendations.
              </p>
              <Button className="mt-6">Start your campaign</Button>
            </div>
            <div className="bg-card p-8 md:p-10">
              <span className="eyebrow">For creators</span>
              <h3 className="mt-4 text-2xl font-semibold">Join the network</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                If you create quality, beneficial content and maintain authentic
                engagement with your audience, we'd love to explore partnerships
                with premium brands.
              </p>
              <Button variant="outline" className="mt-6">
                Apply to join
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
