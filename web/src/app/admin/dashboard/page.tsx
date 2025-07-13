"use client";

import { useEffect, useState } from "react";
import { AdminLayout } from "@/src/components/admin/AdminLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { useAdminWebSocket } from "@/src/store/useAdminWebSocket";
import {
  Users,
  Target,
  Brain,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

const platformMetrics = {
  totalUsers: 12847,
  activeUsers: 8934,
  totalCampaigns: 3421,
  activeCampaigns: 1256,
  aiGenerations: 45230,
  revenue: 234567,
  systemStatus: "healthy",
  uptime: 99.97,
};

const realtimeData = [
  { time: "00:00", users: 1200, campaigns: 85, ai: 234 },
  { time: "04:00", users: 800, campaigns: 45, ai: 123 },
  { time: "08:00", users: 2400, campaigns: 156, ai: 456 },
  { time: "12:00", users: 3200, campaigns: 234, ai: 678 },
  { time: "16:00", users: 2800, campaigns: 198, ai: 543 },
  { time: "20:00", users: 1900, campaigns: 134, ai: 321 },
];

const usageByPlan = [
  { name: "Starter", value: 45, color: "#4C6EF5" },
  { name: "Professional", value: 35, color: "#FAB005" },
  { name: "Enterprise", value: 20, color: "#2F9E44" },
];

const systemEvents = [
  {
    id: 1,
    type: "info",
    message: "System backup completed successfully",
    timestamp: "2 minutes ago",
  },
  {
    id: 2,
    type: "warning",
    message: "High API usage detected for user team-456",
    timestamp: "15 minutes ago",
  },
  {
    id: 3,
    type: "success",
    message: "New integration deployed: TikTok API",
    timestamp: "1 hour ago",
  },
  {
    id: 4,
    type: "error",
    message: "Failed login attempts from IP 192.168.1.100",
    timestamp: "2 hours ago",
  },
];

export default function AdminDashboardPage() {
  const { subscribe, unsubscribe, isConnected } = useAdminWebSocket();
  const [metrics, setMetrics] = useState(platformMetrics);
  const [liveData, setLiveData] = useState(realtimeData);
  const [events, setEvents] = useState(systemEvents);

  useEffect(() => {
    if (isConnected) {
      // Subscribe to real-time platform metrics
      subscribe("/topic/admin/metrics", (data) => {
        setMetrics((prev) => ({ ...prev, ...data }));
      });

      subscribe("/topic/admin/activity", (data) => {
        setLiveData((prev) => [...prev.slice(-5), data]);
      });

      subscribe("/topic/admin/events", (data) => {
        setEvents((prev) => [data, ...prev.slice(0, 9)]);
      });

      // Simulate real-time updates
      const interval = setInterval(() => {
        const newDataPoint = {
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          users: Math.floor(Math.random() * 1000) + 1500,
          campaigns: Math.floor(Math.random() * 50) + 100,
          ai: Math.floor(Math.random() * 200) + 300,
        };
        setLiveData((prev) => [...prev.slice(-5), newDataPoint]);
      }, 10000);

      return () => {
        clearInterval(interval);
        unsubscribe("/topic/admin/metrics");
        unsubscribe("/topic/admin/activity");
        unsubscribe("/topic/admin/events");
      };
    }
  }, [isConnected, subscribe, unsubscribe]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Platform Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Real-time overview of platform metrics and system health
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected ? "bg-green-500 animate-pulse" : "bg-gray-400"
              }`}
            ></div>
            <span className="text-sm text-gray-600">
              {isConnected ? "Live updates active" : "Connecting..."}
            </span>
          </div>
        </div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-linear-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      System Status: Healthy
                    </h3>
                    <p className="text-sm text-gray-600">
                      All services operational • Uptime: {metrics.uptime}%
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  All Systems Operational
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Users
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {metrics.totalUsers.toLocaleString()}
                    </p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+12.5%</span>
                    </div>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Active Campaigns
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {metrics.activeCampaigns.toLocaleString()}
                    </p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+8.2%</span>
                    </div>
                  </div>
                  <Target className="h-8 w-8 text-secondary" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      AI Generations
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {metrics.aiGenerations.toLocaleString()}
                    </p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+23.1%</span>
                    </div>
                  </div>
                  <Brain className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Monthly Revenue
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${metrics.revenue.toLocaleString()}
                    </p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+15.7%</span>
                    </div>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Real-time Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Real-time Platform Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={liveData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#4C6EF5"
                        strokeWidth={2}
                        name="Active Users"
                      />
                      <Line
                        type="monotone"
                        dataKey="campaigns"
                        stroke="#FAB005"
                        strokeWidth={2}
                        name="Campaigns"
                      />
                      <Line
                        type="monotone"
                        dataKey="ai"
                        stroke="#2F9E44"
                        strokeWidth={2}
                        name="AI Requests"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Usage by Plan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Usage by Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={usageByPlan}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {usageByPlan.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent System Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                Recent System Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.slice(0, 6).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {getEventIcon(event.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {event.message}
                      </p>
                      <p className="text-sm text-gray-500">{event.timestamp}</p>
                    </div>
                    <Badge
                      variant={
                        event.type === "success"
                          ? "default"
                          : event.type === "warning"
                          ? "secondary"
                          : event.type === "error"
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
