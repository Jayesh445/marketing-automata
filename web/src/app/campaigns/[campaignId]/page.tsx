"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/src/components/dashboard/DashboardLayout";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { useWebSocketStore } from "@/src/store/useWebSocketStore";
import {
  ArrowLeft,
  Play,
  Pause,
  Edit,
  Share,
  Eye,
  MousePointer,
  Mail,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Target,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import Link from "next/link";
import { useParams } from "next/navigation";

const campaignData = {
  id: 1,
  name: "Summer Sale Campaign",
  status: "active",
  platforms: ["Email", "LinkedIn", "Twitter"],
  startDate: "2024-01-15",
  endDate: "2024-02-15",
  budget: 2500,
  spent: 1890,
  description: "Promoting our summer sale across multiple channels",
};

export default function CampaignDetailPage() {
  const { campaignId } = useParams<{ campaignId: string }>();
  const { subscribe, unsubscribe, isConnected } = useWebSocketStore();
  const [metrics, setMetrics] = useState({
    impressions: 15420,
    clicks: 1264,
    opens: 892,
    conversions: 145,
    ctr: 8.2,
    openRate: 24.5,
    conversionRate: 11.5,
    revenue: 12450,
  });

  const [realtimeData, setRealtimeData] = useState([
    { time: "10:00", impressions: 1200, clicks: 85, conversions: 12 },
    { time: "11:00", impressions: 1800, clicks: 120, conversions: 18 },
    { time: "12:00", impressions: 2200, clicks: 156, conversions: 22 },
    { time: "13:00", impressions: 1900, clicks: 134, conversions: 19 },
    { time: "14:00", impressions: 2400, clicks: 180, conversions: 28 },
    { time: "15:00", impressions: 2100, clicks: 165, conversions: 25 },
  ]);

  const [platformData, setPlatformData] = useState([
    { platform: "Email", impressions: 8500, clicks: 680, conversions: 85 },
    { platform: "LinkedIn", impressions: 4200, clicks: 378, conversions: 42 },
    { platform: "Twitter", impressions: 2720, clicks: 206, conversions: 18 },
  ]);

  useEffect(() => {
    if (isConnected) {
      // Subscribe to campaign-specific updates
      subscribe(`/topic/campaign/${campaignId}`, (data) => {
        setMetrics((prev) => ({ ...prev, ...data }));
      });

      subscribe(`/topic/campaign/${campaignId}/realtime`, (data) => {
        setRealtimeData((prev) => [...prev.slice(-5), data]);
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
        setRealtimeData((prev) => [...prev.slice(-5), newDataPoint]);

        // Update metrics
        setMetrics((prev) => ({
          ...prev,
          impressions: prev.impressions + Math.floor(Math.random() * 50),
          clicks: prev.clicks + Math.floor(Math.random() * 5),
          conversions: prev.conversions + Math.floor(Math.random() * 2),
        }));
      }, 10000);

      return () => {
        clearInterval(interval);
        unsubscribe(`/topic/campaign/${campaignId}`);
        unsubscribe(`/topic/campaign/${campaignId}/realtime`);
      };
    }
  }, [isConnected, subscribe, unsubscribe, campaignId]);

  const statusColors = {
    active: "bg-success text-white",
    scheduled: "bg-info text-white",
    completed: "bg-gray-500 text-white",
    paused: "bg-warning text-white",
    draft: "bg-gray-300 text-gray-700",
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/campaigns">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Campaigns
              </Button>
            </Link>
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  {campaignData.name}
                </h1>
                <Badge
                  className={
                    statusColors[
                      campaignData.status as keyof typeof statusColors
                    ]
                  }
                >
                  {campaignData.status}
                </Badge>
                <div
                  className={`w-3 h-3 rounded-full ${
                    isConnected ? "bg-success animate-pulse" : "bg-gray-400"
                  }`}
                ></div>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                {campaignData.description}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {campaignData.status === "active" ? (
              <Button variant="outline">
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </Button>
            ) : (
              <Button variant="outline">
                <Play className="mr-2 h-4 w-4" />
                Resume
              </Button>
            )}
            <Link href={`/campaigns/${campaignId}/edit`}>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </Link>
            <Button variant="outline">
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Campaign Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Duration</p>
                  <p className="text-lg font-bold text-gray-900">
                    {new Date(campaignData.startDate).toLocaleDateString()} -{" "}
                    {new Date(campaignData.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-secondary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Platforms</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {campaignData.platforms.map((platform) => (
                      <Badge
                        key={platform}
                        variant="outline"
                        className="text-xs"
                      >
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-success" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Budget</p>
                  <p className="text-lg font-bold text-gray-900">
                    ${campaignData.budget.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Spent: ${campaignData.spent.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-info" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Performance
                  </p>
                  <p className="text-lg font-bold text-success">
                    {metrics.ctr}% CTR
                  </p>
                  <p className="text-sm text-gray-500">
                    {metrics.conversionRate}% Conv Rate
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Impressions
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metrics.impressions.toLocaleString()}
                  </p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-success mr-1" />
                    <span className="text-sm text-success">+12%</span>
                  </div>
                </div>
                <Eye className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Clicks</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metrics.clicks.toLocaleString()}
                  </p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-success mr-1" />
                    <span className="text-sm text-success">+18%</span>
                  </div>
                </div>
                <MousePointer className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Opens</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metrics.opens.toLocaleString()}
                  </p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-success mr-1" />
                    <span className="text-sm text-success">+8%</span>
                  </div>
                </div>
                <Mail className="h-8 w-8 text-info" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Conversions
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metrics.conversions.toLocaleString()}
                  </p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-success mr-1" />
                    <span className="text-sm text-success">+23%</span>
                  </div>
                </div>
                <Users className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Real-time Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-3 h-3 bg-success rounded-full mr-2 animate-pulse"></div>
                Real-time Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={realtimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="impressions"
                      stroke="#4C6EF5"
                      strokeWidth={2}
                      name="Impressions"
                    />
                    <Line
                      type="monotone"
                      dataKey="clicks"
                      stroke="#FAB005"
                      strokeWidth={2}
                      name="Clicks"
                    />
                    <Line
                      type="monotone"
                      dataKey="conversions"
                      stroke="#2F9E44"
                      strokeWidth={2}
                      name="Conversions"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Platform Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={platformData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="platform" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="impressions"
                      fill="#4C6EF5"
                      name="Impressions"
                    />
                    <Bar dataKey="clicks" fill="#FAB005" name="Clicks" />
                    <Bar
                      dataKey="conversions"
                      fill="#2F9E44"
                      name="Conversions"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Engagement Rates</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Click-through Rate
                    </span>
                    <span className="font-medium">{metrics.ctr}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Open Rate</span>
                    <span className="font-medium">{metrics.openRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Conversion Rate
                    </span>
                    <span className="font-medium">
                      {metrics.conversionRate}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Revenue Metrics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Revenue</span>
                    <span className="font-medium">
                      ${metrics.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Cost per Click
                    </span>
                    <span className="font-medium">
                      ${(campaignData.spent / metrics.clicks).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Return on Ad Spend
                    </span>
                    <span className="font-medium">
                      {((metrics.revenue / campaignData.spent) * 100).toFixed(
                        0
                      )}
                      %
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Budget Usage</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Budget Spent</span>
                    <span className="font-medium">
                      ${campaignData.spent.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Remaining Budget
                    </span>
                    <span className="font-medium">
                      $
                      {(
                        campaignData.budget - campaignData.spent
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          (campaignData.spent / campaignData.budget) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {Math.round(
                      (campaignData.spent / campaignData.budget) * 100
                    )}
                    % of budget used
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
