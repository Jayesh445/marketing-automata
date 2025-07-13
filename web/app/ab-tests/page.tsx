'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  TrendingUp, 
  TrendingDown,
  Play,
  Pause,
  Eye,
  Edit,
  MoreHorizontal,
  TestTube2,
  Target,
  Users,
  BarChart3
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

const abTests = [
  {
    id: 1,
    name: 'Email Subject Line Test',
    description: 'Testing different subject lines for newsletter campaign',
    status: 'running',
    type: 'Email',
    startDate: '2024-02-10',
    endDate: '2024-02-24',
    progress: 65,
    variants: [
      {
        name: 'Variant A (Control)',
        subject: 'Your Weekly Marketing Insights',
        participants: 1250,
        opens: 312,
        clicks: 89,
        conversions: 23,
        openRate: 24.96,
        ctr: 28.53,
        conversionRate: 25.84,
      },
      {
        name: 'Variant B',
        subject: '🚀 Boost Your Marketing ROI This Week',
        participants: 1250,
        opens: 387,
        clicks: 124,
        conversions: 34,
        openRate: 30.96,
        ctr: 32.04,
        conversionRate: 27.42,
      }
    ],
    winner: 'B',
    confidence: 87,
  },
  {
    id: 2,
    name: 'Landing Page CTA Button',
    description: 'Testing button colors and text for conversion optimization',
    status: 'completed',
    type: 'Website',
    startDate: '2024-01-15',
    endDate: '2024-02-05',
    progress: 100,
    variants: [
      {
        name: 'Variant A (Control)',
        subject: 'Blue Button - "Get Started"',
        participants: 2840,
        opens: 2840,
        clicks: 426,
        conversions: 89,
        openRate: 100,
        ctr: 15.0,
        conversionRate: 20.89,
      },
      {
        name: 'Variant B',
        subject: 'Orange Button - "Start Free Trial"',
        participants: 2860,
        opens: 2860,
        clicks: 572,
        conversions: 134,
        openRate: 100,
        ctr: 20.0,
        conversionRate: 23.43,
      }
    ],
    winner: 'B',
    confidence: 95,
  },
  {
    id: 3,
    name: 'Social Media Ad Creative',
    description: 'Testing different ad creatives for LinkedIn campaign',
    status: 'draft',
    type: 'Social Media',
    startDate: '2024-02-20',
    endDate: '2024-03-05',
    progress: 0,
    variants: [
      {
        name: 'Variant A (Control)',
        subject: 'Professional headshot with quote',
        participants: 0,
        opens: 0,
        clicks: 0,
        conversions: 0,
        openRate: 0,
        ctr: 0,
        conversionRate: 0,
      },
      {
        name: 'Variant B',
        subject: 'Product screenshot with benefits',
        participants: 0,
        opens: 0,
        clicks: 0,
        conversions: 0,
        openRate: 0,
        ctr: 0,
        conversionRate: 0,
      }
    ],
    winner: null,
    confidence: 0,
  },
  {
    id: 4,
    name: 'Email Send Time Optimization',
    description: 'Testing optimal send times for maximum engagement',
    status: 'paused',
    type: 'Email',
    startDate: '2024-02-01',
    endDate: '2024-02-28',
    progress: 45,
    variants: [
      {
        name: 'Variant A (Control)',
        subject: 'Tuesday 9:00 AM',
        participants: 890,
        opens: 234,
        clicks: 67,
        conversions: 18,
        openRate: 26.29,
        ctr: 28.63,
        conversionRate: 26.87,
      },
      {
        name: 'Variant B',
        subject: 'Thursday 2:00 PM',
        participants: 910,
        opens: 291,
        clicks: 89,
        conversions: 25,
        openRate: 31.98,
        ctr: 30.58,
        conversionRate: 28.09,
      }
    ],
    winner: null,
    confidence: 72,
  },
];

const statusColors = {
  running: 'bg-success text-white',
  completed: 'bg-primary text-white',
  draft: 'bg-gray-500 text-white',
  paused: 'bg-warning text-white',
};

const typeColors = {
  Email: 'bg-blue-100 text-blue-800',
  Website: 'bg-green-100 text-green-800',
  'Social Media': 'bg-purple-100 text-purple-800',
  SMS: 'bg-orange-100 text-orange-800',
};

export default function ABTestsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredTests = abTests.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || test.status === statusFilter;
    const matchesType = typeFilter === 'all' || test.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const runningTests = abTests.filter(t => t.status === 'running').length;
  const completedTests = abTests.filter(t => t.status === 'completed').length;
  const avgConfidence = Math.round(
    abTests.filter(t => t.confidence > 0).reduce((sum, t) => sum + t.confidence, 0) / 
    abTests.filter(t => t.confidence > 0).length
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">A/B Tests</h1>
            <p className="mt-1 text-sm text-gray-600">
              Create and manage A/B tests to optimize your marketing campaigns
            </p>
          </div>
          <Link href="/ab-tests/new">
            <Button className="bg-primary hover:bg-primary-hover">
              <Plus className="mr-2 h-4 w-4" />
              New A/B Test
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TestTube2 className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Tests</p>
                  <p className="text-2xl font-bold text-gray-900">{abTests.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Play className="h-8 w-8 text-success" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Running</p>
                  <p className="text-2xl font-bold text-gray-900">{runningTests}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-info" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{completedTests}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-secondary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Confidence</p>
                  <p className="text-2xl font-bold text-gray-900">{avgConfidence}%</p>
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
                  placeholder="Search A/B tests..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="Website">Website</SelectItem>
                  <SelectItem value="Social Media">Social Media</SelectItem>
                  <SelectItem value="SMS">SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* A/B Tests List */}
        <div className="space-y-6">
          {filteredTests.map((test) => (
            <Card key={test.id} className="hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{test.name}</h3>
                      <Badge className={statusColors[test.status as keyof typeof statusColors]}>
                        {test.status}
                      </Badge>
                      <Badge className={typeColors[test.type as keyof typeof typeColors]}>
                        {test.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{test.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Start: {new Date(test.startDate).toLocaleDateString()}</span>
                      <span>End: {new Date(test.endDate).toLocaleDateString()}</span>
                      {test.status === 'running' && (
                        <span>Progress: {test.progress}%</span>
                      )}
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Test
                      </DropdownMenuItem>
                      {test.status === 'running' ? (
                        <DropdownMenuItem>
                          <Pause className="mr-2 h-4 w-4" />
                          Pause Test
                        </DropdownMenuItem>
                      ) : test.status === 'paused' ? (
                        <DropdownMenuItem>
                          <Play className="mr-2 h-4 w-4" />
                          Resume Test
                        </DropdownMenuItem>
                      ) : null}
                      <DropdownMenuItem>
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Progress Bar */}
                {test.status === 'running' && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Test Progress</span>
                      <span>{test.progress}%</span>
                    </div>
                    <Progress value={test.progress} className="h-2" />
                  </div>
                )}

                {/* Variants Comparison */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                  {test.variants.map((variant, index) => (
                    <div 
                      key={index} 
                      className={`p-4 border rounded-lg ${
                        test.winner === (index === 0 ? 'A' : 'B') ? 'border-success bg-success/5' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{variant.name}</h4>
                        {test.winner === (index === 0 ? 'A' : 'B') && (
                          <Badge className="bg-success text-white">Winner</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{variant.subject}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Participants:</span>
                          <span className="font-medium ml-1">{variant.participants.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Opens:</span>
                          <span className="font-medium ml-1">{variant.opens.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Clicks:</span>
                          <span className="font-medium ml-1">{variant.clicks.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Conversions:</span>
                          <span className="font-medium ml-1">{variant.conversions.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t border-gray-200">
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">{variant.openRate.toFixed(1)}%</div>
                          <div className="text-xs text-gray-600">Open Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-secondary">{variant.ctr.toFixed(1)}%</div>
                          <div className="text-xs text-gray-600">CTR</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-success">{variant.conversionRate.toFixed(1)}%</div>
                          <div className="text-xs text-gray-600">Conv Rate</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Results Summary */}
                {test.confidence > 0 && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      {test.winner && (
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-success mr-1" />
                          <span className="text-sm font-medium">
                            Variant {test.winner} is winning
                          </span>
                        </div>
                      )}
                      <div className="text-sm text-gray-600">
                        Confidence: <span className="font-medium">{test.confidence}%</span>
                      </div>
                    </div>
                    
                    {test.status === 'completed' && (
                      <Button variant="outline" size="sm">
                        Apply Winner
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTests.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <TestTube2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No A/B tests found</h3>
              <p className="text-sm text-gray-500 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Link href="/ab-tests/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First A/B Test
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}