import { Button } from "@/components/ui/button";

const integrations = [
  { icon: "G", name: "Google" },
  { icon: "📊", name: "Sheets" },
  { icon: "🔷", name: "Notion" },
  { icon: "📁", name: "Drive" },
  { icon: "☁️", name: "AWS" },
];

export default function IntegrationsSection() {
  return (
    <section className="section-orange py-16 px-6">
      <div className="max-w-5xl mx-auto text-center text-primary-foreground">
        <h2 className="text-3xl font-bold mb-3">
          Integrate with Your Favorite Tools
        </h2>
        <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
          Connect seamlessly with the tools you already use
        </p>

        <div className="flex justify-center gap-6 mb-8">
          {integrations.map((item, index) => (
            <div
              key={index}
              className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center text-xl backdrop-blur-sm">
              {item.icon}
            </div>
          ))}
        </div>

        <Button variant="default" size="default">
          Explore Integrations
        </Button>
      </div>
    </section>
  );
}
