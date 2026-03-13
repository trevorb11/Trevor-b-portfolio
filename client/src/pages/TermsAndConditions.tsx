import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">Terms and Conditions</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: March 13, 2026</p>

        <div className="space-y-8 text-sm text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Introduction</h2>
            <p>
              Welcome to trevorbosetti.com. These Terms and Conditions govern your use of this website and any SMS messaging services you opt into through our contact form. By using this website and opting in to receive SMS messages, you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. SMS Messaging Terms</h2>
            <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-4">
              <div>
                <p className="font-medium text-foreground mb-1">Program Name</p>
                <p>Trevor Bosetti Inquiry Follow-Up SMS Program</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">What Messages Are For</p>
                <p>
                  SMS messages sent through this program are used for follow-up communication related to inquiries, project requests, scheduling, and project discussions submitted through the trevorbosetti.com contact form. Messages are not used for marketing, promotions, or advertising.
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Message Frequency</p>
                <p>
                  Message frequency varies based on the nature of your inquiry and the status of any ongoing project communication. You will not receive more messages than necessary to address your inquiry or project.
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Message and Data Rates</p>
                <p>
                  Message and data rates may apply. Please consult your mobile carrier for information about your text messaging plan and any applicable charges.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. Opt-Out Instructions</h2>
            <p className="mb-3">
              You may opt out of receiving SMS messages at any time by texting <strong>STOP</strong> in reply to any message you receive from us.
            </p>
            <p>
              After sending STOP, you will receive a one-time confirmation message confirming that you have been unsubscribed. You will not receive any further SMS messages unless you re-opt-in through the contact form.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Help and Support</h2>
            <p className="mb-3">
              For help or questions about SMS messaging, you can:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Reply <strong>HELP</strong> to any SMS message you receive from us.</li>
              <li>Email us at trevor@rankzone.studio.</li>
              <li>Use the contact form at trevorbosetti.com.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Consent</h2>
            <p>
              By checking the SMS consent checkbox on our contact form, you expressly consent to receive text messages from Trevor Bosetti at the phone number you provided. Consent to receive SMS messages is not a condition of any purchase or service. You may submit a contact form inquiry without opting in to SMS messaging.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Privacy</h2>
            <p>
              Your privacy is important to us. Please review our{" "}
              <Link href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>{" "}
              for details on how we collect, use, and protect your information. Mobile information will not be shared with third parties or affiliates for marketing or promotional purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Website Use</h2>
            <p className="mb-3">By using this website, you agree to the following:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>You will not use this website for any unlawful purpose.</li>
              <li>You will provide accurate information when submitting the contact form.</li>
              <li>You will not attempt to interfere with the operation of this website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">8. Intellectual Property</h2>
            <p>
              All content on this website, including text, images, design, and code, is the property of Trevor Bosetti unless otherwise stated. You may not reproduce, distribute, or use any content without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">9. Limitation of Liability</h2>
            <p>
              This website and its content are provided "as is" without warranties of any kind. Trevor Bosetti shall not be liable for any damages arising from the use of this website or SMS messaging services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">10. Changes to These Terms</h2>
            <p>
              We reserve the right to update these Terms and Conditions at any time. Changes will be posted on this page with an updated "Last updated" date. Your continued use of our website or SMS services after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">11. Contact Information</h2>
            <p>
              If you have questions about these Terms and Conditions, please contact us:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 mt-3">
              <li><strong>Email:</strong> trevor@rankzone.studio</li>
              <li><strong>Website:</strong> trevorbosetti.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">12. Business Identity</h2>
            <p>
              Trevor Bosetti operates professionally through RankZone Studio. All communications, inquiries, and SMS messages are managed by Trevor Bosetti. The trevorbosetti.com domain serves as the primary portfolio and contact point.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
