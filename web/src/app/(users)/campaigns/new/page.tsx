"use client";

import { useState } from "react";
import { DashboardLayout } from "@/src/components/dashboard/DashboardLayout";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  ArrowLeft,
  ArrowRight,
  Save,
  Send,
  Calendar,
  Target,
  MessageSquare,
  Users,
  Zap,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import Link from "next/link";

const platforms = [
  {
    id: "email",
    name: "Email",
    icon: "📧",
    description: "Email marketing campaigns",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "💼",
    description: "Professional networking",
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: "🐦",
    description: "Social media engagement",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "📸",
    description: "Visual content sharing",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "📺",
    description: "Video content promotion",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: "💬",
    description: "Direct messaging",
  },
  {
    id: "reddit",
    name: "Reddit",
    icon: "🔴",
    description: "Community engagement",
  },
];

const audiences = [
  { id: 1, name: "Tech Professionals", contacts: 2450 },
  { id: 2, name: "Marketing Managers", contacts: 1820 },
  { id: 3, name: "E-commerce Customers", contacts: 5670 },
  { id: 4, name: "Newsletter Subscribers", contacts: 8920 },
];

export default function NewCampaignPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: "",
    description: "",
    platforms: [] as string[],
    audiences: [] as number[],
    content: {
      subject: "",
      message: "",
      cta: "",
    },
    schedule: {
      type: "now",
      date: "",
      time: "",
    },
    budget: "",
  });

  const steps = [
    { number: 1, title: "Campaign Details", icon: Target },
    { number: 2, title: "Select Platforms", icon: Zap },
    { number: 3, title: "Choose Audience", icon: Users },
    { number: 4, title: "Create Content", icon: MessageSquare },
    { number: 5, title: "Schedule & Launch", icon: Calendar },
  ];

  const handlePlatformToggle = (platformId: string) => {
    setCampaignData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter((p) => p !== platformId)
        : [...prev.platforms, platformId],
    }));
  };

  const handleAudienceToggle = (audienceId: number) => {
    setCampaignData((prev) => ({
      ...prev,
      audiences: prev.audiences.includes(audienceId)
        ? prev.audiences.filter((a) => a !== audienceId)
        : [...prev.audiences, audienceId],
    }));
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                id="name"
                placeholder="Enter campaign name"
                value={campaignData.name}
                onChange={(e) =>
                  setCampaignData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your campaign goals and target audience"
                value={campaignData.description}
                onChange={(e) =>
                  setCampaignData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="budget">Budget (Optional)</Label>
              <Input
                id="budget"
                placeholder="$1,000"
                value={campaignData.budget}
                onChange={(e) =>
                  setCampaignData((prev) => ({
                    ...prev,
                    budget: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Select Platforms</h3>
              <p className="text-sm text-gray-600 mb-6">
                Choose the platforms where you want to run your campaign
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {platforms.map((platform) => (
                <Card
                  key={platform.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    campaignData.platforms.includes(platform.id)
                      ? "border-primary bg-primary/5"
                      : "hover:border-gray-300"
                  }`}
                  onClick={() => handlePlatformToggle(platform.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{platform.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-medium">{platform.name}</h4>
                        <p className="text-sm text-gray-600">
                          {platform.description}
                        </p>
                      </div>
                      <Checkbox
                        checked={campaignData.platforms.includes(platform.id)}
                        onChange={() => handlePlatformToggle(platform.id)}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Choose Audience</h3>
              <p className="text-sm text-gray-600 mb-6">
                Select the audiences you want to target with this campaign
              </p>
            </div>
            <div className="space-y-4">
              {audiences.map((audience) => (
                <Card
                  key={audience.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    campaignData.audiences.includes(audience.id)
                      ? "border-primary bg-primary/5"
                      : "hover:border-gray-300"
                  }`}
                  onClick={() => handleAudienceToggle(audience.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={campaignData.audiences.includes(audience.id)}
                          onChange={() => handleAudienceToggle(audience.id)}
                        />
                        <div>
                          <h4 className="font-medium">{audience.name}</h4>
                          <p className="text-sm text-gray-600">
                            {audience.contacts.toLocaleString()} contacts
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {audience.contacts.toLocaleString()}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Create Content</h3>
              <p className="text-sm text-gray-600 mb-6">
                Craft your campaign message and call-to-action
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject Line / Headline</Label>
                <Input
                  id="subject"
                  placeholder="Enter compelling subject line"
                  value={campaignData.content.subject}
                  onChange={(e) =>
                    setCampaignData((prev) => ({
                      ...prev,
                      content: { ...prev.content, subject: e.target.value },
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="message">Message Content</Label>
                <Textarea
                  id="message"
                  placeholder="Write your campaign message..."
                  rows={6}
                  value={campaignData.content.message}
                  onChange={(e) =>
                    setCampaignData((prev) => ({
                      ...prev,
                      content: { ...prev.content, message: e.target.value },
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="cta">Call to Action</Label>
                <Input
                  id="cta"
                  placeholder="Learn More, Sign Up, Get Started..."
                  value={campaignData.content.cta}
                  onChange={(e) =>
                    setCampaignData((prev) => ({
                      ...prev,
                      content: { ...prev.content, cta: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    AI Assistant
                  </span>
                </div>
                <p className="text-sm text-blue-700 mb-3">
                  Let AI help you create compelling content for your campaign
                </p>
                <Button variant="outline" size="sm">
                  Generate with AI
                </Button>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Schedule & Launch</h3>
              <p className="text-sm text-gray-600 mb-6">
                Choose when to send your campaign
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Schedule Type</Label>
                <Select
                  value={campaignData.schedule.type}
                  onValueChange={(value) =>
                    setCampaignData((prev) => ({
                      ...prev,
                      schedule: { ...prev.schedule, type: value },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="now">Send Now</SelectItem>
                    <SelectItem value="scheduled">
                      Schedule for Later
                    </SelectItem>
                    <SelectItem value="draft">Save as Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {campaignData.schedule.type === "scheduled" && (
                <>
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={campaignData.schedule.date}
                      onChange={(e) =>
                        setCampaignData((prev) => ({
                          ...prev,
                          schedule: { ...prev.schedule, date: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={campaignData.schedule.time}
                      onChange={(e) =>
                        setCampaignData((prev) => ({
                          ...prev,
                          schedule: { ...prev.schedule, time: e.target.value },
                        }))
                      }
                    />
                  </div>
                </>
              )}
            </div>

            {/* Campaign Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Campaign Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="font-medium">Name:</span>{" "}
                  {campaignData.name || "Untitled Campaign"}
                </div>
                <div>
                  <span className="font-medium">Platforms:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {campaignData.platforms.map((platformId) => {
                      const platform = platforms.find(
                        (p) => p.id === platformId
                      );
                      return platform ? (
                        <Badge key={platformId} variant="secondary">
                          {platform.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
                <div>
                  <span className="font-medium">Audiences:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {campaignData.audiences.map((audienceId) => {
                      const audience = audiences.find(
                        (a) => a.id === audienceId
                      );
                      return audience ? (
                        <Badge key={audienceId} variant="secondary">
                          {audience.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
                <div>
                  <span className="font-medium">Total Reach:</span>{" "}
                  {campaignData.audiences
                    .reduce((total, audienceId) => {
                      const audience = audiences.find(
                        (a) => a.id === audienceId
                      );
                      return total + (audience?.contacts || 0);
                    }, 0)
                    .toLocaleString()}{" "}
                  contacts
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/campaigns">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Campaigns
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Create New Campaign
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Step {currentStep} of {steps.length}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;

                return (
                  <div key={step.number} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        isActive
                          ? "border-primary bg-primary text-white"
                          : isCompleted
                          ? "border-success bg-success text-white"
                          : "border-gray-300 text-gray-500"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <div
                        className={`text-sm font-medium ${
                          isActive
                            ? "text-primary"
                            : isCompleted
                            ? "text-success"
                            : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-16 h-0.5 mx-4 ${
                          isCompleted ? "bg-success" : "bg-gray-300"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card>
          <CardContent className="p-6">{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>

            {currentStep === 5 ? (
              <Button className="bg-primary hover:bg-primary-hover">
                {campaignData.schedule.type === "now" ? (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Launch Campaign
                  </>
                ) : (
                  <>
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Campaign
                  </>
                )}
              </Button>
            ) : (
              <Button onClick={nextStep}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
