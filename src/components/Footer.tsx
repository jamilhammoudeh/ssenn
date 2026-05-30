import { Link } from "react-router-dom";
import { Envelope } from "@phosphor-icons/react";

const Footer = () => {
  const footerLinks = {
    company: [
      { name: "About", path: "/about" },
      { name: "Initiatives", path: "/subsidiaries" },
      { name: "Shop", path: "/shop" },
      { name: "Contact", path: "/contact" },
    ],
    legal: [
      { name: "Privacy Policy", path: "#" },
      { name: "Terms of Service", path: "#" },
      { name: "Cookie Policy", path: "#" },
    ],
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:pr-8">
            <div className="font-display text-2xl font-semibold">SSENN</div>
            <div className="mt-1 text-xs uppercase tracking-[0.22em] text-background/60">
              Education Holdings
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-background/70">
              Transforming how millions of adults live and learn worldwide
              through evidence-based educational ventures.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-background/50">
              Company
            </h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-background/80 transition-colors hover:text-background"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Mission */}
          <div>
            <h3 className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-background/50">
              Our Mission
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-background/70">
              We develop and acquire educational ventures grounded in
              evidence-based excellence, practical life integration, and
              collaborative transformation.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-background/50">
              Get in touch
            </h3>
            <a
              href="mailto:hello@ssenn.education"
              className="mt-5 flex items-center gap-2 text-sm text-background/80 transition-colors hover:text-background"
            >
              <Envelope className="h-4 w-4 flex-shrink-0" weight="light" />
              hello@ssenn.education
            </a>
            <p className="mt-3 text-sm leading-relaxed text-background/60">
              Ready to explore our initiatives or discuss partnership
              opportunities?
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-background/15 pt-8 md:flex-row">
          <div className="text-sm text-background/55">
            © 2026 SSENN Education Holdings. All rights reserved.
          </div>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm text-background/55 transition-colors hover:text-background"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
