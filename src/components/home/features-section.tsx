import { Zap, Database, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Data Querying",
    description:
      "Ask questions in natural language and get answers instantly. No SQL or coding required.",
  },
  {
    icon: Database,
    title: "Unified Data Hub",
    description:
      "Connect all your data sources in one place for seamless analysis and collaboration.",
  },
  {
    icon: BarChart3,
    title: "Dynamic Visualizations",
    description:
      "Create beautiful charts and graphs that update in real-time with your data.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Powerful, Yet Simple to Use
        </h2>
        <p className="text-muted-foreground mb-12 max-w-xl mx-auto">
          Everything you need to analyze data with the power of AI-driven
          solutions
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card-elevated p-6 text-left">
              <div className="icon-circle mb-4">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
