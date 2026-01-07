import HeroSection from "@/components/common/hero-section";

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
    </main>
  );
}
