import { Workflow, Database, Zap } from "lucide-react";

export default function WorkflowSection() {
  return (
    <section className="section-cream py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Build, Share, and Automate Your Workflow
        </h2>
        <p className="text-muted-foreground mb-12 max-w-xl mx-auto">
          Create workflows that simplify data management and collaboration
        </p>

        <div className="card-elevated p-8 max-w-3xl mx-auto">
          <div className="flex items-start gap-4 mb-6">
            <div className="icon-circle">
              <Workflow className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-foreground">
                Flexible Building Blocks
              </h3>
              <p className="text-sm text-muted-foreground">
                Add, remove, or edit analysis steps as you need, giving you full
                control over your data workflow.
              </p>
            </div>
          </div>

          <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3 bg-card rounded-lg p-3 shadow-sm">
              <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                <Database className="w-3 h-3 text-primary" />
              </div>
              <span className="text-sm font-medium">Automated Reporting</span>
              <span className="text-xs text-muted-foreground ml-auto">
                Active
              </span>
            </div>
            <div className="flex items-center gap-3 bg-card rounded-lg p-3 shadow-sm">
              <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                <Zap className="w-3 h-3 text-primary" />
              </div>
              <span className="text-sm font-medium">Smart Alerts</span>
              <span className="text-xs text-muted-foreground ml-auto">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
