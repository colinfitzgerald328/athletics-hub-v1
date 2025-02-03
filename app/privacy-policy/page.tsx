"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@mui/joy/Button";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link href="/">
        <Button
          sx={{
            marginBottom: "20px",
            borderRadius: "25px",
          }}
          variant="soft"
          color="primary"
        >
          Back to Home
        </Button>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
          <p className="text-sm text-gray-500">Effective Date: February 2, 2025</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p>
              Welcome to Track and Field Hub (&quot;we,&quot; &quot;our&quot; or &quot;us&quot;). Your
              privacy is important to us. This Privacy Policy explains how we collect, use,
              and protect your information when you use our app and services (&quot;Services&quot;).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account Information:</strong> When you sign up, we collect your name, email address, and password.</li>
              <li><strong>Activity Data:</strong> We collect details of your activities, including GPS location, duration, distance, and other performance metrics.</li>
              <li><strong>Device Information:</strong> We may collect information about the device you use, such as device type, operating system, and app version.</li>
              <li><strong>Usage Data:</strong> We collect information about how you interact with our app, such as features used and settings configured.</li>
              <li><strong>Third-Party Integrations:</strong> If you connect third-party services (e.g., fitness trackers), we may receive data from them.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, personalize, and improve our Services.</li>
              <li>Display your activities on your profile.</li>
              <li>Enable social features, such as sharing activities with friends.</li>
              <li>Analyze usage trends to enhance user experience.</li>
              <li>Send important updates and notifications.</li>
              <li>Ensure security and prevent fraud.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Sharing Your Information</h2>
            <p>We do not sell your personal data. However, we may share information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Other Users:</strong> Depending on your privacy settings, your activities may be visible to other users.</li>
              <li><strong>Service Providers:</strong> We may share data with third parties who help us operate and improve our Services.</li>
              <li><strong>Legal Compliance:</strong> We may disclose data if required by law or to protect our rights.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Your Privacy Controls</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Adjust privacy settings to control who sees your activities.</li>
              <li>Edit or delete your activity history.</li>
              <li>Request deletion of your account and personal data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Data Security</h2>
            <p>We implement industry-standard security measures to protect your data. However, no method of transmission or storage is completely secure, so we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Childrens Privacy</h2>
            <p>Our Services are not intended for users under 13. If we learn that we have collected data from a child under 13, we will take steps to delete it.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy. Any changes will be posted, and we will notify you as required by law.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
            <p>If you have any questions, contact us at colinfitzgerald328@gmail.com.</p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
