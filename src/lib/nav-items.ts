import { ROUTES } from "@/constants/routes";
import { MessageSquare, Users } from "lucide-react";

export const NAV_ITEMS = [
  {
    name: "Chat",
    href: ROUTES.APP.CHAT,
    icon: MessageSquare,
  },
  {
    name: "Teams",
    href: ROUTES.APP.TEAMS,
    icon: Users,
  },
];
