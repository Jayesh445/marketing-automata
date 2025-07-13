"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/src/components/dashboard/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointer,
  Mail,
  Users,
  DollarSign,
  Calendar,
  Download,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
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
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

const timeRanges = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "1y", label: "Last year" },
];

const performanceData = [
  {
    date: "2024-02-01",
    impressions: 12500,
    clicks: 890,
    conversions: 125,
    revenue: 3200,
  },
  {
    date: "2024-02-02",
    impressions: 13200,
    clicks: 945,
    conversions: 142,
    revenue: 3650,
  },
  {
    date: "2024-02-03",
    impressions: 11800,
    clicks: 820,
    conversions: 118,
    revenue: 2980,
  },
  {
    date: "2024-02-04",
    impressions: 14100,
    clicks: 1020,
    conversions: 156,
    revenue: 4100,
  },
  {
    date: "2024-02-05",
    impressions: 15600,
    clicks: 1180,
    conversions: 178,
    revenue: 4720,
  },
  {
    date: "2024-02-06",
    impressions: 13900,
    clicks: 995,
    conversions: 145,
    revenue: 3850,
  },
  {
    date: "2024-02-07",
    impressions: 16200,
    clicks: 1250,
    conversions: 195,
    revenue: 5200,
  },
];

const platformData = [
  {
    platform: "Email",
    impressions: 45000,
    clicks: 3200,
    conversions: 450,
    revenue: 12500,
  },
  {
    platform: "LinkedIn",
    impressions: 28000,
    clicks: 2100,
    conversions: 280,
    revenue: 8200,
  },
  {
    platform: "Twitter",
    impressions: 35000,
    clicks: 1800,
    conversions: 220,
    revenue: 6800,
  },
  {
    platform: "Instagram",
    impressions: 22000,
    clicks: 1400,
    conversions: 180,
    revenue: 5400,
  },
  {
    platform: "YouTube",
    impressions: 18000,
    clicks: 900,
    conversions: 120,
    revenue: 3600,
  },
];

const audienceData = [
  { name: "Tech Professionals", value: 35, color: "#4C6EF5" },
  { name: "Marketing Managers", value: 25, color: "#FAB005" },
  { name: "E-commerce", value: 20, color: "#2F9E44" },
  { name: "Startups", value: 15, color: "#15AABF" },
  { name: "Others", value: 5, color: "#F03E3E" },
];

const conversionFunnelData = [
  { stage: "Impressions", value: 148000, percentage: 100 },
  { stage: "Clicks", value: 8400, percentage: 5.7 },
  { stage: "Visits", value: 6200, percentage: 4.2 },
  { stage: "Leads", value: 1240, percentage: 0.8 },
  { stage: "Conversions", value: 465, percentage: 0.3 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState("impressions");

  const totalImpressions = performanceData.reduce(
    (sum, day) => sum + day.impressions,
    0
  );
  const totalClicks = performanceData.reduce((sum, day) => sum + day.clicks, 0);
  const totalConversions = performanceData.reduce(
    (sum, day) => sum + day.conversions,
    0
  );
  const totalRevenue = performanceData.reduce(
    (sum, day) => sum + day.revenue,
    0
  );

  const ctr = ((totalClicks / totalImpressions) * 100).toFixed(2);
  const conversionRate = ((totalConversions / totalClicks) * 100).toFixed(2);
  const avgRevenuePerConversion = (totalRevenue / totalConversions).toFixed(2);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Analytics Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Comprehensive insights into your marketing performance
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Impressions
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalImpressions.toLocaleString()}
                  </p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-success mr-1" />
                    <span className="text-sm text-success">+12.5%</span>
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
                  <p className="text-sm font-medium text-gray-600">
                    Total Clicks
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalClicks.toLocaleString()}
                  </p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-success mr-1" />
                    <span className="text-sm text-success">+18.2%</span>
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
                  <p className="text-sm font-medium text-gray-600">
                    Conversions
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalConversions.toLocaleString()}
                  </p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-success mr-1" />
                    <span className="text-sm text-success">+25.8%</span>
                  </div>
                </div>
                <Users className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${totalRevenue.toLocaleString()}
                  </p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-success mr-1" />
                    <span className="text-sm text-success">+31.4%</span>
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-info" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Rates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">
                  Click-through Rate
                </p>
                <p className="text-3xl font-bold text-primary">{ctr}%</p>
                <p className="text-sm text-gray-500 mt-1">Industry avg: 2.1%</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">
                  Conversion Rate
                </p>
                <p className="text-3xl font-bold text-success">
                  {conversionRate}%
                </p>
                <p className="text-sm text-gray-500 mt-1">Industry avg: 8.2%</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">
                  Avg Revenue/Conversion
                </p>
                <p className="text-3xl font-bold text-secondary">
                  ${avgRevenuePerConversion}
                </p>
                <p className="text-sm text-gray-500 mt-1">Target: $25.00</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(date) =>
                        new Date(date).toLocaleDateString()
                      }
                    />
                    <YAxis />
                    <Tooltip
                      labelFormatter={(date) =>
                        new Date(date).toLocaleDateString()
                      }
                      formatter={(value, name) => [
                        value.toLocaleString(),
                        name,
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="impressions"
                      stackId="1"
                      stroke="#4C6EF5"
                      fill="#4C6EF5"
                      fillOpacity={0.6}
                      name="Impressions"
                    />
                    <Area
                      type="monotone"
                      dataKey="clicks"
                      stackId="2"
                      stroke="#FAB005"
                      fill="#FAB005"
                      fillOpacity={0.6}
                      name="Clicks"
                    />
                  </AreaChart>
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
                    <Tooltip formatter={(value) => value.toLocaleString()} />
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

        {/* Audience & Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Audience Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Audience Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={audienceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {audienceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Conversion Funnel */}
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionFunnelData.map((stage, index) => (
                  <div key={stage.stage} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{stage.stage}</span>
                      <div className="text-right">
                        <span className="text-sm font-bold">
                          {stage.value.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({stage.percentage}%)
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-linear-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
                        style={{ width: `${stage.percentage * 10}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Details Table */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Performance Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Platform</th>
                    <th className="text-right py-3 px-4">Impressions</th>
                    <th className="text-right py-3 px-4">Clicks</th>
                    <th className="text-right py-3 px-4">CTR</th>
                    <th className="text-right py-3 px-4">Conversions</th>
                    <th className="text-right py-3 px-4">Conv Rate</th>
                    <th className="text-right py-3 px-4">Revenue</th>
                    <th className="text-right py-3 px-4">ROAS</th>
                  </tr>
                </thead>
                <tbody>
                  {platformData.map((platform) => {
                    const ctr = (
                      (platform.clicks / platform.impressions) *
                      100
                    ).toFixed(2);
                    const convRate = (
                      (platform.conversions / platform.clicks) *
                      100
                    ).toFixed(2);
                    const roas = (
                      platform.revenue /
                      (platform.revenue * 0.3)
                    ).toFixed(2); // Assuming 30% cost

                    return (
                      <tr
                        key={platform.platform}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 font-medium">
                          {platform.platform}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {platform.impressions.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {platform.clicks.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right">{ctr}%</td>
                        <td className="py-3 px-4 text-right">
                          {platform.conversions.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right">{convRate}%</td>
                        <td className="py-3 px-4 text-right">
                          ${platform.revenue.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right">{roas}x</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
