
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Terms of Service | AI FinTech Insights',
  description: 'Read the terms of service for AI FinTech Insights.',
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Terms of Service</CardTitle>
          <p className="text-muted-foreground pt-2">Last updated: July 26, 2024</p>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <h3>1. Agreement to Terms</h3>
          <p>
            By using our services, you agree to be bound by these Terms. If you do not agree to be bound by these Terms, do not use the services.
          </p>

          <h3>2. Privacy Policy</h3>
          <p>
            Please refer to our Privacy Policy for information on how we collect, use and disclose information from our users. You acknowledge and agree that your use of the Services is subject to our Privacy Policy.
          </p>

          <h3>3. Changes to Terms or Services</h3>
          <p>
            We may update the Terms at any time, in our sole discretion. If we do so, we’ll let you know either by posting the updated Terms on the Site or through other communications. It’s important that you review the Terms whenever we update them or you use the Services.
          </p>

          <h3>4. Who May Use the Services</h3>
          <p>
            You may use the Services only if you are 13 years or older and are not barred from using the Services under applicable law.
          </p>
          
          <h3>5. Content Ownership</h3>
          <p>
            We do not claim any ownership rights in any User Content and nothing in these Terms will be deemed to restrict any rights that you may have to use and exploit your User Content. Subject to the foregoing, AI FinTech Insights and its licensors exclusively own all right, title and interest in and to the Services and Content, including all associated intellectual property rights.
          </p>

          <h3>6. General Prohibitions</h3>
          <p>You agree not to do any of the following:</p>
          <ul>
            <li>Post, upload, publish, submit or transmit any Content that: (i) infringes, misappropriates or violates a third party’s patent, copyright, trademark, trade secret, moral rights or other intellectual property rights, or rights of publicity or privacy; (ii) violates, or encourages any conduct that would violate, any applicable law or regulation or would give rise to civil liability.</li>
            <li>Use, display, mirror or frame the Services or any individual element within the Services, AI FinTech Insights’s name, any AI FinTech Insights trademark, logo or other proprietary information, or the layout and design of any page or form contained on a page, without AI FinTech Insights’s express written consent.</li>
          </ul>

          <h3>7. Contact Information</h3>
          <p>
            If you have any questions about these Terms, please contact us at: contact@aifintechinsights.com
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
