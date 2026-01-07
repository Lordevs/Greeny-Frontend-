import { Button } from "@/components/ui/button";
import Image from "next/image";

const integrations = [
  { icon: "/logos/drive.svg", name: "Google Drive" },
  { icon: "/logos/dropbox.svg", name: "Dropbox" },
  { icon: "/logos/salesforce.svg", name: "Salesforce" },
  { icon: "/logos/gitlab.svg", name: "Gitlab" },
  { icon: "/logos/sheets.svg", name: "Google Sheets" },
  { icon: "/logos/github.svg", name: "Github" },
  { icon: "/logos/aws.svg", name: "AWS" },
];

export default function IntegrationsSection() {
  return (
    <section className="px-6 py-15">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
          Integrate with Your Favorite Tools
        </h2>
        <p className="text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto">
          Connect seamlessly with the platforms you already use.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 mb-7">
          {integrations.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
              <Image
                src={item.icon}
                alt={item.name}
                width={50}
                height={50}
                className="brightness-0 invert opacity-90 hover:opacity-100"
              />
            </div>
          ))}
        </div>

        <Button
          variant="destructive"
          size="lg"
          className="hover:bg-primary/90 text-primary-foreground rounded-full px-12 w-60 h-12 text-lg font-bold shadow-lg">
          Explore Integrations
        </Button>
      </div>
    </section>
  );
}
