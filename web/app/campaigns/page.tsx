'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Eye, Edit, Play, Pause, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';

const campaigns = [
  {
    id: 1,
    name: 'Summer Sale Campaign',
    status: 'active',
    platforms: ['Email', 'LinkedIn', 'Twitter'],
    performance: { impressions: 15420, ctr: 8.2, conversions: 145 },
    budget: 2500,
    spent: 1890,
    startDate: '2024-01-15',
    endDate: '2024-02-15',
  },
  {
    id: 2,
    name: 'Product Launch Email Series',
    status: 'scheduled',
    platforms: ['Email'],
    performance: { impressions: 0, ctr: 0, conversions: 0 },
    budget: 1200,
    spent: 0,
    startDate: '2024-02-01',
    endDate: '2024-02-28',
  },
  {
    id: 3,
    name: 'LinkedIn B2B Outreach',
    status: 'completed',
    platforms: ['LinkedIn'],
    performance: { impressions: 8930, ctr: 12.5, conversions: 89 },
    budget: 3000,
    spent: 2950,
    startDate: '2024-01-01',
    endDate: '2024-01-31',
  },
  {
    id: 4,
    name: 'Instagram Stories Campaign',
    status: 'active',
    platforms: ['Instagram'],
    performance: { impressions: 22100, ctr: 6.8, conversions: 201 },
    budget: 1800,
    spent: 1245,
    startDate: '2024-01-20',
    endDate: '2024-02-20',
  },
  {
    id: 5,
    name: 'YouTube Video Promotion',
    status: 'paused',
    platforms: ['YouTube'],
    performance: { impressions: 45600, ctr: 4.2, conversions: 78 },
    budget: 5000,
    spent: 3200,
    startDate: '2024-01-10',
    endDate: '2024-03-10',
  },
];

const statusColors = {
  active: 'bg-success text-white',
  scheduled: 'bg-info text-white',
  completed: 'bg-gray-500 text-white',
  paused: 'bg-warning text-white',
  draft: 'bg-gray-300 text-gray-700',
};

export default function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    const matchesPlatform = platformFilter === 'all' || campaign.platforms.includes(platformFilter);
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage and monitor your marketing campaigns across all platforms
            </p>
          </div>
          <Link href="/campaigns/new">
            <Button className="bg-primary hover:bg-primary-hover">
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search campaigns..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>

              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="Twitter">Twitter</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="YouTube">YouTube</SelectItem>
                  <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredCampaigns.map((campaign) => (
            <Card key={campaign.id} className="hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                      <Badge className={statusColors[campaign.status as keyof typeof statusColors]}>
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {campaign.platforms.map((platform) => (
                        <Badge key={platform} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">
                      {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
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
                        Edit Campaign
                      </DropdownMenuItem>
                      {campaign.status === 'active' ? (
                        <DropdownMenuItem>
                          <Pause className="mr-2 h-4 w-4" />
                          Pause Campaign
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem>
                          <Play className="mr-2 h-4 w-4" />
                          Resume Campaign
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                  <div>
                    <div className="text-sm text-gray-600">Impressions</div>
                    <div className="text-xl font-semibold">{campaign.performance.impressions.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">CTR</div>
                    <div className="text-xl font-semibold">{campaign.performance.ctr}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Conversions</div>
                    <div className="text-xl font-semibold">{campaign.performance.conversions}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Budget</div>
                    <div className="text-xl font-semibold">${campaign.budget.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Spent</div>
                    <div className="text-xl font-semibold text-primary">${campaign.spent.toLocaleString()}</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Budget Usage</span>
                    <span>{Math.round((campaign.spent / campaign.budget) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-2 mt-4">
                  <Link href={`/campaigns/${campaign.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </Link>
                  <Link href={`/campaigns/${campaign.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-500">
                <h3 className="text-lg font-medium mb-2">No campaigns found</h3>
                <p className="text-sm">Try adjusting your search or filter criteria</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}