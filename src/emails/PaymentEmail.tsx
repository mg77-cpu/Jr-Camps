import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface PaymentEmailProps {
  userFirstName?: string;
  planName: string;
  amount: number;
  studentName: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const PaymentEmail = ({
  userFirstName = "there",
  planName,
  amount,
  studentName,
}: PaymentEmailProps) => (
  <Html>
    <Head />
    <Preview>Payment Confirmed - Welcome to {planName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={logo}>Campy</Heading>
        </Section>
        <Section style={content}>
          <Heading style={h1}>Payment Confirmed!</Heading>
          <Text style={text}>
            Hi {userFirstName},
          </Text>
          <Text style={text}>
            Thank you for enrolling <strong>{studentName}</strong> in our <strong>{planName}</strong> program. 
            We've successfully received your payment of <strong>${amount.toFixed(2)}</strong>.
          </Text>
          
          <Section style={receiptContainer}>
            <Text style={receiptTitle}>Order Summary</Text>
            <Hr style={receiptHr} />
            <Section style={receiptRow}>
              <Text style={receiptLabel}>Program</Text>
              <Text style={receiptValue}>{planName}</Text>
            </Section>
            <Section style={receiptRow}>
              <Text style={receiptLabel}>Student</Text>
              <Text style={receiptValue}>{studentName}</Text>
            </Section>
            <Section style={receiptRow}>
              <Text style={receiptLabel}>Total Paid</Text>
              <Text style={receiptValue}>${amount.toFixed(2)}</Text>
            </Section>
          </Section>

          <Text style={text}>
            What's next? You'll receive a separate email shortly with specific details about schedules, 
            locations, and what to bring on the first day.
          </Text>

          <Section style={btnContainer}>
            <Button style={button} href={`${baseUrl}/dashboard`}>
              Go to Dashboard
            </Button>
          </Section>

          <Hr style={hr} />
          <Text style={footer}>
            Need help? Contact our support team at support@campy.com
            <br />
            © 2026 Campy. All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default PaymentEmail;

const main = {
  backgroundColor: "#f8f9fa",
  fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "580px",
};

const header = {
  backgroundColor: "#0056b3",
  padding: "32px",
  textAlign: "center" as const,
  borderRadius: "8px 8px 0 0",
};

const logo = {
  color: "#ffffff",
  fontSize: "32px",
  fontWeight: "700",
  margin: "0",
};

const content = {
  backgroundColor: "#ffffff",
  padding: "40px",
  borderRadius: "0 0 8px 8px",
  border: "1px solid #e9ecef",
};

const h1 = {
  color: "#0056b3",
  fontSize: "24px",
  fontWeight: "700",
  textAlign: "center" as const,
  margin: "30px 0",
};

const text = {
  color: "#7a7a7a",
  fontSize: "16px",
  lineHeight: "26px",
  textAlign: "left" as const,
};

const receiptContainer = {
  backgroundColor: "#f8f9fa",
  padding: "24px",
  borderRadius: "8px",
  margin: "32px 0",
};

const receiptTitle = {
  color: "#212529",
  fontSize: "18px",
  fontWeight: "600",
  margin: "0 0 12px",
};

const receiptHr = {
  borderColor: "#e9ecef",
  margin: "12px 0",
};

const receiptRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "8px",
};

const receiptLabel = {
  color: "#7a7a7a",
  fontSize: "14px",
  margin: "0",
};

const receiptValue = {
  color: "#212529",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0",
  textAlign: "right" as const,
};

const btnContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#0056b3",
  borderRadius: "100px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "16px 32px",
};

const hr = {
  borderColor: "#e9ecef",
  margin: "40px 0",
};

const footer = {
  color: "#7a7a7a",
  fontSize: "12px",
  lineHeight: "22px",
  textAlign: "center" as const,
};
