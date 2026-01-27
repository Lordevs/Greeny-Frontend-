import { ROUTES } from "@/constants/routes";
import { DollarSign, MessageSquare, Users } from "lucide-react";

export const NAV_ITEMS = [
  {
    name: "Chat",
    href: ROUTES.CHAT.ROOT,
    icon: MessageSquare,
  },
  {
    name: "Pricing",
    href: ROUTES.APP.PRICING,
    icon: DollarSign,
  },
  {
    name: "Teams",
    href: ROUTES.APP.TEAMS,
    icon: Users,
  },

];
