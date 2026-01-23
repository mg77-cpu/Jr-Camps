# Jr Camps – Security Audit Protocol

This document defines how to audit and continuously monitor the security posture of the Jr Camps application.

The project is a Next.js 16 application using:

- Next.js App Router (with middleware/proxy)
- Prisma ORM with a relational database
- Stripe for payments and webhooks
- Clerk for authentication and webhooks

> Goal: protect children’s data, parent/guardian PII, partner data, and payment data while maintaining availability and integrity of the platform.

---

## 1. Assets and Data Classification

- **User types**
  - Parents/guardians
  - Jr Camps staff and admins
  - Partners (schools, camps, facilities)
- **Data categories**
  - Public: marketing pages, pricing, program descriptions
  - Internal: configuration, non-sensitive analytics, feature flags
  - Sensitive: parent contact details, children profiles, enrollment history
  - Highly sensitive: payment identifiers (Stripe customer IDs, subscription IDs), webhook secrets, auth session tokens
- **Systems**
  - Next.js frontend and API routes
  - Database accessed via Prisma
  - Stripe and Clerk integrations

All audit activities must prioritize **highly sensitive** and **sensitive** data paths.

---

## 2. Audit Cadence

- **Quarterly (minimum)**
  - Full application security review (sections 3–9 below)
  - Dependency and platform update review
- **Before major releases**
  - Re-run critical parts of this checklist on:
    - Authentication and authorization
    - Payments and webhooks
    - Database schema changes that touch sensitive data
- **After security incidents**
  - Run the full protocol and produce a written post-incident report

---

## 3. Authentication and Session Security

Scope: Clerk integration, protected routes, admin areas, and APIs.

Checklist:

- Ensure all admin and partner routes require authenticated sessions.
- Verify **role-based access control**:
  - Parents cannot access admin or partner tooling.
  - Partners cannot access other partners’ data.
  - Only authorized staff can change pricing, programs, and enrollment policies.
- Confirm auth checks on:
  - Admin pages (e.g., `/admin`, `/admin/*`).
  - Sensitive API routes (e.g., `/api/*` that exposes or modifies user data).
- Review session lifetime and refresh policies in Clerk configuration to balance UX and security.
- Check that no auth tokens, cookies, or session IDs are logged in server logs.

Deliverables:

- List of all protected routes and their required roles.
- Summary of any missing or weak protections and remediation tasks.

---

## 4. Authorization in Business Logic

Scope: Server actions, API routes, and Prisma queries that mutate or return sensitive data.

Checklist:

- Enumerate all API routes and server actions that:
  - Read or write user profiles
  - Create or manage enrollments and sessions
  - Touch financial or billing data (even indirectly)
- For each, verify:
  - The handler checks the authenticated user ID.
  - The handler enforces that a user can only view or mutate **their** data (or data of children they are guardian for).
  - Admin-only operations (e.g., modifying programs, sessions, or partners) explicitly check admin privileges.
- Inspect Prisma queries for **multi-tenant boundaries**:
  - Queries always filter by owner or tenant ID where applicable.
  - No “list all users / children / partners” endpoints are exposed without proper role checks.

Deliverables:

- Table of critical operations with documented authorization checks.
- Remediation plan for any missing guards.

---

## 5. Secret Management and Configuration

Scope: Environment variables and configuration used by Next.js, Prisma, Stripe, and Clerk.

Checklist:

- Validate that all secrets are stored in environment variables and **never** committed to version control.
- Ensure separation of:
  - Development environment secrets
  - Staging/test environment secrets
  - Production secrets
- Verify least-privilege for:
  - Database user (no unnecessary permissions such as `SUPERUSER` or full schema control in production)
  - API keys for third-party services
- Confirm rotation procedures:
  - Document how to rotate Stripe secrets, Clerk keys, and database credentials.
  - Ensure rotation can be done without extended downtime.

Deliverables:

- Current list of required secrets and their owners.
- Documented rotation checklist.

---

## 6. Database and Prisma Security

Scope: Prisma schema, migrations, and database access patterns.

Checklist:

- Review Prisma schema for:
  - Explicit types and constraints for IDs and foreign keys.
  - Usage of `@unique` and `@index` on security-critical fields (e.g., email, external IDs).
  - Fields containing sensitive data; verify minimal retention and proper types.
- Validate:
  - No direct SQL construction from user input (rely on Prisma’s query API).
  - No debugging endpoints that expose Prisma queries or raw database errors.
- Backup and retention:
  - Confirm automated backups for production database.
  - Document retention period and restoration procedures.
- Data minimization:
  - Ensure only necessary PII is collected.
  - Identify data that can be anonymized or aggregated for analytics.

Deliverables:

- List of sensitive tables/columns with risk classification.
- Backup/restore tested at least annually, with timestamped evidence.

---

## 7. Payments and Webhooks (Stripe, Clerk)

Scope: `/api/checkout`, `/api/webhooks/*`, and related handlers.

Checklist:

- Webhook security:
  - Ensure each webhook endpoint verifies the provider’s signature (e.g., Stripe’s signing secret).
  - Reject requests that fail signature verification or originate from unexpected sources.
- Idempotency:
  - Confirm that webhook handlers are idempotent (replay-safe).
  - Use idempotency keys or track processed event IDs.
- Data handling:
  - Store only Stripe’s IDs (customer ID, subscription ID, payment intent ID).
  - Never store full card details or CVV.
  - Avoid logging full event payloads; if needed, redact sensitive fields.
- Clerk webhooks:
  - Validate event types and authenticate requests.
  - Ensure user provisioning or deprovisioning logic is safe and idempotent.

Deliverables:

- Documented list of webhook endpoints and supported event types.
- Evidence of test runs against webhook signature verification.

---

## 8. Frontend Security (Next.js)

Scope: All pages, components, and client-side logic.

Checklist:

- Input handling:
  - All user-supplied input is validated server-side.
  - No usage of `dangerouslySetInnerHTML` without strict sanitization.
- Cross-Site Scripting (XSS):
  - Ensure unescaped HTML is not rendered from user content.
  - Confirm output encoding for dynamic values in templates.
- Cross-Site Request Forgery (CSRF):
  - Use built-in CSRF protection mechanisms for state-changing endpoints if they can be invoked from the browser.
  - Prefer `POST`/`PATCH`/`DELETE` for mutations over `GET`.
- Content Security Policy (CSP):
  - Define and enforce a CSP that restricts scripts, iframes, and external origins.
- Clickjacking:
  - Ensure response headers (e.g., `X-Frame-Options` or CSP frame-ancestors) prevent framing by untrusted sites.

Deliverables:

- Summary of identified client-side risks and mitigations.

---

## 9. Dependency and Supply Chain Security

Scope: All npm dependencies and tooling.

Checklist:

- Run dependency vulnerability scans (e.g., `npm audit` or external tooling).
- Review high and critical severity findings and either:
  - Upgrade/patch the dependency, or
  - Document a temporary exception with mitigation.
- Remove unused dependencies and scripts.
- Verify:
  - No dependency is fetched from untrusted or personal registries for production.
  - Lockfile is committed and kept up to date.

Deliverables:

- Latest vulnerability scan report with documented resolution status.

---

## 10. Logging, Monitoring, and Incident Response

Checklist:

- Logging:
  - Ensure logs do not contain secrets, auth tokens, full card data, or children’s sensitive details.
  - Use structured logging for security events (auth failures, access denied, webhook failures).
- Monitoring:
  - Define alerts for:
    - Unusual login patterns or repeated failed logins.
    - Spikes in error rates on `/api/*` and webhook routes.
    - Infrastructure resource exhaustion (CPU, memory, database connections).
- Incident response:
  - Document who to notify in case of a suspected breach.
  - Define steps:
    - Contain: isolate affected systems, revoke relevant credentials.
    - Eradicate: patch vulnerabilities, remove malicious artifacts.
    - Recover: restore from backups, monitor for recurrence.
    - Learn: conduct a post-incident review and update this protocol.

Deliverables:

- Incident response runbook reference.
- Log retention and access policy summary.

---

## 11. Access Control and Operational Security

Checklist:

- Access control:
  - Limit production database and environment access to a minimal set of engineers.
  - Require MFA for cloud provider, Stripe, Clerk, and any infrastructure dashboards.
  - Use role-based access in all third-party dashboards (no shared admin accounts).
- Change management:
  - All changes to security-sensitive areas (auth, payments, database schema) should go through code review.
  - Enforce branch protection rules on main production branches.

Deliverables:

- List of roles and current assignees for production systems.
- Summary of code review and change control policies.

---

## 12. Reporting and Evidence

For each audit cycle:

- Produce a short report including:
  - Date of audit and participants
  - Scope (which sections of this protocol were covered)
  - Findings categorized by severity (critical, high, medium, low)
  - Agreed remediation tasks and owners with deadlines
- Store past reports in a secure internal location for compliance and historical analysis.
