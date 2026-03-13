import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: March 13, 2026</p>

        <div className="space-y-8 text-sm text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Introduction</h2>
            <p>
              Trevor Bosetti ("we," "us," or "our") operates the website trevorbosetti.com. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our contact form. Please read this policy carefully. By using our website, you consent to the practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
            <p className="mb-3">We may collect the following types of information:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>Personal Information:</strong> Name, email address, phone number (including mobile number), and any other information you voluntarily provide through our contact form.</li>
              <li><strong>Inquiry Details:</strong> Subject line and message content submitted through the contact form.</li>
              <li><strong>Consent Records:</strong> Whether you opted in to receive SMS messages and the date/time of consent.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our website, including browser type, IP address, pages visited, and time spent on pages, collected through standard analytics tools.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>To respond to your inquiries and project requests submitted through the contact form.</li>
              <li>To send SMS follow-up messages related to your inquiry, project discussion, scheduling, and follow-up communication (only if you have provided explicit consent).</li>
              <li>To improve our website and services.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. SMS/Text Messaging Policy</h2>
            <p className="mb-3">
              If you opt in to receive SMS messages through our contact form, the following applies:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>Program Name:</strong> Trevor Bosetti Inquiry Follow-Up SMS Program</li>
              <li><strong>Purpose:</strong> SMS messages are used solely for follow-up communication related to your inquiry, project requests, scheduling, and related discussions.</li>
              <li><strong>Message Frequency:</strong> Message frequency varies based on the nature of your inquiry and ongoing project communication. We do not send recurring marketing or promotional messages.</li>
              <li><strong>Message and Data Rates:</strong> Message and data rates may apply. Please contact your mobile carrier for details about your messaging plan.</li>
              <li><strong>Opt-Out:</strong> You may opt out of receiving SMS messages at any time by replying STOP to any message you receive from us. After opting out, you will receive a one-time confirmation message and will no longer receive SMS messages from us.</li>
              <li><strong>Help:</strong> For help or questions about SMS messaging, reply HELP to any message or contact us at trevor@rankzone.studio.</li>
            </ul>
            <div className="mt-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <p className="font-medium text-foreground">
                Mobile information will not be shared with third parties or affiliates for marketing or promotional purposes. Text messaging opt-in data and consent will not be shared with any third parties.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Information Sharing and Disclosure</h2>
            <p className="mb-3">We do not sell, trade, or otherwise transfer your personal information to outside parties except in the following circumstances:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>Service Providers:</strong> We may share information with trusted service providers who assist us in operating our website and conducting our business (e.g., email delivery, SMS messaging via Twilio), provided they agree to keep this information confidential.</li>
              <li><strong>Legal Requirements:</strong> We may disclose information when required by law or in response to valid legal processes.</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
            </ul>
            <p className="mt-3">
              We reiterate: mobile phone numbers and SMS consent data are never shared with third parties or affiliates for marketing or promotional purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes described in this policy, unless a longer retention period is required or permitted by law. Contact form submissions and consent records are retained for the duration of any active project relationship and for a reasonable period thereafter.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">8. Your Rights</h2>
            <p className="mb-3">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Access the personal information we hold about you.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of your personal information.</li>
              <li>Opt out of SMS communications at any time by replying STOP.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us at trevor@rankzone.studio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">9. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date. Your continued use of our website after any changes constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 mt-3">
              <li><strong>Email:</strong> trevor@rankzone.studio</li>
              <li><strong>Website:</strong> trevorbosetti.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">12. Business Relationship Disclosure</h2>
            <p>
              Trevor Bosetti operates professionally through RankZone Studio. The trevorbosetti.com website serves as a personal portfolio and point of contact. All SMS communications and inquiries are managed by Trevor Bosetti. The email address trevor@rankzone.studio is the primary business contact associated with this website and all related communications.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
