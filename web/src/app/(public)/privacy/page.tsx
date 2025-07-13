import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-primary">
              MarketingAI Pro
            </Link>
            <Link href="/">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-xs p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">Last updated: January 1, 2024</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Information We Collect
              </h2>
              <p className="text-gray-600 mb-4">
                We collect information you provide directly to us, such as when
                you create an account, use our services, or contact us for
                support.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Account information (name, email, password)</li>
                <li>Campaign data and marketing content</li>
                <li>Usage data and analytics</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-600 mb-4">
                We use the information we collect to provide, maintain, and
                improve our services.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Provide and operate our marketing automation platform</li>
                <li>Send you technical notices and support messages</li>
                <li>Analyze usage patterns to improve our services</li>
                <li>Protect against fraud and abuse</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Information Sharing
              </h2>
              <p className="text-gray-600 mb-4">
                We do not sell, trade, or otherwise transfer your personal
                information to third parties without your consent, except as
                described in this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Data Security
              </h2>
              <p className="text-gray-600 mb-4">
                We implement appropriate security measures to protect your
                personal information against unauthorized access, alteration,
                disclosure, or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Your Rights
              </h2>
              <p className="text-gray-600 mb-4">
                You have the right to access, update, or delete your personal
                information. You may also opt out of certain communications from
                us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Contact Us
              </h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please
                contact us at privacy@marketingaipro.com or through our support
                channels.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
