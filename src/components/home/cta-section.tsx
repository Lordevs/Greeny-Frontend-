import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="section-orange py-16 px-6">
      <div className="max-w-3xl mx-auto text-center text-primary-foreground">
        <h2 className="text-3xl font-bold mb-3">Ready to Get Started?</h2>
        <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
          Join thousands of teams who are making data-driven decisions every
          day. No credit card required.
        </p>
        <Button variant="default" size="lg">
          Start Your Free Trial
        </Button>
      </div>
    </section>
  );
}
