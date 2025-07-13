"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/src/components/dashboard/DashboardLayout";
import { MetricCard } from "@/src/components/dashboard/MetricCard";
import { RealtimeChart } from "@/src/components/dashboard/RealtimeChart";
import { CampaignList } from "@/src/components/dashboard/CampaignList";
import { RecentActivity } from "@/src/components/dashboard/RecentActivity";
import {
  TrendingUp,
  Users,
  Mail,
  Target,
  Eye,
  MousePointer,
  DollarSign,
  Zap,
} from "lucide-react";
import { useWebSocketStore } from "@/src/store/useWebSocketStore";

export default function DashboardPage() {
  const { subscribe, unsubscribe, isConnected } = useWebSocketStore();
  const [metrics, setMetrics] = useState({
    totalCampaigns: 24,
    activeAudiences: 12500,
    emailsSent: 45230,
    conversions: 1820,
    impressions: 125400,
    clicks: 8940,
    revenue: 45230,
    ctr: 7.13,
  });

  const [realtimeData, setRealtimeData] = useState([
    { time: "10:00", impressions: 1200, clicks: 85, conversions: 12 },
    { time: "10:30", impressions: 1800, clicks: 120, conversions: 18 },
    { time: "11:00", impressions: 2200, clicks: 156, conversions: 22 },
    { time: "11:30", impressions: 1900, clicks: 134, conversions: 19 },
    { time: "12:00", impressions: 2400, clicks: 180, conversions: 28 },
  ]);

  useEffect(() => {
    if (isConnected) {
      // Subscribe to dashboard updates
      subscribe("/topic/dashboard/metrics", (data) => {
        setMetrics((prev) => ({ ...prev, ...data }));
      });

      subscribe("/topic/dashboard/realtime", (data) => {
        setRealtimeData((prev) => [...prev.slice(-4), data]);
      });

      // Simulate real-time updates
      const interval = setInterval(() => {
        const newDataPoint = {
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          impressions: Math.floor(Math.random() * 1000) + 1500,
          clicks: Math.floor(Math.random() * 50) + 100,
          conversions: Math.floor(Math.random() * 10) + 15,
        };
        setRealtimeData((prev) => [...prev.slice(-4), newDataPoint]);
      }, 5000);

      return () => {
        clearInterval(interval);
        unsubscribe("/topic/dashboard/metrics");
        unsubscribe("/topic/dashboard/realtime");
      };
    }
  }, [isConnected, subscribe, unsubscribe]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Overview of your marketing campaigns and performance
          </p>
        </div>

        {/* Connection Status */}
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              isConnected ? "bg-success" : "bg-gray-400"
            }`}
          ></div>
          <span className="text-sm text-gray-600">
            {isConnected ? "Real-time updates active" : "Connecting..."}
          </span>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Active Campaigns"
            value={metrics.totalCampaigns.toLocaleString()}
            icon={Target}
            color="text-primary"
            bgColor="bg-primary/10"
            change="+12%"
            changeType="positive"
          />
          <MetricCard
            title="Total Audience"
            value={metrics.activeAudiences.toLocaleString()}
            icon={Users}
            color="text-info"
            bgColor="bg-info/10"
            change="+8%"
            changeType="positive"
          />
          <MetricCard
            title="Emails Sent"
            value={metrics.emailsSent.toLocaleString()}
            icon={Mail}
            color="text-secondary"
            bgColor="bg-secondary/10"
            change="+15%"
            changeType="positive"
          />
          <MetricCard
            title="Conversions"
            value={metrics.conversions.toLocaleString()}
            icon={TrendingUp}
            color="text-success"
            bgColor="bg-success/10"
            change="+23%"
            changeType="positive"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Impressions"
            value={metrics.impressions.toLocaleString()}
            icon={Eye}
            color="text-primary"
            bgColor="bg-primary/10"
            change="+5%"
            changeType="positive"
          />
          <MetricCard
            title="Clicks"
            value={metrics.clicks.toLocaleString()}
            icon={MousePointer}
            color="text-info"
            bgColor="bg-info/10"
            change="+18%"
            changeType="positive"
          />
          <MetricCard
            title="Revenue"
            value={`$${metrics.revenue.toLocaleString()}`}
            icon={DollarSign}
            color="text-success"
            bgColor="bg-success/10"
            change="+31%"
            changeType="positive"
          />
          <MetricCard
            title="CTR"
            value={`${metrics.ctr}%`}
            icon={Zap}
            color="text-secondary"
            bgColor="bg-secondary/10"
            change="+2.1%"
            changeType="positive"
          />
        </div>

        {/* Charts and Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RealtimeChart data={realtimeData} />
          <RecentActivity />
        </div>

        {/* Campaign List */}
        <CampaignList />
      </div>
    </DashboardLayout>
  );
}
