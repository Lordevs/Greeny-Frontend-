import HeroSection from "@/components/common/hero-section";
import TeamsFeaturesSection from "@/components/landing/teams/features-section";
import TeamsProductivitySection from "@/components/landing/teams/productivity-section";
import TeamsTypesSection from "@/components/landing/teams/types-section";
import CTASection from "@/components/common/cta-section";

export default function Teams() {
  return (
    <main className="min-h-screen">
      <HeroSection
        heading={
          <>
            Unlock Collaborative Date
            <br />
            Analysis
          </>
        }
        paragraph="Go from analysis to insights faster with an AI data analyst that allows
        your team to work together in one place."
        buttonText="Start a Team"
      />
      <TeamsFeaturesSection />
      <TeamsProductivitySection />
      <TeamsTypesSection />
      <CTASection
        title="Ready to Get Started?"
        description="Join thousands of teams who are making data-driven decisions every day. No credit card required."
        buttonText="Start Your Free Trial"
      />
    </main>
  );
}
