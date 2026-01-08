import { Clock, Bell, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function WorkflowSection() {
  return (
    <section className="bg-secondary px-4 py-16 md:px-6 md:py-24">
      <div className="container mx-auto text-center max-w-7xl">
        <h2 className="mb-6 text-3xl font-bold text-primary-foreground md:text-5xl lg:text-6xl leading-tight">
          Build, Share, and Automate <br className="hidden md:block" /> Your
          Workflow
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-lg text-primary-foreground/90 md:text-xl">
          A powerful and easy-to-use AI workspace built for collaboration and
          detailed analysis.
        </p>

        <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-primary-foreground p-5 shadow-2xl md:p-12 lg:p-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            {/* Left Column: Content */}
            <div className="flex flex-col text-left space-y-8 md:space-y-10">
              <div>
                <h3 className="mb-4 text-2xl md:text-4xl font-extrabold text-destructive">
                  Flexible Building Blocks
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-destructive/70">
                  Add, remove, or edit analysis steps as you work, giving you
                  full control over the data narrative. Tailor every report to
                  your audience.
                </p>
              </div>

              <div className="space-y-6 md:space-y-8">
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-xl bg-destructive text-[#FFAB5E] shadow-lg shadow-destructive/20 transition-transform hover:scale-105">
                    <Clock className="h-6 w-6 md:h-7 md:w-7" />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-destructive">
                      Scheduled Data Sync
                    </h4>
                    <p className="text-sm md:text-base text-destructive/70 mt-1">
                      Automate data refreshes to keep your insights current
                      effortlessly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 md:gap-6">
                  <div className="flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-xl bg-orange-600 text-[#FFAB5E] shadow-lg shadow-orange-600/20 transition-transform hover:scale-105">
                    <Bell className="h-6 w-6 md:h-7 md:w-7" />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-orange-600">
                      Smart Alerts
                    </h4>
                    <p className="text-sm md:text-base text-orange-600/70 mt-1">
                      Get real-time notifications when key metrics cross your
                      defined threshold.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <Link
                  href="#"
                  className="group inline-flex items-center gap-2 text-lg md:text-xl font-bold text-orange-600 transition-all hover:gap-4">
                  Start Building Now
                  <ArrowRight className="h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="relative aspect-square md:aspect-video lg:aspect-square overflow-hidden rounded-2xl bg-secondary p-4 md:p-8 animate-in fade-in zoom-in duration-700">
              <div className="relative h-full w-full">
                <Image
                  src="/images/workflows.svg"
                  alt="Workflow Visualization"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
