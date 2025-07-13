import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import AudienceDetailClient from "./AudienceDetailClient";

// This function is required for static export with dynamic routes
export async function generateStaticParams() {
  // Return the audience IDs that should be statically generated
  return [{ audienceId: "1" }, { audienceId: "2" }, { audienceId: "3" }];
}

const audienceData = {
  "1": {
    id: 1,
    name: "Tech Professionals",
    description: "Software developers and IT professionals",
    contacts: 2450,
    tags: ["Technology", "B2B", "High-Value"],
    lastUpdated: "2024-01-15",
    engagement: 78,
    location: "Global",
    source: "LinkedIn Import",
  },
  "2": {
    id: 2,
    name: "Marketing Specialists",
    description: "Digital marketing and growth professionals",
    contacts: 1850,
    tags: ["Marketing", "B2B", "Growth"],
    lastUpdated: "2024-01-20",
    engagement: 82,
    location: "North America",
    source: "Conference Import",
  },
  "3": {
    id: 3,
    name: "Design Community",
    description: "UI/UX designers and creative professionals",
    contacts: 1200,
    tags: ["Design", "Creative", "B2B"],
    lastUpdated: "2024-01-18",
    engagement: 75,
    location: "Europe",
    source: "Dribbble Import",
  },
};

const contacts = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@techcorp.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp Inc.",
    position: "Senior Developer",
    location: "San Francisco, CA",
    tags: ["Developer", "Senior", "JavaScript"],
    joinDate: "2024-01-10",
    lastActivity: "2024-02-15",
    engagement: 85,
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@innovate.io",
    phone: "+1 (555) 987-6543",
    company: "Innovate Solutions",
    position: "Tech Lead",
    location: "New York, NY",
    tags: ["Lead", "Python", "AI"],
    joinDate: "2024-01-12",
    lastActivity: "2024-02-14",
    engagement: 92,
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike.chen@startup.com",
    phone: "+1 (555) 456-7890",
    company: "Startup Labs",
    position: "Full Stack Developer",
    location: "Austin, TX",
    tags: ["Full Stack", "React", "Node.js"],
    joinDate: "2024-01-15",
    lastActivity: "2024-02-13",
    engagement: 76,
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    email: "emily.r@cloudtech.com",
    phone: "+1 (555) 321-0987",
    company: "CloudTech Solutions",
    position: "DevOps Engineer",
    location: "Seattle, WA",
    tags: ["DevOps", "AWS", "Docker"],
    joinDate: "2024-01-18",
    lastActivity: "2024-02-12",
    engagement: 88,
    avatar:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150",
  },
];

export default function AudienceDetailPage({
  params,
}: {
  params: { audienceId: string };
}) {
  const audience = audienceData[params.audienceId as keyof typeof audienceData];

  if (!audience) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900">
            Audience Not Found
          </h1>
          <p className="mt-2 text-gray-600">
            The requested audience could not be found.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <AudienceDetailClient audience={audience} contacts={contacts} />
    </DashboardLayout>
  );
}
