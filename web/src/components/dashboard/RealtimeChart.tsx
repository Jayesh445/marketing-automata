"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RealtimeChartProps {
  data: Array<{
    time: string;
    impressions: number;
    clicks: number;
    conversions: number;
  }>;
}

export function RealtimeChart({ data }: RealtimeChartProps) {
  return (
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
            <LineChart data={data}>
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
  );
}
