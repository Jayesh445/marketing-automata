'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Search, Settings, Check, AlertCircle, ExternalLink, Zap, Shield, RefreshCw as Refresh } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const integrations = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description: 'Connect your LinkedIn account for professional networking campaigns',
    icon: '💼',
    category: 'Social Media',
    status: 'connected',
    lastSync: '2024-02-15 10:30 AM',
    features: ['Post scheduling', 'Lead generation', 'Analytics'],
    setupComplexity: 'Easy',
  },
  {
    id: 'twitter',
    name: 'Twitter',
    description: 'Manage Twitter campaigns and engage with your audience',
    icon: '🐦',
    category: 'Social Media',
    status: 'connected',
    lastSync: '2024-02-15 09:45 AM',
    features: ['Tweet scheduling', 'Hashtag tracking', 'Engagement metrics'],
    setupComplexity: 'Easy',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Share visual content and stories on Instagram',
    icon: '📸',
    category: 'Social Media',
    status: 'error',
    lastSync: '2024-02-14 3:20 PM',
    features: ['Photo/video posting', 'Stories', 'Insights'],
    setupComplexity: 'Medium',
    error: 'Authentication expired',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    description: 'Upload and promote video content on YouTube',
    icon: '📺',
    category: 'Video',
    status: 'available',
    features: ['Video upload', 'Channel management', 'Analytics'],
    setupComplexity: 'Medium',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    description: 'Send direct messages and manage customer communications',
    icon: '💬',
    category: 'Messaging',
    status: 'available',
    features: ['Direct messaging', 'Broadcast lists', 'Templates'],
    setupComplexity: 'Hard',
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Sync email lists and automate email campaigns',
    icon: '📧',
    category: 'Email',
    status: 'connected',
    lastSync: '2024-02-15 11:15 AM',
    features: ['List sync', 'Campaign automation', 'Analytics'],
    setupComplexity: 'Easy',
  },
  {
    id: 'shopify',
    name: 'Shopify',
    description: 'Connect your e-commerce store for customer data and sales tracking',
    icon: '🛒',
    category: 'E-commerce',
    status: 'available',
    features: ['Customer sync', 'Order tracking', 'Product promotion'],
    setupComplexity: 'Medium',
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Integrate with your CRM for lead management and tracking',
    icon: '🎯',
    category: 'CRM',
    status: 'available',
    features: ['Contact sync', 'Lead scoring', 'Pipeline tracking'],
    setupComplexity: 'Hard',
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    description: 'Manage and optimize your Google advertising campaigns',
    icon: '🔍',
    category: 'Advertising',
    status: 'available',
    features: ['Campaign management', 'Keyword tracking', 'Performance data'],
    setupComplexity: 'Hard',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    description: 'Create and manage Facebook posts and advertising campaigns',
    icon: '📘',
    category: 'Social Media',
    status: 'available',
    features: ['Post scheduling', 'Ad management', 'Audience insights'],
    setupComplexity: 'Medium',
  },
];

const categories = ['All', 'Social Media', 'Email', 'CRM', 'E-commerce', 'Advertising', 'Video', 'Messaging'];

const statusColors = {
  connected: 'bg-success text-white',
  available: 'bg-gray-500 text-white',
  error: 'bg-error text-white',
};

const complexityColors = {
  Easy: 'bg-success/10 text-success',
  Medium: 'bg-warning/10 text-warning',
  Hard: 'bg-error/10 text-error',
};

export default function IntegrationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const connectedCount = integrations.filter(i => i.status === 'connected').length;
  const errorCount = integrations.filter(i => i.status === 'error').length;

  const handleConnect = (integration: any) => {
    // Handle connection logic here
    console.log('Connecting to:', integration.name);
  };

  const handleDisconnect = (integration: any) => {
    // Handle disconnection logic here
    console.log('Disconnecting from:', integration.name);
  };

  const handleRefresh = (integration: any) => {
    // Handle refresh logic here
    console.log('Refreshing:', integration.name);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
          <p className="mt-1 text-sm text-gray-600">
            Connect your favorite tools and platforms to streamline your marketing workflow
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Check className="h-8 w-8 text-success" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Connected</p>
                  <p className="text-2xl font-bold text-gray-900">{connectedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Zap className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Available</p>
                  <p className="text-2xl font-bold text-gray-900">{integrations.length - connectedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-error" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Need Attention</p>
                  <p className="text-2xl font-bold text-gray-900">{errorCount}</p>
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
                  placeholder="Search integrations..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => (
            <Card key={integration.id} className="hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{integration.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {integration.category}
                      </Badge>
                    </div>
                  </div>
                  <Badge className={statusColors[integration.status as keyof typeof statusColors]}>
                    {integration.status === 'connected' ? 'Connected' : 
                     integration.status === 'error' ? 'Error' : 'Available'}
                  </Badge>
                </div>

                <p className="text-sm text-gray-600 mb-4">{integration.description}</p>

                {integration.status === 'error' && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                      <span className="text-sm text-red-800">{integration.error}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Setup Complexity</span>
                    <Badge className={complexityColors[integration.setupComplexity as keyof typeof complexityColors]}>
                      {integration.setupComplexity}
                    </Badge>
                  </div>
                  
                  {integration.lastSync && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Sync</span>
                      <span className="text-sm text-gray-900">{integration.lastSync}</span>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Features</h4>
                  <div className="flex flex-wrap gap-1">
                    {integration.features.slice(0, 2).map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {integration.features.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{integration.features.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {integration.status === 'connected' ? (
                    <>
                      <Button variant="outline" size="sm" onClick={() => handleRefresh(integration)}>
                        <Refresh className="mr-2 h-4 w-4" />
                        Refresh
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{integration.name} Settings</DialogTitle>
                            <DialogDescription>
                              Configure your {integration.name} integration settings
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>API Key</Label>
                              <Input placeholder="Enter your API key" />
                            </div>
                            <div>
                              <Label>Sync Frequency</Label>
                              <select className="w-full p-2 border rounded">
                                <option>Every 15 minutes</option>
                                <option>Every hour</option>
                                <option>Every 6 hours</option>
                                <option>Daily</option>
                              </select>
                            </div>
                            <div className="flex justify-between">
                              <Button variant="outline" onClick={() => handleDisconnect(integration)}>
                                Disconnect
                              </Button>
                              <Button>Save Settings</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </>
                  ) : integration.status === 'error' ? (
                    <Button size="sm" onClick={() => handleConnect(integration)}>
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Reconnect
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => handleConnect(integration)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredIntegrations.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No integrations found</h3>
              <p className="text-sm text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Security & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Data Security</h4>
                <p className="text-sm text-gray-600 mb-3">
                  All integrations use secure OAuth 2.0 authentication and encrypted data transmission.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• End-to-end encryption</li>
                  <li>• Regular security audits</li>
                  <li>• SOC 2 Type II compliance</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Data Usage</h4>
                <p className="text-sm text-gray-600 mb-3">
                  We only access the data necessary for your marketing campaigns and analytics.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Minimal data access</li>
                  <li>• No data selling to third parties</li>
                  <li>• Full data portability</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}