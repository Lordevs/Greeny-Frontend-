import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";


interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
}

export default function CTASection({
  title,
  description,
  buttonText,
}: CTASectionProps) {
  return (
    <section className="px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
          {title}
        </h2>
        <p className="text-lg md:text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        <Button
          variant="destructive"
          size="lg"
          asChild
          className="hover:bg-primary/90 text-primary-foreground
          rounded-full px-10 py-6 text-lg font-bold shadow-2xl transition-all hover:scale-105">
          <Link href={ROUTES.AUTH.SIGNUP}>{buttonText}</Link>
        </Button>

      </div>
    </section>
  );
}
