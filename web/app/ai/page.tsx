'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Copy, 
  Save, 
  RefreshCw, 
  Sparkles, 
  MessageSquare,
  Mail,
  Lightbulb,
  Target,
  Wand2,
  Download
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const contentTypes = [
  { id: 'caption', name: 'Social Media Caption', icon: MessageSquare },
  { id: 'headline', name: 'Headlines', icon: Sparkles },
  { id: 'email', name: 'Email Content', icon: Mail },
  { id: 'campaign', name: 'Campaign Ideas', icon: Lightbulb },
];

const tones = [
  'Professional', 'Casual', 'Friendly', 'Urgent', 'Exciting', 'Informative'
];

const platforms = [
  'LinkedIn', 'Twitter', 'Instagram', 'Facebook', 'Email', 'YouTube'
];

export default function AIToolsPage() {
  const [selectedType, setSelectedType] = useState('caption');
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('Professional');
  const [platform, setPlatform] = useState('LinkedIn');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [savedContent, setSavedContent] = useState<Array<{
    id: number;
    type: string;
    content: string;
    timestamp: string;
  }>>([
    {
      id: 1,
      type: 'caption',
      content: '🚀 Exciting news! Our new AI-powered marketing platform is here to revolutionize your campaigns. Get ready to boost your ROI by 300%! #MarketingAI #Innovation',
      timestamp: '2024-02-15 10:30 AM'
    },
    {
      id: 2,
      type: 'headline',
      content: 'Transform Your Marketing with AI: Boost ROI by 300% in 30 Days',
      timestamp: '2024-02-15 09:15 AM'
    },
    {
      id: 3,
      type: 'email',
      content: 'Subject: Your Marketing Success Awaits\n\nHi there!\n\nReady to take your marketing to the next level? Our AI-powered platform has helped thousands of businesses increase their conversion rates and streamline their campaigns.\n\nBest regards,\nThe MarketingAI Team',
      timestamp: '2024-02-14 4:20 PM'
    }
  ]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockContent = {
      caption: `🎯 ${prompt} - Transform your business with cutting-edge solutions! Join thousands of satisfied customers who've already made the switch. Ready to get started? #Innovation #Success #Growth`,
      headline: `${prompt}: The Ultimate Guide to Success in 2024`,
      email: `Subject: ${prompt} - Your Success Story Starts Here\n\nDear Valued Customer,\n\nWe're excited to share how ${prompt.toLowerCase()} can transform your business. Our proven strategies have helped companies achieve remarkable results.\n\nKey benefits:\n• Increased efficiency\n• Better ROI\n• Streamlined processes\n\nReady to learn more? Let's schedule a call!\n\nBest regards,\nYour Success Team`,
      campaign: `Campaign Idea: "${prompt}"\n\nObjective: Drive awareness and engagement\nTarget Audience: Tech-savvy professionals\nKey Message: Innovation meets results\nChannels: LinkedIn, Email, Twitter\nDuration: 4 weeks\nBudget: $5,000\n\nCreative Concepts:\n1. Video testimonials\n2. Interactive demos\n3. Behind-the-scenes content\n4. User-generated content campaign`
    };
    
    setGeneratedContent(mockContent[selectedType as keyof typeof mockContent]);
    setIsGenerating(false);
  };

  const handleSave = () => {
    if (!generatedContent) return;
    
    const newContent = {
      id: Date.now(),
      type: selectedType,
      content: generatedContent,
      timestamp: new Date().toLocaleString()
    };
    
    setSavedContent([newContent, ...savedContent]);
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Content Generator</h1>
          <p className="mt-1 text-sm text-gray-600">
            Create compelling marketing content with the power of AI
          </p>
        </div>

        <Tabs defaultValue="generate" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate">Generate Content</TabsTrigger>
            <TabsTrigger value="saved">Saved Content</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6">
            {/* Content Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wand2 className="mr-2 h-5 w-5" />
                  Content Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {contentTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <Card 
                        key={type.id}
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedType === type.id
                            ? 'border-primary bg-primary/5'
                            : 'hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedType(type.id)}
                      >
                        <CardContent className="p-4 text-center">
                          <Icon className={`h-8 w-8 mx-auto mb-2 ${
                            selectedType === type.id ? 'text-primary' : 'text-gray-400'
                          }`} />
                          <h3 className="font-medium text-sm">{type.name}</h3>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Generation Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="mr-2 h-5 w-5" />
                    Content Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="prompt">What do you want to create content about?</Label>
                    <Textarea
                      id="prompt"
                      placeholder="e.g., Launch of our new AI marketing platform that helps businesses increase ROI"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={4}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Tone</Label>
                      <Select value={tone} onValueChange={setTone}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {tones.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Platform</Label>
                      <Select value={platform} onValueChange={setPlatform}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {platforms.map((p) => (
                            <SelectItem key={p} value={p}>{p}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    onClick={handleGenerate} 
                    disabled={!prompt.trim() || isGenerating}
                    className="w-full bg-primary hover:bg-primary-hover"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        Generate Content
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generated Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {generatedContent ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <pre className="whitespace-pre-wrap text-sm text-gray-900 font-sans">
                          {generatedContent}
                        </pre>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCopy(generatedContent)}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleSave}
                        >
                          <Save className="mr-2 h-4 w-4" />
                          Save
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleGenerate}
                          disabled={isGenerating}
                        >
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Ready to create amazing content?
                      </h3>
                      <p className="text-sm text-gray-500">
                        Enter your prompt and click generate to get started
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* AI Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5" />
                  AI Writing Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Be Specific</h4>
                    <p className="text-sm text-blue-700">
                      Include details about your product, target audience, and key benefits
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Set the Context</h4>
                    <p className="text-sm text-green-700">
                      Mention the platform, campaign goal, and desired action
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Iterate & Refine</h4>
                    <p className="text-sm text-purple-700">
                      Generate multiple versions and combine the best elements
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Save className="mr-2 h-5 w-5" />
                    Saved Content ({savedContent.length})
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {savedContent.length > 0 ? (
                  <div className="space-y-4">
                    {savedContent.map((item) => (
                      <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">
                              {contentTypes.find(t => t.id === item.type)?.name}
                            </Badge>
                            <span className="text-sm text-gray-500">{item.timestamp}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleCopy(item.content)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Save className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded text-sm">
                          <pre className="whitespace-pre-wrap font-sans">
                            {item.content}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Save className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No saved content yet
                    </h3>
                    <p className="text-sm text-gray-500">
                      Generate and save content to see it here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}