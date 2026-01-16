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

interface WelcomeEmailProps {
  userFirstName?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const WelcomeEmail = ({
  userFirstName = "there",
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Campy - Start Your Enrichment Journey</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={logo}>Campy</Heading>
        </Section>
        <Section style={content}>
          <Heading style={h1}>Welcome to the family, {userFirstName}!</Heading>
          <Text style={text}>
            We're thrilled to have you here. Campy is dedicated to providing
            premium, high-end enrichment programs that help your children grow,
            learn, and thrive in a safe and engaging environment.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={`${baseUrl}/#pricing`}>
              Explore Memberships
            </Button>
          </Section>
          <Text style={text}>
            Not sure where to start? Check out our most popular features:
          </Text>
          <ul style={list}>
            <li style={listItem}>
              <Link href={`${baseUrl}/for-parents`} style={link}>
                Find a location near you
              </Link>
            </li>
            <li style={listItem}>
              <Link href={`${baseUrl}/#programs`} style={link}>
                Browse our programs
              </Link>
            </li>
            <li style={listItem}>
              <Link href={`${baseUrl}/#pricing`} style={link}>
                View membership plans
              </Link>
            </li>
          </ul>
          <Hr style={hr} />
          <Text style={footer}>
            If you have any questions, just reply to this email. We're here to help!
            <br />
            © 2026 Campy. All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

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

const btnContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#f39c12",
  borderRadius: "100px",
  color: "#212529",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "16px 32px",
};

const list = {
  paddingLeft: "20px",
  marginTop: "20px",
};

const listItem = {
  color: "#7a7a7a",
  fontSize: "16px",
  lineHeight: "26px",
  marginBottom: "10px",
};

const link = {
  color: "#0056b3",
  textDecoration: "underline",
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
