import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/PageHeader";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  MagnifyingGlass,
  Target,
  UsersThree,
  ChartBar,
} from "@phosphor-icons/react";

const Subsidiaries = () => {
  const subsidiaries = [
    {
      name: "Strategic Influence Ihsaan",
      tagline: "Authentic digital relationships",
      description:
        "More than an influencer marketing agency, we are architects of authentic digital relationships that translate into genuine bonds. Grounded in the pursuit of ihsaan, our mission is simple: connect the right brands with the right creators to build campaigns that feel natural, drive results, and contribute meaningfully through shared benefit and mutual growth.",
      established: "2024",
      focus: ["Influencer marketing", "Digital strategy", "Brand partnerships"],
      services: [
        {
          icon: MagnifyingGlass,
          title: "Selective curation",
          description:
            "We work only with creators who maintain authentic engagement, consistent quality, and ethical values.",
        },
        {
          icon: Target,
          title: "Strategic matching",
          description:
            "We look beyond follower count, analysing audience, engagement, and content alignment for the right fit.",
        },
        {
          icon: UsersThree,
          title: "Campaign management",
          description:
            "From initial outreach to final deliverables, we handle every detail so you can focus on your business.",
        },
        {
          icon: ChartBar,
          title: "Performance tracking",
          description:
            "Clear reporting on performance, engagement, and ROI so every investment delivers measurable results.",
        },
      ],
      status: "Active",
    },
  ];

  const futureOpportunities = [
    "Educational technology platforms",
    "Digital learning solutions",
    "Content creation studios",
    "Data analytics services",
  ];

  return (
    <div>
      <PageHeader
        eyebrow="The portfolio"
        title="Our portfolio companies"
        description="The companies that make up the SSENN ecosystem, each working at the forefront of its field, held to the same standard of excellence."
      />

      {/* Active subsidiaries */}
      <section className="container mx-auto px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <span className="eyebrow">Active</span>
          <h2 className="mt-5">Companies we own today</h2>
        </div>

        {subsidiaries.map((subsidiary) => (
          <article
            key={subsidiary.name}
            className="rounded-lg border border-border bg-card p-8 shadow-card md:p-12"
          >
            {/* Header */}
            <div className="flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-semibold md:text-3xl">
                    {subsidiary.name}
                  </h3>
                  <Badge
                    variant="outline"
                    className="border-primary/30 text-primary"
                  >
                    {subsidiary.status}
                  </Badge>
                </div>
                <p className="mt-2 text-lg italic text-muted-foreground">
                  {subsidiary.tagline}
                </p>
              </div>
              <div className="md:text-right">
                <div className="text-sm text-muted-foreground">Established</div>
                <div className="font-display text-3xl font-semibold text-primary">
                  {subsidiary.established}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-foreground">
              {subsidiary.description}
            </p>

            {/* Focus areas */}
            <div className="mt-8">
              <div className="eyebrow">Focus areas</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {subsidiary.focus.map((area) => (
                  <Badge key={area} variant="secondary" className="font-normal">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="mt-10">
              <div className="eyebrow">Core services</div>
              <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {subsidiary.services.map((service) => (
                  <div key={service.title} className="flex gap-4">
                    <service.icon
                      className="mt-0.5 h-6 w-6 flex-shrink-0 text-primary"
                      weight="light"
                    />
                    <div>
                      <h4 className="font-semibold">{service.title}</h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row">
              <Button asChild className="group">
                <Link to="/ihsaan">
                  Learn more
                  <ArrowUpRight
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    weight="bold"
                  />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">Contact the team</Link>
              </Button>
            </div>
          </article>
        ))}
      </section>

      {/* Future opportunities */}
      <section className="border-t border-border bg-secondary/40">
        <div className="container mx-auto px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <div className="max-w-2xl">
            <span className="eyebrow">Looking ahead</span>
            <h2 className="mt-5">Future expansion</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              We're always exploring new opportunities to grow the portfolio
              with companies that align with our mission and values.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            {futureOpportunities.map((opportunity) => (
              <div
                key={opportunity}
                className="flex items-center gap-3 bg-card px-6 py-5"
              >
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <span className="font-medium">{opportunity}</span>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Button asChild variant="outline" className="group">
              <Link to="/contact">
                Partnership opportunities
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

export default Subsidiaries;
