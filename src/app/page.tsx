import HeroSection from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features-section";
import IntegrationsSection from "@/components/home/integrations-section";
import WorkflowSection from "@/components/home/workflow-section";
import SecuritySection from "@/components/home/security-section";
import TemplatesSection from "@/components/home/templates-section";
import CTASection from "@/components/home/cta-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <IntegrationsSection />
      {/* <WorkflowSection /> */}
      {/* <SecuritySection /> */}
      {/* <TemplatesSection /> */}
      {/* <CTASection /> */}
    </main>
  );
}
