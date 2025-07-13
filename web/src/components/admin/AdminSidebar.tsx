"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/lib/utils";
import {
  BarChart3,
  Users,
  Target,
  Shield,
  Settings,
  Bell,
  CreditCard,
  FileText,
  Zap,
  Home,
  X,
  UserCheck,
  Flag,
  Plug,
  MessageSquare,
  Activity,
} from "lucide-react";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Home },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Teams", href: "/admin/teams", icon: UserCheck },
  { name: "Campaigns", href: "/admin/campaigns", icon: Target },
  { name: "Content Reports", href: "/admin/content-reports", icon: Flag },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Integrations", href: "/admin/integrations", icon: Plug },
  { name: "Notifications", href: "/admin/notifications", icon: MessageSquare },
  { name: "Billing", href: "/admin/billing", icon: CreditCard },
  { name: "System Logs", href: "/admin/logs", icon: Activity },
];

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
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
          "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <Link
            href="/admin/dashboard"
            className="text-xl font-bold text-primary"
          >
            Admin Panel
          </Link>
          <button
            onClick={onClose}
            className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200",
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
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
          <div className="bg-linear-to-r from-primary to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              <div className="text-sm font-medium">Admin Access</div>
            </div>
            <p className="text-xs text-white/80 mt-1">
              Platform administration panel
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
