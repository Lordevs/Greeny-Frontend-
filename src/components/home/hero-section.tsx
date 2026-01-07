import { Button } from "@/components/ui/button";
import Image from "next/image";

const integrations = [
  { icon: "/logos/google.svg", name: "Google" },
  { icon: "/logos/microsoft.svg", name: "Microsoft" },
  { icon: "/logos/slack.svg", name: "Slack" },
  { icon: "/logos/spotify.svg", name: "Spotify" },
  { icon: "/logos/adonis.svg", name: "Adonis" },
];

export default function HeroSection() {
  return (
    <section>
      <div className="max-w-4xl mx-auto text-center px-6 py-16">
        <h1 className="text-4xl md:text-7xl font-bold mb-4 animate-fade-in text-primary-foreground leading-[1.4]">
          Zero code data
          <br />
          analysis
        </h1>
        <p
          className="text-xl text-primary-foreground/80 my-10 max-w-lg  mx-auto animate-fade-in "
          style={{ animationDelay: "0.1s" }}>
          Harness the power of AI to transform raw data into actionable
          intelligence seamlessly.
        </p>
        <Button
          variant="destructive"
          size="lg"
          className="animate-fade-in rounded-full w-60 h-12 text-lg"
          style={{ animationDelay: "0.2s" }}>
          Get Started Free
        </Button>

        {/* Integration Icons */}
        <div
          className="flex justify-center gap-4 mt-7 animate-fade-in"
          style={{ animationDelay: "0.3s" }}>
          {integrations.map((item, index) => (
            <div
              key={index}
              className="w-20 h-15 rounded-full flex items-center justify-center text-lg backdrop-blur-sm">
              <Image src={item.icon} alt={item.name} width={34} height={34} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
