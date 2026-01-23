
import { prisma } from "@/lib/prisma";
import { PaymentStatus, Prisma } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { PortalDesign } from "./portal-design";

type PortalSession = {
  startDate: Date;
  endDate: Date;
  program: { name: string; category: string };
  partner: { name: string };
};

type PortalPayment = {
  id: string;
  createdAt: Date;
  session: PortalSession | null;
  status: string;
};

type PortalStudent = {
  id: string;
  name: string;
  dob: Date;
  grade: string | null;
  notes: string | null;
  payments: PortalPayment[];
};

type PortalUser = {
  firstName: string | null;
  lastName: string | null;
  email: string;
  students: PortalStudent[];
};

export default async function PortalPage() {
  const { userId } = await auth();
  const userInclude: Prisma.UserInclude = {
    students: {
      include: {
        payments: {
          where: { 
            status: { in: [PaymentStatus.COMPLETED, PaymentStatus.PENDING] },
            sessionId: { not: null } 
          },
          include: {
            session: {
              include: {
                program: true,
                partner: true
              }
            }
          },
          orderBy: { createdAt: Prisma.SortOrder.desc }
        }
      }
    }
  };

  const dbUser = userId
    ? await prisma.user.findUnique({
        where: { clerkId: userId },
        include: userInclude
      })
    : await prisma.user.findFirst({ include: userInclude });

  const now = new Date();
  const dayMs = 24 * 60 * 60 * 1000;
  const previewUser: PortalUser = {
    firstName: "Dev",
    lastName: "Parent",
    email: "dev@example.com",
    students: [
      {
        id: "dev-student-1",
        name: "Avery",
        dob: new Date(now.getFullYear() - 9, 3, 12),
        grade: "4th",
        notes: "Peanut allergy",
        payments: [
          {
            id: "dev-payment-1",
            createdAt: new Date(now.getTime() - 12 * dayMs),
            status: "COMPLETED",
            session: {
              startDate: new Date(now.getTime() - 3 * dayMs),
              endDate: new Date(now.getTime() + 14 * dayMs),
              program: { name: "Jr Sports: Multi-Sport Camp", category: "SPORTS" },
              partner: { name: "Westside Community Center" },
            },
          },
          {
            id: "dev-payment-2",
            createdAt: new Date(now.getTime() - 40 * dayMs),
            status: "COMPLETED",
            session: {
              startDate: new Date(now.getTime() + 20 * dayMs),
              endDate: new Date(now.getTime() + 27 * dayMs),
              program: { name: "Jr STEM: Robotics Lab", category: "STEM" },
              partner: { name: "Oak Ridge Elementary" },
            },
          },
        ],
      },
      {
        id: "dev-student-2",
        name: "Jordan",
        dob: new Date(now.getFullYear() - 11, 7, 2),
        grade: "6th",
        notes: null,
        payments: [
          {
            id: "dev-payment-3",
            createdAt: new Date(now.getTime() - 5 * dayMs),
            status: "COMPLETED",
            session: {
              startDate: new Date(now.getTime() - 25 * dayMs),
              endDate: new Date(now.getTime() - 18 * dayMs),
              program: { name: "Jr Defense: Confidence & Awareness", category: "DEFENSE" },
              partner: { name: "City Rec Gym" },
            },
          },
        ],
      },
    ],
  };

  const resolvedUser = dbUser ?? previewUser;

  return <PortalDesign dbUser={resolvedUser as unknown as PortalUser} isDevPreview={!dbUser} />;
}
