import PageHeader from "@/components/PageHeader";
import {
  Target,
  Eye,
  Heart,
  UsersThree,
  Medal,
  GlobeHemisphereWest,
} from "@phosphor-icons/react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassionate leadership",
      description: "We lead with patience and respect.",
    },
    {
      icon: UsersThree,
      title: "Truthful & trustworthy",
      description: "We communicate honestly. Our word stands.",
    },
    {
      icon: Target,
      title: "Sincerity",
      description: "Every initiative serves beyond profit.",
    },
    {
      icon: Medal,
      title: "Excellence",
      description: "We reject mediocrity.",
    },
    {
      icon: GlobeHemisphereWest,
      title: "Interdependent impact",
      description: "Individual growth strengthens collective impact.",
    },
  ];

  const stats = [
    { number: "6", label: "Active initiatives" },
    { number: "1,276+", label: "Adult learners served" },
    { number: "73", label: "Countries reached" },
    { number: "2024", label: "Year founded" },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="About SSENN"
        title="A holdings corporation building and acquiring educational ventures for adult learners worldwide."
      />

      {/* Mission & Vision */}
      <section className="container mx-auto px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2">
          <div className="space-y-12">
            <div className="border-t border-border pt-8">
              <div className="flex items-center gap-3">
                <Target className="h-7 w-7 text-primary" weight="light" />
                <span className="eyebrow">Our mission</span>
              </div>
              <p className="mt-5 text-2xl font-display font-medium leading-snug text-foreground">
                To build educational ventures where learning becomes how adults
                live.
              </p>
            </div>
            <div className="border-t border-border pt-8">
              <div className="flex items-center gap-3">
                <Eye className="h-7 w-7 text-primary" weight="light" />
                <span className="eyebrow">Our vision</span>
              </div>
              <p className="mt-5 text-2xl font-display font-medium leading-snug text-foreground">
                We develop and acquire educational initiatives. Each one operates
                independently with strong leadership while maintaining SSENN
                standards: quality teaching, practical life integration, and
                measurable learner outcomes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-lg border border-border bg-border">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card p-8 text-center">
                <div className="font-display text-4xl font-semibold text-primary md:text-5xl">
                  {stat.number}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ventures */}
      <section className="border-y border-border bg-secondary/40">
        <div className="container mx-auto px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Our ventures</span>
            <p className="mt-6 text-2xl font-display font-medium leading-snug text-foreground md:text-3xl">
              Currently operating 6 initiatives across 73 countries, serving
              1,276+ adult learners.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">What we value</span>
          <h2 className="mt-5">Our core values</h2>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="bg-card p-8">
              <value.icon className="h-7 w-7 text-primary" weight="light" />
              <h3 className="mt-6 text-xl font-semibold">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
          {/* Filler cell keeps the hairline grid even (5 values + 1) */}
          <div className="flex items-center bg-card p-8">
            <p className="font-display text-lg italic leading-snug text-muted-foreground">
              And the discipline to live by them, every day.
            </p>
          </div>
        </div>
      </section>

      {/* Why this matters */}
      <section className="border-y border-border bg-secondary/40">
        <div className="container mx-auto px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <span className="eyebrow">Our measure</span>
            <h2 className="mt-5">Why this matters</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              We measure success differently. Not by completion rates or
              certifications, but by how learning actually changes how people
              live.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
