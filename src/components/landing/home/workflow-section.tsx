import { Clock, Bell, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function WorkflowSection() {
  return (
    <section className="bg-secondary px-5 py-15">
      <div className="mx-auto px-10 text-center">
        <h2 className="mb-4 text-4xl font-bold text-primary-foreground md:text-5xl">
          Build, Share, and Automate Your Workflow
        </h2>
        <p className="mx-auto mt-6 mb-16 max-w-2xl text-xl text-primary-foreground/90">
          A powerful and easy-to-use AI workspace built for collaboration.
        </p>

        <div className="mx-auto max-w-7xl overflow-hidden rounded-xl bg-primary-foreground p-6 shadow-2xl md:p-12">
          <div className="grid gap-15 md:grid-cols-2">
            {/* Left Column: Content */}
            <div className="flex flex-col text-left">
              <h3 className="mb-4 text-3xl font-bold text-destructive">
                Flexible Building Blocks
              </h3>
              <p className="mb-10 text-lg leading-relaxed text-destructive/70">
                Add, remove, or edit analysis steps as you work, giving you full
                control over the data narrative.
              </p>

              <div className="mb-10 space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-[#FFAB5E] p-2 bg-destructive">
                    <Clock className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-destructive">
                      Scheduled Data Sync
                    </h4>
                    <p className="text-destructive/70">
                      Automate data refreshes to keep your insights current.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-600 p-2 text-[#FFAB5E]">
                    <Bell className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-orange-600">
                      Smart Alerts
                    </h4>
                    <p className="text-orange-600/70">
                      Get notified when key metrics change.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="#"
                className="group flex items-center gap-2 text-xl font-bold text-orange-600 transition-colors hover:text-orange-700">
                Try Now
                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="relative flex aspect-square items-center justify-center rounded-3xl bg-secondary p-8 md:aspect-auto">
              <div className="relative h-full w-full min-h-[300px]">
                <Image
                  src="/images/workflows.svg"
                  alt="Workflow Visualization"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
