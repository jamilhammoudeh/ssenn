import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Target,
  Medal,
  Handshake,
  GlobeHemisphereWest,
  Books,
  CheckCircle,
} from "@phosphor-icons/react";

const Home = () => {
  const differentiators = [
    {
      icon: Target,
      title: "Mission-Aligned Acquisition",
      description:
        "We acquire ventures committed to evidence-based education serving adult learners.",
    },
    {
      icon: Medal,
      title: "Operational Excellence",
      description:
        "Every venture maintains our standards: quality teaching, practical application, measurable outcomes.",
    },
    {
      icon: Handshake,
      title: "Collaborative Synergy",
      description:
        "Portfolio ventures strengthen each other through shared expertise and resources. Stronger together than alone.",
    },
    {
      icon: GlobeHemisphereWest,
      title: "Global Impact Focus",
      description:
        "Building a portfolio that systematically improves how adults learn and live worldwide.",
    },
  ];

  const specializations = [
    "Evidence-Based Learning Resources",
    "Digital Publishing & Distribution",
    "Curriculum Development",
    "Adult Learner-Focused Materials",
  ];

  return (
    <div>
      <Hero />

      {/* A Holding Corporation Built for Growth */}
      <section className="container mx-auto px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Who we are</span>
          <h2 className="mt-5 text-balance">
            A Holding Corporation{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Built for Growth
            </span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            SSENN develops and acquires educational ventures. Each maintains our
            standards: measurable outcomes, evidence-based methods, practical
            life integration.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-border bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elegant"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-button transition-transform duration-300 group-hover:scale-105">
                <item.icon className="h-6 w-6" weight="duotone" />
              </div>
              <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Initiatives */}
      <section className="relative isolate overflow-hidden border-y border-border bg-secondary/40">
        <div className="pointer-events-none absolute right-[-8%] top-[-25%] -z-10 h-[28rem] w-[28rem] rounded-full bg-primary/5 blur-3xl" />

        <div className="container mx-auto px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">The portfolio</span>
            <h2 className="mt-5 text-balance">Our Initiatives</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Educational initiatives transforming how adults learn and live
              through digital learning, evidence-based materials, and community
              programs.
            </p>
          </div>

          <div className="mt-16 grid items-center gap-14 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-button">
                  <Books className="h-5 w-5" weight="duotone" />
                </div>
                <span className="eyebrow">Featured initiative</span>
              </div>
              <h3 className="mt-5 text-balance text-3xl font-semibold">
                SSENN Publishing Press
              </h3>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Our publishing platform creating learning resources that
                integrate into adult life; from study guides and courses to
                frameworks and digital materials. Every publication meets SSENN
                standards for quality, practical application, and collaborative
                transformation.
              </p>
              <div className="mt-8">
                <Button asChild size="lg" variant="gradient" className="group">
                  <Link to="/subsidiaries">
                    Explore All Initiatives
                    <ArrowRight
                      className="transition-transform group-hover:translate-x-0.5"
                      weight="bold"
                    />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="group rounded-2xl border border-border bg-card p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant md:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="bg-gradient-primary bg-clip-text text-6xl font-bold leading-none tracking-tight text-transparent">
                    2024
                  </div>
                  <div className="mt-3 text-sm text-muted-foreground">
                    Established
                  </div>
                </div>
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  In Development / Launching
                </span>
              </div>

              <div className="mt-8 border-t border-border pt-8">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Specializations
                </div>
                <ul className="mt-5 space-y-3.5">
                  {specializations.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm font-medium text-foreground"
                    >
                      <CheckCircle
                        className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary"
                        weight="fill"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
