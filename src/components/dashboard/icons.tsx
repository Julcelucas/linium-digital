import {
  BadgeCheck,
  CalendarCheck,
  CircleDollarSign,
  ClipboardList,
  Handshake,
  MapPinned,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { MetricIconType, ModuleIconType } from "./types";

export function MetricIcon({ type }: { type: MetricIconType }) {
  if (type === "trend") {
    return <TrendingUp size={17} style={{ color: "#2E6DA4" }} />;
  }
  if (type === "wallet") {
    return <Wallet size={17} style={{ color: "#F0A500" }} />;
  }
  return <BadgeCheck size={17} style={{ color: "#27AE60" }} />;
}

export function ModuleIcon({
  type,
  color,
}: {
  type: ModuleIconType;
  color: string;
}) {
  if (type === "calendar") return <CalendarCheck size={17} style={{ color }} />;
  if (type === "map") return <MapPinned size={17} style={{ color }} />;
  if (type === "message") return <MessageSquare size={17} style={{ color }} />;
  if (type === "check") return <ShieldCheck size={17} style={{ color }} />;
  if (type === "money") return <CircleDollarSign size={17} style={{ color }} />;
  if (type === "clipboard") return <ClipboardList size={17} style={{ color }} />;
  return <Handshake size={17} style={{ color }} />;
}
