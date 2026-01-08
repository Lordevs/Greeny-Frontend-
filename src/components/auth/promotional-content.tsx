import { Separator } from "../ui/separator";

export default function PromotionalContent() {
  return (
    <div className="hidden w-full flex-1 flex-col justify-center px-16 py-20 md:flex relative bg-linear-to-tr from-primary to-secondary overflow-hidden">
      <div className="relative z-10 flex flex-col max-w-lg">
        <div className="space-y-6">
          <h1 className="text-5xl xl:text-6xl font-bold text-primary-foreground leading-[1.1] tracking-tight">
            Step Into
            <br />
            <span className="text-primary-foreground/90">Zero-Code Data</span>
          </h1>
          <p className="text-primary-foreground/70 text-lg xl:text-xl leading-relaxed">
            Connect your data sources, ask questions in plain English, and get
            instant visualizations. Experience the future of intelligence.
          </p>
        </div>

        <div className="mt-16 flex items-center gap-6 xl:gap-8">
          <div className="space-y-1">
            <div className="text-3xl xl:text-4xl font-bold text-primary-foreground">
              10K+
            </div>
            <div className="text-primary-foreground/50 text-xs font-medium uppercase tracking-wider">
              Active Users
            </div>
          </div>
          <Separator orientation="vertical" className="h-12 bg-white/10" />
          <div className="space-y-1">
            <div className="text-3xl xl:text-4xl font-bold text-primary-foreground">
              1M+
            </div>
            <div className="text-primary-foreground/50 text-xs font-medium uppercase tracking-wider">
              Insights Generated
            </div>
          </div>
          <Separator orientation="vertical" className="h-12 bg-white/10" />
          <div className="space-y-1">
            <div className="text-3xl xl:text-4xl font-bold text-primary-foreground">
              99%
            </div>
            <div className="text-primary-foreground/50 text-xs font-medium uppercase tracking-wider">
              Accuracy
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-primary-foreground/20 rounded-full blur-3xl" />
    </div>
  );
}
