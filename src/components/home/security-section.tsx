import Image from "next/image";

const securityItems = [
  { icon: "/logos/shield.svg", name: "SOC 2 Type II" },
  { icon: "/logos/lock.svg", name: "GDPR Compliant" },
  { icon: "/logos/award.svg", name: "Top-Rated Security" },
];

export default function SecuritySection() {
  return (
    <section className="px-6 py-15">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
          Your Data's Security is Our Priority
        </h2>
        <p className="text-xl text-primary-foreground/80 mb-16 mx-auto">
          Grees is compliant with industry-leading standards to ensure your data
          remains safe and secure.
        </p>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-1 justify-items-center">
          {securityItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 border-popover border-2 rounded-full bg-primary-foreground flex items-center justify-center p-6 shadow-xl">
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-lg text-primary-foreground uppercase tracking-tight">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
