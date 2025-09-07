import { Link } from "react-router-dom";
import { Building2, Mail, Globe } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About", path: "/about" },
      { name: "Subsidiaries", path: "/subsidiaries" },
      { name: "Shop", path: "/shop" },
      { name: "Contact", path: "/contact" }
    ],
    subsidiaries: [
      { name: "Strategic Influence Ihsaan", path: "/subsidiaries" }
    ],
    legal: [
      { name: "Privacy Policy", path: "#" },
      { name: "Terms of Service", path: "#" },
      { name: "Cookie Policy", path: "#" }
    ]
  };

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Building2 className="w-8 h-8 text-accent" />
              <div>
                <div className="text-2xl font-bold">SSENN</div>
                <div className="text-sm text-background/70">Education Holdings</div>
              </div>
            </div>
            <p className="text-background/80 leading-relaxed mb-6">
              Building the future through strategic educational initiatives and 
              innovative digital solutions.
            </p>
            <div className="flex items-center space-x-2 text-sm text-background/70">
              <Globe className="w-4 h-4" />
              <span>Global Operations</span>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-background/80 hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subsidiaries */}
          <div>
            <h3 className="font-semibold mb-6">Our Portfolio</h3>
            <ul className="space-y-3">
              {footerLinks.subsidiaries.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-background/80 hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-6">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-background/80">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm">hello@ssenn.education</span>
              </div>
              <p className="text-sm text-background/70">
                Ready to start your next campaign or explore partnership opportunities?
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-background/70 mb-4 md:mb-0">
              © {currentYear} SSENN Education Holdings. All rights reserved.
            </div>
            <div className="flex space-x-6">
              {footerLinks.legal.map((link, index) => (
                <Link 
                  key={index}
                  to={link.path} 
                  className="text-sm text-background/70 hover:text-accent transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;