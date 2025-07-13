'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Bell, 
  Search, 
  Filter, 
  Check, 
  CheckCheck,
  Trash2,
  Settings,
  AlertCircle,
  TrendingUp,
  Mail,
  Users,
  Zap,
  Calendar
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const notifications = [
  {
    id: 1,
    type: 'campaign',
    title: 'Campaign "Summer Sale" completed successfully',
    message: 'Your campaign reached 15,420 people with a 8.2% CTR. View detailed results.',
    timestamp: '2024-02-15 10:30 AM',
    read: false,
    priority: 'high',
    icon: TrendingUp,
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    id: 2,
    type: 'alert',
    title: 'Instagram integration requires attention',
    message: 'Your Instagram access token has expired. Please reconnect to continue posting.',
    timestamp: '2024-02-15 09:15 AM',
    read: false,
    priority: 'high',
    icon: AlertCircle,
    color: 'text-error',
    bgColor: 'bg-error/10',
  },
  {
    id: 3,
    type: 'team',
    title: 'New team member joined',
    message: 'Sarah Johnson has joined your team as a Marketing Manager.',
    timestamp: '2024-02-15 08:45 AM',
    read: true,
    priority: 'medium',
    icon: Users,
    color: 'text-info',
    bgColor: 'bg-info/10',
  },
  {
    id: 4,
    type: 'campaign',
    title: 'A/B test results are ready',
    message: 'Your email subject line test has reached statistical significance. Variant B is winning with 95% confidence.',
    timestamp: '2024-02-14 4:20 PM',
    read: true,
    priority: 'medium',
    icon: Zap,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    id: 5,
    type: 'system',
    title: 'Scheduled maintenance completed',
    message: 'System maintenance has been completed successfully. All services are now fully operational.',
    timestamp: '2024-02-14 2:00 PM',
    read: true,
    priority: 'low',
    icon: Settings,
    color: 'text-gray-500',
    bgColor: 'bg-gray-100',
  },
  {
    id: 6,
    type: 'campaign',
    title: 'Campaign budget threshold reached',
    message: 'Your "Product Launch" campaign has spent 80% of its allocated budget.',
    timestamp: '2024-02-14 11:30 AM',
    read: false,
    priority: 'medium',
    icon: AlertCircle,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
  {
    id: 7,
    type: 'email',
    title: 'Weekly performance report ready',
    message: 'Your weekly marketing performance report is now available for download.',
    timestamp: '2024-02-14 9:00 AM',
    read: true,
    priority: 'low',
    icon: Mail,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    id: 8,
    type: 'campaign',
    title: 'Campaign scheduled to start',
    message: 'Your "LinkedIn B2B Outreach" campaign is scheduled to start in 2 hours.',
    timestamp: '2024-02-13 6:00 PM',
    read: true,
    priority: 'medium',
    icon: Calendar,
    color: 'text-info',
    bgColor: 'bg-info/10',
  },
];

const priorityColors = {
  high: 'bg-error text-white',
  medium: 'bg-warning text-white',
  low: 'bg-gray-500 text-white',
};

const typeColors = {
  campaign: 'bg-primary/10 text-primary',
  alert: 'bg-error/10 text-error',
  team: 'bg-info/10 text-info',
  system: 'bg-gray-100 text-gray-700',
  email: 'bg-secondary/10 text-secondary',
};

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [readFilter, setReadFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || notification.type === typeFilter;
    const matchesPriority = priorityFilter === 'all' || notification.priority === priorityFilter;
    const matchesRead = readFilter === 'all' || 
                       (readFilter === 'unread' && !notification.read) ||
                       (readFilter === 'read' && notification.read);
    return matchesSearch && matchesType && matchesPriority && matchesRead;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.read).length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedNotifications(filteredNotifications.map(n => n.id));
    } else {
      setSelectedNotifications([]);
    }
  };

  const handleSelectNotification = (notificationId: number, checked: boolean) => {
    if (checked) {
      setSelectedNotifications([...selectedNotifications, notificationId]);
    } else {
      setSelectedNotifications(selectedNotifications.filter(id => id !== notificationId));
    }
  };

  const handleMarkAsRead = (ids: number[]) => {
    // Handle mark as read logic here
    console.log('Marking as read:', ids);
  };

  const handleMarkAsUnread = (ids: number[]) => {
    // Handle mark as unread logic here
    console.log('Marking as unread:', ids);
  };

  const handleDelete = (ids: number[]) => {
    // Handle delete logic here
    console.log('Deleting:', ids);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="mt-1 text-sm text-gray-600">
              Stay updated with your marketing campaigns and system alerts
            </p>
          </div>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Notification Settings
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Bell className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Mail className="h-8 w-8 text-secondary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Unread</p>
                  <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-error" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">High Priority</p>
                  <p className="text-2xl font-bold text-gray-900">{highPriorityCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-success" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {notifications.filter(n => {
                      const notifDate = new Date(n.timestamp);
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return notifDate > weekAgo;
                    }).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search notifications..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="campaign">Campaign</SelectItem>
                  <SelectItem value="alert">Alert</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={readFilter} onValueChange={setReadFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedNotifications.length > 0 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-800">
                    {selectedNotifications.length} notification(s) selected
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleMarkAsRead(selectedNotifications)}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Mark as Read
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleMarkAsUnread(selectedNotifications)}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Mark as Unread
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600"
                      onClick={() => handleDelete(selectedNotifications)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {filteredNotifications.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    checked={selectedNotifications.length === filteredNotifications.length && filteredNotifications.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                  <span className="text-sm text-gray-600">
                    Select all ({filteredNotifications.length})
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <CheckCheck className="mr-2 h-4 w-4" />
                    Mark All as Read
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear All
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <Card 
                key={notification.id} 
                className={`transition-all duration-200 hover:shadow-md ${
                  !notification.read ? 'border-l-4 border-l-primary bg-blue-50/30' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Checkbox
                      checked={selectedNotifications.includes(notification.id)}
                      onCheckedChange={(checked) => handleSelectNotification(notification.id, checked as boolean)}
                    />
                    
                    <div className={`p-2 rounded-lg ${notification.bgColor}`}>
                      <Icon className={`h-5 w-5 ${notification.color}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={priorityColors[notification.priority as keyof typeof priorityColors]}>
                            {notification.priority}
                          </Badge>
                          <Badge className={typeColors[notification.type as keyof typeof typeColors]}>
                            {notification.type}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className={`text-sm mb-2 ${!notification.read ? 'text-gray-700' : 'text-gray-600'}`}>
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{notification.timestamp}</span>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {notification.read ? (
                              <DropdownMenuItem onClick={() => handleMarkAsUnread([notification.id])}>
                                <Mail className="mr-2 h-4 w-4" />
                                Mark as Unread
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => handleMarkAsRead([notification.id])}>
                                <Check className="mr-2 h-4 w-4" />
                                Mark as Read
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => handleDelete([notification.id])}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredNotifications.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
              <p className="text-sm text-gray-500">
                {searchTerm || typeFilter !== 'all' || priorityFilter !== 'all' || readFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'You\'re all caught up! New notifications will appear here.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}