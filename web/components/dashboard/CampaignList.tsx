'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, MoreHorizontal, TrendingUp } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

const campaigns = [
  {
    id: 1,
    name: 'Summer Sale Campaign',
    status: 'active',
    platform: 'Multi-platform',
    performance: { impressions: 15420, ctr: 8.2, conversions: 145 },
    budget: '$2,500',
    spent: '$1,890',
  },
  {
    id: 2,
    name: 'Product Launch Email Series',
    status: 'scheduled',
    platform: 'Email',
    performance: { impressions: 0, ctr: 0, conversions: 0 },
    budget: '$1,200',
    spent: '$0',
  },
  {
    id: 3,
    name: 'LinkedIn B2B Outreach',
    status: 'completed',
    platform: 'LinkedIn',
    performance: { impressions: 8930, ctr: 12.5, conversions: 89 },
    budget: '$3,000',
    spent: '$2,950',
  },
  {
    id: 4,
    name: 'Instagram Stories Campaign',
    status: 'active',
    platform: 'Instagram',
    performance: { impressions: 22100, ctr: 6.8, conversions: 201 },
    budget: '$1,800',
    spent: '$1,245',
  },
];

export function CampaignList() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Campaigns</CardTitle>
          <Link href="/campaigns">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                  <Badge variant={
                    campaign.status === 'active' ? 'default' :
                    campaign.status === 'scheduled' ? 'secondary' :
                    'outline'
                  }>
                    {campaign.status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{campaign.platform}</span>
                  <span>•</span>
                  <span>{campaign.performance.impressions.toLocaleString()} impressions</span>
                  <span>•</span>
                  <span>{campaign.performance.ctr}% CTR</span>
                  <span>•</span>
                  <span>{campaign.performance.conversions} conversions</span>
                </div>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-gray-600">Budget: {campaign.budget}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-600">Spent: {campaign.spent}</span>
                  <TrendingUp className="h-4 w-4 text-success ml-2" />
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Link href={`/campaigns/${campaign.id}`}>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Campaign
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}