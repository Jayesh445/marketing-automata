'use client';

import { motion } from 'framer-motion';
import { 
  Zap, 
  Target, 
  BarChart3, 
  Users, 
  Mail, 
  Smartphone,
  Brain,
  Shield
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Content Generation',
    description: 'Generate compelling captions, headlines, and email content using advanced AI models.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Target,
    title: 'Multi-Platform Campaigns',
    description: 'Deploy campaigns across Twitter, LinkedIn, Instagram, YouTube, WhatsApp, and Email.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Track performance with live metrics, CTR analysis, and interactive dashboards.',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Manage team roles, invite users, and collaborate on campaigns seamlessly.',
    color: 'text-info',
    bgColor: 'bg-info/10',
  },
  {
    icon: Zap,
    title: 'A/B Testing',
    description: 'Optimize campaigns with built-in A/B testing and performance comparison.',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
  {
    icon: Mail,
    title: 'Smart Automation',
    description: 'Automate follow-ups, scheduling, and audience segmentation with intelligent rules.',
    color: 'text-error',
    bgColor: 'bg-error/10',
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimized',
    description: 'Manage campaigns on-the-go with our responsive mobile interface.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security with SOC 2 compliance and advanced data protection.',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to scale your marketing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From AI-powered content creation to real-time analytics, our platform provides 
              all the tools you need to create, manage, and optimize successful marketing campaigns.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 shadow-xs border border-gray-100 hover:shadow-md transition-shadow duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 ${feature.bgColor} rounded-lg mb-4`}>
                  <Icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}