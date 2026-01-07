import { Shield, Lock, CheckCircle } from "lucide-react";

export default function SecuritySection() {
  return (
    <section className="section-orange py-16 px-6">
      <div className="max-w-5xl mx-auto text-center text-primary-foreground">
        <h2 className="text-3xl font-bold mb-3">
          Your Data's Security is Our Priority
        </h2>
        <p className="text-primary-foreground/80 mb-10 max-w-xl mx-auto">
          Enterprise-grade security protecting your valuable data at every step
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-3">
            <div className="icon-circle-white bg-primary-foreground/20 p-2 rounded-full">
              <Shield className="w-5 h-5" />
            </div>
            <span className="font-medium">256-bit Encryption</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="icon-circle-white bg-primary-foreground/20 p-2 rounded-full">
              <Lock className="w-5 h-5" />
            </div>
            <span className="font-medium">SOC 2 Compliant</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="icon-circle-white bg-primary-foreground/20 p-2 rounded-full">
              <CheckCircle className="w-5 h-5" />
            </div>
            <span className="font-medium">Regular Audits</span>
          </div>
        </div>
      </div>
    </section>
  );
}
