import HeroSection from "@/components/common/hero-section";
import FeaturesSection from "@/components/home/features-section";
import IntegrationsSection from "@/components/home/integrations-section";
import WorkflowSection from "@/components/home/workflow-section";
import SecuritySection from "@/components/home/security-section";
import TemplatesSection from "@/components/home/templates-section";
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
      <CTASection />
    </main>
  );
}
