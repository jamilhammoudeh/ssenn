import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  SealCheck,
  Plant,
  ShareNetwork,
  GlobeHemisphereWest,
  UsersThree,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";

// Home hero — Revision 1 layout (no-op edit to trigger a deploy)
const Hero = () => {
  const valueProps = [
    {
      icon: SealCheck,
      title: "Evidence-Based Excellence",
      description:
        "Proven practices over passing trends. Quality teaching that stands the test of time",
    },
    {
      icon: Plant,
      title: "Life Integration Focus",
      description:
        "Learning that becomes lifestyle. Practical education woven into everyday living",
    },
    {
      icon: ShareNetwork,
      title: "Collaborative Transformation",
      description:
        "Individual growth strengthens community impact. Shared success through connection",
    },
  ];

  const proofPoints = [
    { icon: GlobeHemisphereWest, label: "73 countries served" },
    { icon: SealCheck, label: "Evidence-based methods" },
    { icon: UsersThree, label: "Adult-learner focused" },
  ];

  return (
    <section className="relative isolate overflow-hidden border-b border-border/70">
      {/* Decorative background: layered gradient glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-44 top-[-20%] h-[34rem] w-[34rem] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute right-[-12%] top-1/3 h-[30rem] w-[30rem] rounded-full bg-accent/15 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pb-20 pt-12 sm:px-6 md:pb-28 md:pt-16 lg:px-8 lg:pb-32 lg:pt-20">
        <div className="grid items-start gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Content */}
          <div>
            <h1 className="text-balance text-[2.6rem] font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-[4rem]">
              Building Educational Ventures That{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Transform How Adults Live and Learn
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
              We develop evidence-based education ventures where learning
              becomes lifestyle. Currently serving adult learners across 73
              countries.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" variant="gradient" className="group">
                <Link to="/subsidiaries">
                  Explore Our Initiatives
                  <ArrowRight
                    className="transition-transform group-hover:translate-x-0.5"
                    weight="bold"
                  />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-card hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
              >
                <Link to="/about">Our Story</Link>
              </Button>
            </div>

            {/* Proof points */}
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-border/70 pt-8">
              {proofPoints.map((point) => (
                <div
                  key={point.label}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
                >
                  <point.icon className="h-4 w-4 text-primary" weight="bold" />
                  {point.label}
                </div>
              ))}
            </div>
          </div>

          {/* Three value propositions — connected timeline */}
          <div className="lg:pl-6">
            <div className="relative">
              {/* connecting gradient line */}
              <div className="absolute bottom-7 left-7 top-7 w-px -translate-x-1/2 bg-gradient-to-b from-primary via-accent to-transparent" />
              <div className="space-y-9">
                {valueProps.map((prop) => (
                  <div
                    key={prop.title}
                    className="group relative flex items-start gap-5"
                  >
                    <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-primary text-white shadow-button ring-4 ring-background transition-transform duration-300 group-hover:scale-110">
                      <prop.icon className="h-7 w-7" weight="duotone" />
                    </div>
                    <div className="pt-1.5">
                      <h3 className="text-base font-semibold transition-colors group-hover:text-primary">
                        {prop.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {prop.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
