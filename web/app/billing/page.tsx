'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CreditCard, 
  Download, 
  Calendar, 
  TrendingUp,
  Users,
  Mail,
  Zap,
  Check,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const currentPlan = {
  name: 'Professional',
  price: 99,
  period: 'month',
  features: [
    'Unlimited campaigns',
    '10,000 contacts',
    'All platforms including WhatsApp',
    'Advanced analytics & A/B testing',
    'AI content generation',
    'Priority support',
    'Team collaboration',
  ],
  usage: {
    campaigns: { used: 18, limit: 'unlimited' },
    contacts: { used: 7420, limit: 10000 },
    emails: { used: 45230, limit: 100000 },
    aiGenerations: { used: 156, limit: 500 },
  },
  nextBilling: '2024-03-15',
  status: 'active',
};

const plans = [
  {
    name: 'Starter',
    price: 29,
    period: '/month',
    description: 'Perfect for small teams getting started',
    features: [
      'Up to 5 campaigns',
      '1,000 contacts',
      'Email & social media platforms',
      'Basic analytics',
      'Email support',
    ],
    popular: false,
  },
  {
    name: 'Professional',
    price: 99,
    period: '/month',
    description: 'Ideal for growing businesses',
    features: [
      'Unlimited campaigns',
      '10,000 contacts',
      'All platforms including WhatsApp',
      'Advanced analytics & A/B testing',
      'AI content generation',
      'Priority support',
      'Team collaboration',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations',
    features: [
      'Everything in Professional',
      'Unlimited contacts',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantee',
      'Advanced security features',
    ],
    popular: false,
  },
];

const invoices = [
  {
    id: 'INV-2024-002',
    date: '2024-02-15',
    amount: 99.00,
    status: 'paid',
    plan: 'Professional',
    period: 'Feb 15 - Mar 15, 2024',
  },
  {
    id: 'INV-2024-001',
    date: '2024-01-15',
    amount: 99.00,
    status: 'paid',
    plan: 'Professional',
    period: 'Jan 15 - Feb 15, 2024',
  },
  {
    id: 'INV-2023-012',
    date: '2023-12-15',
    amount: 99.00,
    status: 'paid',
    plan: 'Professional',
    period: 'Dec 15, 2023 - Jan 15, 2024',
  },
  {
    id: 'INV-2023-011',
    date: '2023-11-15',
    amount: 99.00,
    status: 'paid',
    plan: 'Professional',
    period: 'Nov 15 - Dec 15, 2023',
  },
];

const paymentMethods = [
  {
    id: 1,
    type: 'card',
    brand: 'Visa',
    last4: '4242',
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true,
  },
  {
    id: 2,
    type: 'card',
    brand: 'Mastercard',
    last4: '8888',
    expiryMonth: 8,
    expiryYear: 2026,
    isDefault: false,
  },
];

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState('Professional');

  const getUsagePercentage = (used: number, limit: number | string) => {
    if (limit === 'unlimited') return 0;
    return Math.round((used / (limit as number)) * 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-error';
    if (percentage >= 75) return 'text-warning';
    return 'text-success';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing & Usage</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your subscription, usage, and billing information
          </p>
        </div>

        {/* Current Plan */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                Current Plan
              </CardTitle>
              <Badge className="bg-success text-white">
                {currentPlan.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="flex items-baseline space-x-2 mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{currentPlan.name}</h3>
                  <span className="text-3xl font-bold text-primary">${currentPlan.price}</span>
                  <span className="text-gray-600">/{currentPlan.period}</span>
                </div>
                
                <div className="space-y-2 mb-6">
                  {currentPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-success mr-2" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Next billing: {new Date(currentPlan.nextBilling).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Usage This Month</h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Contacts</span>
                      <span className={getUsageColor(getUsagePercentage(currentPlan.usage.contacts.used, currentPlan.usage.contacts.limit))}>
                        {currentPlan.usage.contacts.used.toLocaleString()} / {currentPlan.usage.contacts.limit.toLocaleString()}
                      </span>
                    </div>
                    <Progress 
                      value={getUsagePercentage(currentPlan.usage.contacts.used, currentPlan.usage.contacts.limit)} 
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Emails Sent</span>
                      <span className={getUsageColor(getUsagePercentage(currentPlan.usage.emails.used, currentPlan.usage.emails.limit))}>
                        {currentPlan.usage.emails.used.toLocaleString()} / {currentPlan.usage.emails.limit.toLocaleString()}
                      </span>
                    </div>
                    <Progress 
                      value={getUsagePercentage(currentPlan.usage.emails.used, currentPlan.usage.emails.limit)} 
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>AI Generations</span>
                      <span className={getUsageColor(getUsagePercentage(currentPlan.usage.aiGenerations.used, currentPlan.usage.aiGenerations.limit))}>
                        {currentPlan.usage.aiGenerations.used} / {currentPlan.usage.aiGenerations.limit}
                      </span>
                    </div>
                    <Progress 
                      value={getUsagePercentage(currentPlan.usage.aiGenerations.used, currentPlan.usage.aiGenerations.limit)} 
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Active Campaigns</span>
                      <span className="text-success">
                        {currentPlan.usage.campaigns.used} / {currentPlan.usage.campaigns.limit}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-info" />
                <span className="text-sm text-gray-600">
                  Your plan renews automatically on {new Date(currentPlan.nextBilling).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline">
                  Cancel Subscription
                </Button>
                <Button>
                  Upgrade Plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Plans */}
        <Card>
          <CardHeader>
            <CardTitle>Available Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan, index) => (
                <div 
                  key={index}
                  className={`relative p-6 border rounded-lg transition-all duration-200 ${
                    plan.popular ? 'border-primary bg-primary/5' : 'border-gray-200'
                  } ${selectedPlan === plan.name ? 'ring-2 ring-primary' : ''}`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white">
                      Most Popular
                    </Badge>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-4 w-4 text-success mr-2 shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${plan.name === currentPlan.name ? 'opacity-50 cursor-not-allowed' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    disabled={plan.name === currentPlan.name}
                  >
                    {plan.name === currentPlan.name ? 'Current Plan' : 
                     plan.name === 'Enterprise' ? 'Contact Sales' : 'Upgrade'}
                    {plan.name !== currentPlan.name && plan.name !== 'Enterprise' && (
                      <ArrowRight className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Payment Methods
              </CardTitle>
              <Button variant="outline">
                Add Payment Method
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{method.brand} •••• {method.last4}</span>
                        {method.isDefault && (
                          <Badge variant="secondary">Default</Badge>
                        )}
                      </div>
                      <span className="text-sm text-gray-600">
                        Expires {method.expiryMonth}/{method.expiryYear}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!method.isDefault && (
                      <Button variant="outline" size="sm">
                        Set as Default
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Billing History</CardTitle>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.i}</TableCell>
                    <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                    <TableCell>{invoice.plan}</TableCell>
                    <TableCell className="text-sm text-gray-600">{invoice.period}</TableCell>
                    <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className="bg-success text-white">
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}