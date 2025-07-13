"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/lib/utils";
import {
  BarChart3,
  Users,
  Target,
  Brain,
  Settings,
  Bell,
  Zap,
  Mail,
  Home,
  X,
  TestTube2,
  Plug,
  CreditCard,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Campaigns", href: "/campaigns", icon: Target },
  { name: "Audiences", href: "/audiences", icon: Users },
  { name: "AI Tools", href: "/ai", icon: Brain },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "A/B Tests", href: "/ab-tests", icon: TestTube2 },
  { name: "Integrations", href: "/integrations", icon: Plug },
  { name: "Team", href: "/team", icon: Users },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Billing", href: "/billing", icon: CreditCard },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden" onClick={onClose}>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <Link href="/dashboard" className="text-xl font-bold text-primary">
            MarketingAI Pro
          </Link>
          <button
            onClick={onClose}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-5 px-2 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "nav-item",
                  isActive ? "nav-item-active" : "nav-item-inactive"
                )}
                onClick={onClose}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-linear-to-r from-primary to-primary-hover rounded-lg p-4 text-white">
            <div className="flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              <div className="text-sm font-medium">Upgrade to Pro</div>
            </div>
            <p className="text-xs text-white/80 mt-1">
              Unlock advanced features and unlimited campaigns
            </p>
            <button className="mt-2 w-full bg-white/20 hover:bg-white/30 text-white text-xs py-2 px-3 rounded transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
