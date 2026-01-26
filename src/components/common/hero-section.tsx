import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";


const integrations = [
  { icon: "/logos/common/google.svg", name: "Google" },
  { icon: "/logos/common/microsoft.svg", name: "Microsoft" },
  { icon: "/logos/common/slack.svg", name: "Slack" },
  { icon: "/logos/common/spotify.svg", name: "Spotify" },
  { icon: "/logos/common/adonis.svg", name: "Adonis" },
];

interface HeroSectionProps {
  heading: React.ReactNode;
  paragraph: string;
  buttonText: string;
  showIntegrations?: boolean;
}

export default function HeroSection({
  heading,
  paragraph,
  buttonText,
  showIntegrations = true,
}: HeroSectionProps) {
  return (
    <section className="pt-20">
      <div className="max-w-7xl mx-auto text-center px-6 py-16">
        <h1 className="text-4xl md:text-7xl font-bold mb-4 animate-fade-in text-primary-foreground leading-[1.4]">
          {heading}
        </h1>
        <p
          className="text-xl text-primary-foreground/80 my-10 max-w-lg mx-auto animate-fade-in "
          style={{ animationDelay: "0.1s" }}>
          {paragraph}
        </p>
        <Button
          variant="destructive"
          size="lg"
          asChild
          className="animate-fade-in rounded-full w-60 h-12 text-lg font-bold"
          style={{ animationDelay: "0.2s" }}>
          <Link href={ROUTES.AUTH.SIGNUP}>{buttonText}</Link>
        </Button>


        {/* Integration Icons */}
        {showIntegrations && (
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
        )}
      </div>
    </section>
  );
}
