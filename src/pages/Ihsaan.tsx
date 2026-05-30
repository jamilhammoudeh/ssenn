import { Button } from "@/components/ui/button";
import {
  SealCheck,
  Briefcase,
  ChartLineUp,
  ShieldCheck,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const Ihsaan = () => {
  const features = [
    {
      icon: SealCheck,
      title: "Pre-vetted network",
      description:
        "Every creator in our network demonstrates authentic engagement, ethical content, and a genuine connection with their audience. We do the research so you don't have to.",
    },
    {
      icon: Briefcase,
      title: "Full campaign management",
      description:
        "From initial outreach to final deliverables, we handle every detail. You focus on your business, we handle the influence.",
    },
    {
      icon: ChartLineUp,
      title: "Performance-based pricing",
      description:
        "We only succeed when you do. Our commission-based model keeps us invested in real results, not just connections.",
    },
    {
      icon: ShieldCheck,
      title: "Risk-free partnerships",
      description:
        "No upfront fees, no long-term contracts. Pay only for successful campaign deliveries and proven performance.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Discovery call",
      description:
        "We learn about your brand, goals, and audience to identify the right creator matches.",
    },
    {
      number: "02",
      title: "Strategic matching",
      description:
        "We present pre-vetted creator options with proven track records in your niche.",
    },
    {
      number: "03",
      title: "Campaign launch",
      description:
        "We handle negotiations, contracts, and management from start to finish.",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-24 sm:px-6 md:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-primary-foreground/25 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground/80">
              SSENN Subsidiary
            </span>
            <h1 className="mt-7 text-balance text-primary-foreground">
              Connect. Create. Convert.
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
              We bridge the gap between premium brands and top-tier creators,
              delivering authentic partnerships that drive real results. No
              guesswork. No wasted budgets. Just strategic influence that works,
              guided by ihsaan.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">For brands</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/contact">For creators</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="container mx-auto px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">Why strategic influence</span>
          <h2 className="mt-5 text-balance">
            We don't just connect brands and creators.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            We architect authentic relationships, rooted in excellence and real
            impact, that deliver measurable results for both sides.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border bg-secondary/40">
        <div className="container mx-auto px-4 py-20 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title} className="bg-card p-8 md:p-10">
                <feature.icon
                  className="h-8 w-8 text-primary"
                  weight="light"
                />
                <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">The process</span>
          <h2 className="mt-5">How it works</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Three simple steps to launch your next successful campaign.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-10 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="border-t-2 border-primary pt-6">
              <div className="font-display text-4xl font-semibold text-primary">
                {step.number}
              </div>
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-24 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-primary px-6 py-16 text-center text-primary-foreground md:px-12">
          <h2 className="mx-auto max-w-2xl text-balance text-primary-foreground">
            Ready to build authentic relationships?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
            Let's discuss how Strategic Influence Ihsaan can connect your brand
            with the right creators for meaningful, results-driven campaigns.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">Contact our team</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="group text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link to="/subsidiaries">
                Back to portfolio
                <ArrowUpRight
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  weight="bold"
                />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ihsaan;
