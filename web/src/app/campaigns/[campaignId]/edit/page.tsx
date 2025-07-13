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
  Save,
  Copy,
  Trash2,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";
import Link from "next/link";
import { useParams } from "next/navigation";

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

export default function EditCampaignPage() {
  const { campaignId } = useParams<{ campaignId: string }>();
  const [campaignData, setCampaignData] = useState({
    name: "Summer Sale Campaign",
    description: "Promoting our summer sale across multiple channels",
    platforms: ["email", "linkedin", "twitter"],
    audiences: [1, 2],
    content: {
      subject: "Don't Miss Our Summer Sale - Up to 50% Off!",
      message:
        "Get ready for summer with our biggest sale of the year! Enjoy up to 50% off on all products. Limited time offer - shop now before it's too late!",
      cta: "Shop Now",
    },
    schedule: {
      type: "scheduled",
      date: "2024-02-20",
      time: "10:00",
    },
    budget: "2500",
    status: "active",
  });

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

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving campaign:", campaignData);
  };

  const handleDuplicate = () => {
    // Handle duplicate logic here
    console.log("Duplicating campaign:", campaignData);
  };

  const handleDelete = () => {
    // Handle delete logic here
    console.log("Deleting campaign:", campaignId);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={`/campaigns/${campaignId}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Campaign
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Edit Campaign
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Make changes to your campaign settings and content
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleDuplicate}>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Campaign</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this campaign? This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete Campaign
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Campaign Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5" />
              Campaign Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={campaignData.status}
                onValueChange={(value) =>
                  setCampaignData((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                id="name"
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
              <Label htmlFor="budget">Budget</Label>
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
          </CardContent>
        </Card>

        {/* Platforms */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 h-5 w-5" />
              Platforms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    campaignData.platforms.includes(platform.id)
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handlePlatformToggle(platform.id)}
                >
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Audiences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Target Audiences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {audiences.map((audience) => (
                <div
                  key={audience.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    campaignData.audiences.includes(audience.id)
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleAudienceToggle(audience.id)}
                >
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Campaign Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject Line / Headline</Label>
              <Input
                id="subject"
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
                Improve your content with AI suggestions
              </p>
              <Button variant="outline" size="sm">
                Optimize with AI
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
                  <SelectItem value="scheduled">Schedule for Later</SelectItem>
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
          </CardContent>
        </Card>

        {/* Save Actions */}
        <div className="flex items-center justify-end space-x-4">
          <Link href={`/campaigns/${campaignId}`}>
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary-hover"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
