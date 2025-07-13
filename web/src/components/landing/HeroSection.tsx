"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { ArrowRight, Play, Zap, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="pt-16 pb-20 sm:pt-24 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              AI-Powered Marketing
              <span className="text-primary block">Automation Platform</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your marketing strategy with intelligent automation,
              real-time analytics, and multi-platform campaign management. Boost
              your ROI by up to 300%.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-hover text-white px-8 py-3"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-3">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">300%</div>
              <div className="text-gray-600">Average ROI Increase</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg mb-4">
                <Target className="h-6 w-6 text-secondary" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">85%</div>
              <div className="text-gray-600">Time Saved on Campaigns</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-success/10 rounded-lg mb-4">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
          </motion.div>

          {/* Hero Image/Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative"
          >
            <div className="bg-linear-to-r from-primary to-primary-hover rounded-lg p-8 shadow-2xl">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Campaign Dashboard
                  </h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="metric-card">
                    <div className="text-2xl font-bold text-primary">1.2M</div>
                    <div className="text-sm text-gray-600">Impressions</div>
                  </div>
                  <div className="metric-card">
                    <div className="text-2xl font-bold text-success">45.3%</div>
                    <div className="text-sm text-gray-600">CTR</div>
                  </div>
                  <div className="metric-card">
                    <div className="text-2xl font-bold text-secondary">
                      $12.4K
                    </div>
                    <div className="text-sm text-gray-600">Revenue</div>
                  </div>
                  <div className="metric-card">
                    <div className="text-2xl font-bold text-info">89%</div>
                    <div className="text-sm text-gray-600">Conversion</div>
                  </div>
                </div>
                <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-gray-500">Real-time Analytics Chart</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
