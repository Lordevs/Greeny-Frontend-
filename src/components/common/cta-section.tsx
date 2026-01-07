import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-lg md:text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join thousands of users and start making data-driven decisions today.
          No credit card required.
        </p>
        <Button
          variant="destructive"
          size="lg"
          className="hover:bg-primary/90 text-primary-foreground
          rounded-full px-10 py-6 text-lg font-bold shadow-2xl transition-all hover:scale-105">
          Start Your Free Trial
        </Button>
      </div>
    </section>
  );
}
