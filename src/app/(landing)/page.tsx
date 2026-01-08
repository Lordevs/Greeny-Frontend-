import HeroSection from "@/components/common/hero-section";
import FeaturesSection from "@/components/landing/home/features-section";
import IntegrationsSection from "@/components/landing/home/integrations-section";
import WorkflowSection from "@/components/landing/home/workflow-section";
import SecuritySection from "@/components/landing/home/security-section";
import TemplatesSection from "@/components/landing/home/templates-section";
import CTASection from "@/components/common/cta-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection
        heading={
          <>
            Zero Code Data
            <br />
            Analysis
          </>
        }
        paragraph="Harness the power of AI to transform raw data into actionable intelligence seamlessly."
        buttonText="Get Started Free"
      />
      <FeaturesSection />
      <IntegrationsSection />
      <WorkflowSection />
      <SecuritySection />
      <TemplatesSection />
      <CTASection
        title="Ready to Get Started?"
        description="Join thousands of users and start making data-driven decisions today. No credit card required."
        buttonText="Start Your Free Trial"
      />
    </main>
  );
}
