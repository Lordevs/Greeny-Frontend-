import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, PlusCircle } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="bg-secondary px-7 py-15">
      <div className="mx-auto max-w-7xl text-center text-primary-foreground">
        <h2 className="mb-4 text-4xl font-bold md:text-5xl text-white">
          Powerful, Yet Simple to Use
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-lg opacity-90 text-white">
          Everything you need to analyze data and collaborate effectively.
        </p>

        <div className="grid gap-10 md:grid-cols-3">
          {/* Card 1: Instant Data Querying */}
          <Card className="overflow-hidden border-none h-[380px] py-0 gap-0 bg-primary-foreground text-left shadow-xl transition-all hover:shadow-2xl">
            <CardHeader className="">
              <div className="mt-10 flex w-14 items-center justify-center rounded-xl">
                <Image
                  src="/logos/home/flash.svg"
                  alt="Flash"
                  width={32}
                  height={32}
                />
              </div>
              <CardTitle className="text-2xl font-bold text-destructive">
                Instant Data Querying
              </CardTitle>
              <CardDescription className="text-lg leading-relaxed text-destructive/80">
                Get answers from complex datasets in seconds, not hours. No
                complex setup required.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-2 px-5 py-0">
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src="/images/line-chart.png"
                  alt="Instant Data Query Chart"
                  width={500}
                  height={500}
                  className="object-cover object-top"
                />
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Unified Data Hub */}
          <Card className="overflow-hidden gap-0 py-0 h-[380px] border-none bg-primary-foreground text-left shadow-xl transition-all hover:shadow-2xl">
            <CardHeader className="pb-2">
              <div className="mt-10 flex w-14 items-center justify-center rounded-xl">
                <Image
                  src="/logos/home/cloud.svg"
                  alt="Cloud"
                  width={32}
                  height={32}
                />
              </div>
              <CardTitle className="text-2xl font-bold text-destructive">
                Unified Data Hub
              </CardTitle>
              <CardDescription className="text-lg leading-relaxed text-destructive/80">
                Connect and manage all your data sources in one place. No more
                switching between tools.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-6 px-5 pt-0">
              <div className="space-y-3 rounded-2xl bg-secondary p-5 shadow-inner">
                <div className="flex items-center gap-3 text-sm font-semibold text-white">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-secondary">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  Google Sheet Connected
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-white">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-secondary">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  MySQL Database Synced
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-white/80">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-secondary">
                    <PlusCircle className="h-5 w-5" />
                  </div>
                  Connect new source
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Dynamic Visualizations */}
          <Card className="overflow-hidden border-none gap-0 py-0 h-[380px] bg-primary-foreground text-left shadow-xl transition-all hover:shadow-2xl">
            <CardHeader className="pb-2">
              <div className="mt-10 flex w-14 items-center justify-center rounded-xl">
                <Image
                  src="/logos/home/pie-chart.svg"
                  alt="Pie Chart"
                  width={32}
                  height={32}
                />
              </div>
              <CardTitle className="text-2xl font-bold text-orange-600">
                Dynamic Visualizations
              </CardTitle>
              <CardDescription className="text-lg leading-relaxed text-orange-600/80">
                Turn raw numbers into beautiful, easy-to-understand charts and
                dashboards automatically.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-2 px-2">
              <div className="flex h-40 items-end justify-between gap-1.5 rounded-xl bg-orange-50/30 p-4">
                {[
                  { h: 80, v: "2.81" },
                  { h: 100, v: "3.38" },
                  { h: 120, v: "4.38" },
                  { h: 80, v: "2.81" },
                  { h: 100, v: "3.38" },
                  { h: 120, v: "4.38" },
                  { h: 80, v: "2.81" },
                  { h: 100, v: "3.38" },
                  { h: 120, v: "4.38" },
                  { h: 80, v: "2.81" },
                  { h: 100, v: "3.38" },
                  { h: 120, v: "4.38" },
                  { h: 80, v: "2.81" },
                  { h: 100, v: "3.38" },
                  { h: 120, v: "4.38" },
                ].map((bar, i) => (
                  <div
                    key={i}
                    className="group relative flex w-full flex-col items-center gap-1"
                    style={{ height: `${bar.h}%` }}>
                    <div
                      className="w-full transition-all group-hover:brightness-110"
                      style={{
                        height: "100%",
                        backgroundColor:
                          i % 3 === 0
                            ? "#FF7C1F"
                            : i % 3 === 1
                            ? "#C86001"
                            : "#FF993B",
                      }}
                    />
                    <span className="absolute top-3 left-1/2 -translate-x-1/2 scale-75 text-md font-bold text-destructive group-hover:scale-100 i rotate-90 origin-center truncate">
                      {bar.v}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
