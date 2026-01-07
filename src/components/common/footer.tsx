import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-destructive py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-20 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={100}
              height={100}
              className="mb-1"
            />
            <p className="text-sm text-primary-foreground/80">
              The AI-powered data
              <br />
              analytics platform for
              <br />
              modern teams.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-primary-foreground">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link href="#" className="hover:text-primary-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-primary-foreground/20" />

        <div className="pt-6 text-center text-sm text-primary-foreground/60">
          &copy; {new Date().getFullYear()} Greeny. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
