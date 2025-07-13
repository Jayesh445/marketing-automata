'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle, Send } from 'lucide-react';

const activities = [
  {
    id: 1,
    action: 'Campaign "Summer Sale" launched',
    timestamp: '2 minutes ago',
    status: 'success',
    icon: Send,
  },
  {
    id: 2,
    action: 'A/B test "Email Subject Lines" completed',
    timestamp: '1 hour ago',
    status: 'success',
    icon: CheckCircle,
  },
  {
    id: 3,
    action: 'Campaign "Product Launch" scheduled',
    timestamp: '3 hours ago',
    status: 'pending',
    icon: Clock,
  },
  {
    id: 4,
    action: 'Integration with LinkedIn requires attention',
    timestamp: '6 hours ago',
    status: 'warning',
    icon: AlertCircle,
  },
  {
    id: 5,
    action: 'Audience "Tech Professionals" updated',
    timestamp: '1 day ago',
    status: 'success',
    icon: CheckCircle,
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${
                  activity.status === 'success' ? 'bg-success/10' :
                  activity.status === 'pending' ? 'bg-warning/10' :
                  'bg-error/10'
                }`}>
                  <Icon className={`h-4 w-4 ${
                    activity.status === 'success' ? 'text-success' :
                    activity.status === 'pending' ? 'text-warning' :
                    'text-error'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500">{activity.timestamp}</p>
                </div>
                <Badge variant={
                  activity.status === 'success' ? 'default' :
                  activity.status === 'pending' ? 'secondary' :
                  'destructive'
                }>
                  {activity.status}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}