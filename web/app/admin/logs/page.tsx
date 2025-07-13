"use client";

import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAdminWebSocket } from "@/store/useAdminWebSocket";
import {
  Search,
  Filter,
  Download,
  Activity,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Shield,
  Database,
  Zap,
  RefreshCw,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR" | "DEBUG" | "AUTH";
  service: string;
  message: string;
  userId?: string;
  ip?: string;
  details?: any;
}

const initialLogs: LogEntry[] = [
  {
    id: "log-1",
    timestamp: "2024-02-15 10:30:25",
    level: "INFO",
    service: "auth-service",
    message: "User login successful",
    userId: "user-123",
    ip: "192.168.1.100",
  },
  {
    id: "log-2",
    timestamp: "2024-02-15 10:29:45",
    level: "ERROR",
    service: "campaign-service",
    message: "Failed to send campaign email batch",
    details: { campaignId: "camp-456", batchSize: 1000, error: "SMTP timeout" },
  },
  {
    id: "log-3",
    timestamp: "2024-02-15 10:28:12",
    level: "WARN",
    service: "ai-service",
    message: "High API usage detected",
    userId: "user-789",
    details: { requestCount: 500, timeWindow: "1h" },
  },
  {
    id: "log-4",
    timestamp: "2024-02-15 10:27:33",
    level: "AUTH",
    service: "auth-service",
    message: "Failed login attempt",
    ip: "10.0.0.50",
    details: { attempts: 3, email: "attacker@evil.com" },
  },
  {
    id: "log-5",
    timestamp: "2024-02-15 10:26:18",
    level: "INFO",
    service: "integration-service",
    message: "LinkedIn API sync completed",
    details: { profilesSync: 1250, duration: "45s" },
  },
  {
    id: "log-6",
    timestamp: "2024-02-15 10:25:44",
    level: "DEBUG",
    service: "analytics-service",
    message: "Processing campaign metrics",
    details: {
      campaignId: "camp-789",
      metrics: ["impressions", "clicks", "conversions"],
    },
  },
];

const logLevelColors = {
  INFO: "bg-blue-100 text-blue-800",
  WARN: "bg-yellow-100 text-yellow-800",
  ERROR: "bg-red-100 text-red-800",
  DEBUG: "bg-gray-100 text-gray-800",
  AUTH: "bg-purple-100 text-purple-800",
};

const logLevelIcons = {
  INFO: Info,
  WARN: AlertTriangle,
  ERROR: XCircle,
  DEBUG: Activity,
  AUTH: Shield,
};

const serviceIcons = {
  "auth-service": Shield,
  "campaign-service": Zap,
  "ai-service": Activity,
  "integration-service": Database,
  "analytics-service": Activity,
};

export default function AdminLogsPage() {
  const { subscribe, unsubscribe, isConnected } = useAdminWebSocket();
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (isConnected && autoRefresh) {
      // Subscribe to real-time logs
      subscribe("/topic/admin/logs", (newLog: LogEntry) => {
        setLogs((prev) => [newLog, ...prev.slice(0, 99)]); // Keep last 100 logs
      });

      return () => {
        unsubscribe("/topic/admin/logs");
      };
    }
  }, [isConnected, autoRefresh, subscribe, unsubscribe]);

  // Simulate new logs
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      const services = [
        "auth-service",
        "campaign-service",
        "ai-service",
        "integration-service",
        "analytics-service",
      ];
      const levels: LogEntry["level"][] = [
        "INFO",
        "WARN",
        "ERROR",
        "DEBUG",
        "AUTH",
      ];
      const messages = [
        "User session created",
        "Campaign email sent successfully",
        "AI content generation completed",
        "Database connection established",
        "API rate limit warning",
        "Authentication token refreshed",
        "Integration sync started",
        "Analytics data processed",
      ];

      const newLog: LogEntry = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        level: levels[Math.floor(Math.random() * levels.length)],
        service: services[Math.floor(Math.random() * services.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        userId:
          Math.random() > 0.5
            ? `user-${Math.floor(Math.random() * 1000)}`
            : undefined,
        ip:
          Math.random() > 0.7
            ? `192.168.1.${Math.floor(Math.random() * 255)}`
            : undefined,
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 99)]);
    }, 3000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.userId &&
        log.userId.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLevel = levelFilter === "all" || log.level === levelFilter;
    const matchesService =
      serviceFilter === "all" || log.service === serviceFilter;
    return matchesSearch && matchesLevel && matchesService;
  });

  const logCounts = {
    total: logs.length,
    info: logs.filter((l) => l.level === "INFO").length,
    warn: logs.filter((l) => l.level === "WARN").length,
    error: logs.filter((l) => l.level === "ERROR").length,
    auth: logs.filter((l) => l.level === "AUTH").length,
  };

  const handleExportLogs = () => {
    const dataStr = JSON.stringify(filteredLogs, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `system-logs-${
      new Date().toISOString().split("T")[0]
    }.json`;
    link.click();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">System Logs</h1>
            <p className="mt-1 text-sm text-gray-600">
              Real-time system logs and application events
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected ? "bg-green-500 animate-pulse" : "bg-gray-400"
              }`}
            ></div>
            <span className="text-sm text-gray-600">
              {isConnected ? "Live updates" : "Disconnected"}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${autoRefresh ? "animate-spin" : ""}`}
              />
              {autoRefresh ? "Auto" : "Manual"}
            </Button>
            <Button variant="outline" onClick={handleExportLogs}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Activity className="h-8 w-8 text-primary" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Logs
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {logCounts.total}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Info className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Info</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {logCounts.info}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-yellow-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Warnings
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {logCounts.warn}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <XCircle className="h-8 w-8 text-red-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Errors</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {logCounts.error}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Shield className="h-8 w-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Auth</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {logCounts.auth}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search logs by message, service, or user ID..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Log Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="INFO">Info</SelectItem>
                  <SelectItem value="WARN">Warning</SelectItem>
                  <SelectItem value="ERROR">Error</SelectItem>
                  <SelectItem value="DEBUG">Debug</SelectItem>
                  <SelectItem value="AUTH">Auth</SelectItem>
                </SelectContent>
              </Select>

              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="auth-service">Auth Service</SelectItem>
                  <SelectItem value="campaign-service">
                    Campaign Service
                  </SelectItem>
                  <SelectItem value="ai-service">AI Service</SelectItem>
                  <SelectItem value="integration-service">
                    Integration Service
                  </SelectItem>
                  <SelectItem value="analytics-service">
                    Analytics Service
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Logs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>System Logs ({filteredLogs.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredLogs.map((log) => {
                  const LevelIcon = logLevelIcons[log.level];
                  const ServiceIcon =
                    serviceIcons[log.service as keyof typeof serviceIcons] ||
                    Activity;

                  return (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                    >
                      <div className="flex items-center space-x-2 min-w-0 shrink-0">
                        <LevelIcon
                          className={`h-4 w-4 ${
                            log.level === "ERROR"
                              ? "text-red-500"
                              : log.level === "WARN"
                              ? "text-yellow-500"
                              : log.level === "AUTH"
                              ? "text-purple-500"
                              : log.level === "INFO"
                              ? "text-blue-500"
                              : "text-gray-500"
                          }`}
                        />
                        <Badge className={logLevelColors[log.level]}>
                          {log.level}
                        </Badge>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <ServiceIcon className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-900">
                            {log.service}
                          </span>
                          <span className="text-xs text-gray-500">
                            {log.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-1">
                          {log.message}
                        </p>
                        {(log.userId || log.ip) && (
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            {log.userId && <span>User: {log.userId}</span>}
                            {log.ip && <span>IP: {log.ip}</span>}
                          </div>
                        )}
                        {log.details && (
                          <details className="mt-2">
                            <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                              View Details
                            </summary>
                            <pre className="mt-1 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                              {JSON.stringify(log.details, null, 2)}
                            </pre>
                          </details>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
