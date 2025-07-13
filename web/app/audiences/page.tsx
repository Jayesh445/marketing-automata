'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Users, 
  Eye,
  Edit,
  MoreHorizontal,
  TrendingUp,
  Mail,
  MapPin
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
import Link from 'next/link';

const audiences = [
  {
    id: 1,
    name: 'Tech Professionals',
    description: 'Software developers and IT professionals',
    contacts: 2450,
    tags: ['Technology', 'B2B', 'High-Value'],
    lastUpdated: '2024-01-15',
    engagement: 78,
    location: 'Global',
    source: 'LinkedIn Import',
  },
  {
    id: 2,
    name: 'Marketing Managers',
    description: 'Marketing professionals and decision makers',
    contacts: 1820,
    tags: ['Marketing', 'B2B', 'Decision Makers'],
    lastUpdated: '2024-01-20',
    engagement: 85,
    location: 'North America',
    source: 'Manual Upload',
  },
  {
    id: 3,
    name: 'E-commerce Customers',
    description: 'Previous customers from online store',
    contacts: 5670,
    tags: ['E-commerce', 'B2C', 'Customers'],
    lastUpdated: '2024-02-01',
    engagement: 62,
    location: 'United States',
    source: 'Shopify Integration',
  },
  {
    id: 4,
    name: 'Newsletter Subscribers',
    description: 'Email newsletter subscribers',
    contacts: 8920,
    tags: ['Newsletter', 'Engaged', 'Mixed'],
    lastUpdated: '2024-02-10',
    engagement: 71,
    location: 'Global',
    source: 'Website Signup',
  },
];

const tagColors = {
  'Technology': 'bg-blue-100 text-blue-800',
  'Marketing': 'bg-green-100 text-green-800',
  'E-commerce': 'bg-purple-100 text-purple-800',
  'Newsletter': 'bg-orange-100 text-orange-800',
  'B2B': 'bg-gray-100 text-gray-800',
  'B2C': 'bg-pink-100 text-pink-800',
  'High-Value': 'bg-yellow-100 text-yellow-800',
  'Decision Makers': 'bg-indigo-100 text-indigo-800',
  'Customers': 'bg-emerald-100 text-emerald-800',
  'Engaged': 'bg-teal-100 text-teal-800',
  'Mixed': 'bg-slate-100 text-slate-800',
};

export default function AudiencesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterTag, setFilterTag] = useState('all');

  const filteredAudiences = audiences.filter(audience => {
    const matchesSearch = audience.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audience.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = filterTag === 'all' || audience.tags.includes(filterTag);
    return matchesSearch && matchesTag;
  });

  const sortedAudiences = [...filteredAudiences].sort((a, b) => {
    switch (sortBy) {
      case 'contacts':
        return b.contacts - a.contacts;
      case 'engagement':
        return b.engagement - a.engagement;
      case 'updated':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const totalContacts = audiences.reduce((sum, audience) => sum + audience.contacts, 0);
  const avgEngagement = Math.round(audiences.reduce((sum, audience) => sum + audience.engagement, 0) / audiences.length);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Audiences</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage your contact lists and audience segments
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import CSV
            </Button>
            <Link href="/audiences/new">
              <Button className="bg-primary hover:bg-primary-hover">
                <Plus className="mr-2 h-4 w-4" />
                New Audience
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Audiences</p>
                  <p className="text-2xl font-bold text-gray-900">{audiences.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Mail className="h-8 w-8 text-secondary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                  <p className="text-2xl font-bold text-gray-900">{totalContacts.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-success" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Engagement</p>
                  <p className="text-2xl font-bold text-gray-900">{avgEngagement}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-info" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Regions</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
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
                  placeholder="Search audiences..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="contacts">Contacts</SelectItem>
                  <SelectItem value="engagement">Engagement</SelectItem>
                  <SelectItem value="updated">Last Updated</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterTag} onValueChange={setFilterTag}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                  <SelectItem value="B2B">B2B</SelectItem>
                  <SelectItem value="B2C">B2C</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Audience Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedAudiences.map((audience) => (
            <Card key={audience.id} className="hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{audience.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{audience.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {audience.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary"
                          className={tagColors[tag as keyof typeof tagColors] || 'bg-gray-100 text-gray-800'}
                        >
                          {tag}
                        </Badge>
                      ))}
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
                        Edit Audience
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete Audience
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-600">Contacts</div>
                    <div className="text-xl font-semibold">{audience.contacts.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Engagement</div>
                    <div className="text-xl font-semibold text-success">{audience.engagement}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Location</div>
                    <div className="text-sm font-medium">{audience.location}</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Engagement Rate</span>
                    <span>{audience.engagement}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-success h-2 rounded-full transition-all duration-300"
                      style={{ width: `${audience.engagement}%` }}
                    ></div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Source: {audience.source}</span>
                  <span>Updated: {new Date(audience.lastUpdated).toLocaleDateString()}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-2 mt-4">
                  <Link href={`/audiences/${audience.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedAudiences.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No audiences found</h3>
              <p className="text-sm text-gray-500 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Link href="/audiences/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Audience
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}