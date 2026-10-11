# INOMARK — AI-Powered Creator Marketplace

> **Where AI Creators Meet Brands. Where Ideas Become Campaigns.**

INOMARK is an AI-powered creator marketplace designed to connect AI content creators with brands, businesses, and marketing agencies. It provides a centralized platform where brands can discover creative talent, explore creator portfolios, publish campaign briefs, receive applications, and collaborate with creators who match their campaign requirements.

The platform aims to simplify creator discovery, improve collaboration between brands and creators, and make AI-generated content opportunities more accessible.

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Problem Statement](#-problem-statement)
- [Our Solution](#-our-solution)
- [Project Objectives](#-project-objectives)
- [User Roles](#-user-roles)
- [Key Features](#-key-features)
- [AI-Powered Capabilities](#-ai-powered-capabilities)
- [User Workflows](#-user-workflows)
- [Technology Stack](#-technology-stack)
- [System Architecture](#-system-architecture)
- [Database Design](#-database-design)
- [Security and Privacy](#-security-and-privacy)
- [Getting Started](#-getting-started)
- [Environment Configuration](#-environment-configuration)
- [Development Guidelines](#-development-guidelines)
- [Testing](#-testing)
- [Current Development Status](#-current-development-status)
- [Future Enhancements](#-future-enhancements)
- [Project Impact](#-project-impact)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 About the Project

The creator economy is evolving rapidly, with AI making it possible to produce advertisements, product videos, animations, digital characters, social media creatives, and other forms of content more efficiently.

However, discovering suitable creators, evaluating their work, communicating campaign expectations, and managing applications can still be fragmented across social media platforms, messaging applications, and other tools.

**INOMARK brings these activities together in one marketplace.**

The platform is designed for two primary user groups:

- **Creators:** Build professional profiles, showcase portfolios, discover brand opportunities, and apply for campaigns.
- **Brands and agencies:** Discover creators, evaluate portfolios, publish campaign briefs, manage applications, and identify suitable creative talent.

INOMARK is intended to be more than a directory of creators. It aims to become a structured collaboration platform where creative work, campaign requirements, and opportunities can be brought together.

## 🎯 Problem Statement

Brands increasingly need high-quality digital content for advertising, product marketing, social media, and online campaigns. At the same time, AI content creators need a reliable way to showcase their capabilities and find relevant opportunities.

The current process can involve several challenges:

1. **Fragmented discovery:** Brands may need to search across multiple platforms to find creators with specific skills.
2. **Limited portfolio visibility:** A creator's best work may be spread across different social accounts and portfolio links.
3. **Unclear campaign requirements:** Creators may not receive sufficiently detailed information about a brand's expectations, deliverables, budget, or timeline.
4. **Inefficient applications:** Brands can struggle to organize, review, compare, and track creator applications.
5. **Difficult matching:** Finding creators who match a campaign's style, content category, skills, and budget can take time.
6. **Limited collaboration structure:** Initial discovery, campaign briefs, applications, and selection often happen through separate tools.
7. **Opportunities for emerging creators:** New creators may struggle to reach brands without an established audience or extensive industry connections.

### The core challenge

How can a single platform help brands discover relevant AI content creators and help creators find and apply for suitable campaign opportunities through a streamlined, organized, and intelligent workflow?

## 💡 Our Solution

INOMARK provides a centralized marketplace for creator discovery and brand collaboration.

The platform connects creator profiles and portfolios with brand requirements and campaign briefs. Brands can explore talent using relevant filters, publish campaign opportunities, and review applications. Creators can discover brands and open briefs, understand campaign expectations, and submit applications through their profiles.

The platform is designed around three principles:

- **Discover:** Make relevant creators and opportunities easier to find.
- **Connect:** Bring creators and brands together through structured campaign workflows.
- **Collaborate:** Organize briefs, applications, creator selection, and related information in one place.

The initial product can establish these core workflows first, with AI-assisted recommendations and campaign creation developed as supported capabilities.

## 🎯 Project Objectives

- Build a dedicated marketplace for AI content creators and brands.
- Provide role-specific experiences for creators and brand representatives.
- Enable creators to present their skills, services, and work professionally.
- Help brands discover creators through search and filtering.
- Allow brands to publish detailed campaign briefs.
- Enable creators to apply for relevant opportunities.
- Provide tools to review applications and manage creator selection.
- Use AI assistance to improve campaign brief creation and creator discovery.
- Deliver a responsive, accessible, and visually engaging interface.
- Establish a secure foundation for authentication, data management, and future expansion.

## 👥 User Roles

### 1. Creator

Creators use INOMARK to present their work and find business opportunities.

Their workspace is intended to support:

- Account registration and login.
- Creator profile creation and editing.
- Skill, niche, and service information.
- Portfolio management.
- Brand and campaign discovery.
- Saving interesting brands or opportunities.
- Applying to campaign briefs.
- Tracking application statuses.
- Managing public profile information.

### 2. Brand or Agency

Brands and agencies use INOMARK to find talent and organize campaigns.

Their workspace is intended to support:

- Account registration and login.
- Brand profile creation and editing.
- Creator discovery and filtering.
- Viewing public creator profiles and portfolios.
- Saving creators for later review.
- Creating and publishing campaign briefs.
- Using AI assistance to draft campaign requirements.
- Reviewing creator applications.
- Tracking application statuses.
- Selecting suitable creators for campaigns.

### 3. Platform Administrator — Future Extension

An administrative role could be introduced later to support platform moderation, account management, reporting, abuse prevention, and operational oversight. This role is not required for the initial marketplace MVP unless explicitly implemented.

## ✨ Key Features

### 1. Role-Based Authentication

INOMARK is designed to provide separate onboarding and workspace experiences for creators and brands.

Expected capabilities include:

- Registration and login.
- Role selection during onboarding.
- Role-specific profile setup.
- Session management.
- Protected pages.
- Sign-out functionality.
- Appropriate authorization for creator and brand actions.

Authentication should be implemented through a real authentication provider rather than relying only on frontend role checks.

### 2. Creator Profiles

Each creator can maintain a professional profile containing relevant information about their work.

Potential profile fields include:

- Creator name and profile image.
- Professional introduction.
- Creative niche and content categories.
- Skills and tools.
- Services offered.
- Portfolio items.
- Relevant social links.
- Public profile URL.

The purpose is to help brands understand a creator's capabilities without requiring them to search across multiple platforms.

### 3. Creator Portfolio

Creators can showcase examples of their work through a dedicated portfolio.

Portfolio items may include:

- AI-generated product advertisements.
- Short-form video content.
- AI-generated images.
- Animation and motion graphics.
- Digital characters and virtual influencers.
- Product visualization.
- Experimental creative projects.

Each portfolio item can contain a title, description, category, preview image or media link, and other relevant metadata.

Only media types that the application actually supports should be enabled. Large media files should use suitable storage rather than being stored directly in database records.

### 4. Discover Creators

Brands can explore creator profiles through a searchable discovery interface.

Useful filters include:

- Creative niche.
- Skills and services.
- Content category.
- Creator name.
- Relevant tools or specialties.
- Other profile attributes available in the database.

The interface should provide useful empty states, loading feedback, and clear filter controls.

Creator results should link to the corresponding public profiles, allowing brands to inspect portfolios before saving or contacting a creator through an implemented workflow.

### 5. Explore Brands

Creators can explore participating brands and agencies.

Brand listings can display:

- Brand name and logo.
- Industry or business category.
- Short description.
- Website or social links.
- Available campaign opportunities, where supported.

This feature helps creators discover potential clients and understand which businesses may be relevant to their services.

### 6. Campaign Brief Management

Brands can create structured campaign briefs describing the content they need.

A brief may include:

- Campaign title.
- Campaign description.
- Brand or organization.
- Required content type.
- Creative niche.
- Required skills.
- Deliverables.
- Budget or budget range.
- Timeline and deadline.
- Additional requirements.
- Application instructions.
- Publication status.

Brands should be able to save a draft, publish a brief, and manage their own briefs.

Published briefs should be discoverable by eligible creators. Editing, publishing, archiving, and deletion must be governed by appropriate permissions.

### 7. AI-Assisted Brief Creation

An AI-assisted brief creator can help brands turn an initial campaign idea into a structured brief.

For example, a brand could enter:

> I need a short AI-generated product advertisement for a skincare product aimed at young adults.

The assistant could help draft:

- A campaign title.
- A clearer campaign objective.
- Suggested deliverables.
- A creative direction.
- Required creator skills.
- A draft timeline or requirements checklist.

Generated information should remain editable before publication.

AI-generated suggestions must not be treated as verified business facts. Budgets, deadlines, product claims, and other important details should be confirmed by the brand.

### 8. Creator Applications

Creators can apply for published campaign opportunities.

An application may include:

- The creator and campaign identifiers.
- An optional proposal or introduction.
- Relevant portfolio references.
- Submission timestamp.
- Current application status.

A creator should be able to review their submitted applications and see their current status.

The application workflow should prevent duplicate applications to the same campaign unless the product explicitly supports resubmission.

### 9. Application Management for Brands

Brands can review applications received for their campaigns.

The workflow should allow authorized brand users to:

- View applications for their own briefs.
- Open applicant profiles and portfolios.
- Compare relevant creator information.
- Review proposals.
- Update application status.
- Identify selected creators.

Possible statuses include:

- Pending.
- Under review.
- Shortlisted.
- Accepted.
- Rejected.
- Withdrawn, if supported.

Status changes should be reflected consistently in the creator's application view.

### 10. Saved Creators

Brands can save creators they may want to work with later.

This feature supports longer-term talent discovery and reduces the need to repeat searches.

Saved creator records should belong to the appropriate brand account, and users should be able to save and remove creators through the interface.

### 11. Creator and Brand Dashboards

Each role should have a dashboard showing information relevant to its activities.

**Creator dashboard:**

- Profile completion.
- Portfolio overview.
- Recently discovered opportunities.
- Application summary.
- Application status updates.
- Saved or relevant brand opportunities, where supported.

**Brand dashboard:**

- Published and draft briefs.
- Recent applications.
- Applications requiring review.
- Saved creators.
- Campaign activity summary.

Dashboard statistics should be calculated from actual application data. Placeholder figures should be clearly identified as demo data rather than presented as live business results.

### 12. Public Profiles and Detail Pages

Creators and brands should have appropriate public-facing pages.

A creator page can present their profile, skills, portfolio, and relevant professional information.

A brand page can present its description, industry, and published campaign briefs.

Public pages must expose only information intended for public access. Private account details, internal notes, and unauthorized records must remain protected.

### 13. Responsive User Interface

INOMARK should provide a consistent experience across:

- Desktop computers.
- Laptops.
- Tablets.
- Mobile devices.

The design should emphasize visual portfolios, clear navigation, readable typography, thoughtful spacing, useful feedback states, and accessible interactions.

Animations should support the experience rather than interfere with usability.

---

## 🤖 AI-Powered Capabilities

AI is intended to improve specific marketplace tasks rather than act as a decorative chatbot.

### AI Brief Assistant

Helps brands transform rough campaign ideas into structured, editable briefs.

### Creator-Campaign Matching

A future matching system can compare campaign requirements with creator profiles, skills, niches, services, and portfolio metadata.

A simple initial matching approach could use weighted criteria:

| Matching criterion | Example starting weight |
|---|---:|
| Skills and required services | 35% |
| Creative niche relevance | 25% |
| Content type compatibility | 20% |
| Portfolio relevance | 20% |

These weights are illustrative starting values, not validated measures. They should be configurable and evaluated against real usage before being treated as effective matching scores.

### Explainable Recommendations

Where creator recommendations are implemented, the platform should explain why a creator appears relevant. For example:

- Matches the requested content type.
- Has the requested creative skills.
- Works in the relevant niche.
- Has portfolio items matching the campaign category.

The platform should avoid presenting a numerical score as proof of quality or guaranteed campaign success.

### Future AI Extensions

Possible extensions include campaign requirement extraction, portfolio tagging, recommendation refinement, and campaign performance insights where sufficient reliable data exists.

AI features should have meaningful fallback behavior and should not prevent users from completing core workflows when an AI service is unavailable.

## 🔄 User Workflows

### Creator Workflow

1. Register or log in as a creator.
2. Complete the creator profile.
3. Add portfolio items and relevant skills.
4. Explore brands and campaign briefs.
5. Open a brief and review its requirements.
6. Submit an application.
7. Track the application status.
8. Update the profile and portfolio as needed.

### Brand Workflow

1. Register or log in as a brand.
2. Complete the brand profile.
3. Discover creators using search and filters.
4. Review creator portfolios and save relevant profiles.
5. Create a campaign brief manually or with AI assistance.
6. Review and publish the brief.
7. Receive and review applications.
8. Shortlist, accept, or reject applicants.
9. Track campaign and application activity.

---

## 🛠️ Technology Stack

The following is the intended implementation stack. Confirm the actual repository and configuration files before treating every item as an existing dependency.

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| TypeScript | Type safety and maintainable application logic |
| Vite | Development server and frontend build tooling |
| Tailwind CSS | Responsive styling and design consistency |
| Supabase Auth | Authentication and session management |
| Supabase PostgreSQL | Structured marketplace data |
| Supabase Storage | Portfolio media and profile assets |
| Supabase Row Level Security (RLS) | Database-level access restrictions |
| Lucide React | Consistent interface icons |
| Framer Motion | Interface transitions and animations |
| AI API or model provider | Optional AI brief generation and recommendations |

The final stack should follow the dependencies already present in the project rather than introducing unnecessary frameworks or replacing working components without a reason.

## 🏗️ System Architecture

The intended architecture separates the user interface, application logic, and data services.

```text
                    INOMARK
                       |
             React + TypeScript UI
                       |
           Authentication and Routing
                       |
              Application Services
                 /           \
        Creator Services   Brand Services
                 \           /
                 Marketplace Data Layer
                       |
             Supabase Integration
              /        |        \
          Auth     PostgreSQL   Storage
                       |
             Optional AI Services
```

### Architectural principles

- Keep creator and brand workflows logically separated.
- Reuse components for forms, cards, filters, and dialogs.
- Validate user input before saving data.
- Keep data access separate from presentation components.
- Enforce permissions in the backend and database.
- Avoid exposing secret API keys in browser code.
- Make AI functionality optional and independently maintainable.
- Provide loading, error, empty, and success states.
- Use real persisted records for completed workflows.

## 🗄️ Database Design

A possible relational data model includes the following tables. The final schema should be aligned with the actual application and migration files.

### `profiles`

Stores user profile information associated with an authenticated account.

Possible fields:

- `id`
- `user_id`
- `role`
- `display_name`
- `avatar_url`
- `bio`
- `created_at`
- `updated_at`

### `creator_profiles`

Stores creator-specific information.

Possible fields:

- `id`
- `user_id`
- `niche`
- `skills`
- `services`
- `social_links`
- `created_at`
- `updated_at`

### `brand_profiles`

Stores brand or agency information.

Possible fields:

- `id`
- `user_id`
- `brand_name`
- `industry`
- `description`
- `website_url`
- `logo_url`
- `created_at`
- `updated_at`

### `portfolio_items`

Stores creator portfolio metadata.

Possible fields:

- `id`
- `creator_id`
- `title`
- `description`
- `category`
- `media_url`
- `created_at`
- `updated_at`

### `campaign_briefs`

Stores campaign opportunities published by brands.

Possible fields:

- `id`
- `brand_id`
- `title`
- `description`
- `deliverables`
- `required_skills`
- `budget`
- `deadline`
- `status`
- `created_at`
- `updated_at`

### `applications`

Stores creator applications to campaign briefs.

Possible fields:

- `id`
- `brief_id`
- `creator_id`
- `proposal`
- `status`
- `created_at`
- `updated_at`

### `saved_creators`

Stores creators saved by brands.

Possible fields:

- `id`
- `brand_id`
- `creator_id`
- `created_at`

### Database design considerations

- Use primary keys and foreign keys to maintain relationships.
- Add indexes for commonly queried fields where appropriate.
- Use unique constraints to prevent duplicate saved creators or applications.
- Apply appropriate validation to budgets, deadlines, and status fields.
- Define clear ownership rules for profiles, briefs, portfolios, and applications.
- Use database migrations to track schema changes.
- Never assume that hiding a button in the frontend is sufficient authorization.

## 🔐 Security and Privacy

Security is a core requirement because the marketplace handles account information, creator portfolios, brand campaign details, and application records.

Recommended safeguards include:

- Use a trusted authentication provider.
- Enable Row Level Security for relevant Supabase tables.
- Allow creators to edit only their own protected profile and portfolio records.
- Allow brands to manage only their own campaign briefs and related application workflows.
- Restrict access to private records according to the user's role and permissions.
- Validate user input on both the client and server/database side.
- Keep privileged service-role keys and AI provider secrets out of frontend code.
- Use appropriate storage permissions for public and private media.
- Avoid exposing sensitive account information through public profile pages.
- Handle authentication failures and API errors safely.

Security policies should be tested using different authenticated roles, not just the account used during development.

## 💻 Getting Started

### Prerequisites

Before running the application, ensure that the following are installed:

- Node.js — a version compatible with the project's Vite dependencies.
- npm, or the package manager used by the repository.
- Git.
- A code editor such as Visual Studio Code.
- A Supabase project if the application uses Supabase services.

### 1. Clone the repository

Replace the placeholder URL with the actual Git repository URL.

```bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_PROJECT_DIRECTORY>
```

### 2. Install dependencies

For an npm-based project:

```bash
npm install
```

### 3. Configure environment variables

Create a local `.env` file in the project root using the variables required by the application.

For a Vite application using Supabase, the configuration may look like this:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_key
```

Use the exact environment variable names expected by the project code and current Supabase client configuration.

Never commit real credentials or privileged secrets to GitHub.

### 4. Start the development server

For a typical Vite application:

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal.

### 5. Build for production

```bash
npm run build
```

### 6. Preview the production build

```bash
npm run preview
```

These commands assume the repository contains the corresponding scripts. Check `package.json` and use its actual scripts if they differ.

## ⚙️ Environment Configuration

The application may require the following configuration values, depending on which services have been implemented.

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Public client key for browser-based Supabase access |
| Server-side AI API key | Authentication with an AI provider, kept exclusively on a trusted server or serverless function |

Environment variable names vary by SDK and project configuration.

**Important:** Variables prefixed with `VITE_` are exposed to frontend code. Do not place private service-role keys, database passwords, or secret AI provider keys in them.

If AI functionality is not configured, the core marketplace should continue to support its non-AI workflows wherever possible.

## 🧪 Testing

Testing should verify that the marketplace works from the user's perspective, not just that its pages render.

### Authentication

- Register and log in successfully.
- Verify role-specific navigation.
- Verify sign-out and protected routes.
- Verify that unauthorized users cannot access protected actions.

### Creator workflows

- Create and update a creator profile.
- Add, edit, and remove portfolio items.
- Search and open brand profiles.
- View campaign briefs.
- Apply to a campaign.
- Review application status.
- Save and revisit relevant opportunities where supported.

### Brand workflows

- Create and update a brand profile.
- Search and filter creators.
- Open public creator profiles.
- Save and remove creators.
- Create, edit, and publish briefs.
- View applications for owned briefs.
- Change application status.
- Verify that unrelated brands cannot manage another brand's records.

### Data and interface

- Validate required fields and invalid input.
- Test empty, loading, success, and error states.
- Verify that changes persist after refreshing the page.
- Test responsive layouts on desktop and mobile sizes.
- Check navigation and form accessibility.
- Verify that AI failure does not break unrelated features.

### Suggested test commands

Use the commands configured in `package.json`. Common scripts may include:

```bash
npm run lint
npm run test
npm run build
```

These are examples, not a guarantee that all three scripts already exist.

## 📍 Current Development Status

INOMARK is intended to be developed incrementally, starting with the core marketplace and then extending it with AI-powered capabilities.

A suggested feature checklist is provided below. Update it to reflect the actual state of the codebase before publishing the repository.

- [ ] Creator and brand authentication
- [ ] Role-specific onboarding
- [ ] Creator profiles
- [ ] Brand profiles
- [ ] Creator portfolio management
- [ ] Creator discovery and filtering
- [ ] Brand discovery
- [ ] Campaign brief creation and publishing
- [ ] AI-assisted brief creation
- [ ] Creator applications
- [ ] Brand application management
- [ ] Saved creators
- [ ] Public profiles
- [ ] Responsive dashboards
- [ ] Supabase database integration
- [ ] Row Level Security policies
- [ ] Portfolio media storage
- [ ] Automated and end-to-end tests
- [ ] Production deployment

A visually complete page should not be marked complete if its underlying actions are still placeholders. Features should be marked as implemented only after their expected workflows have been tested.

## 🗺️ Future Enhancements

Potential future improvements include:

### 1. Smarter Creator Recommendations

Recommend creators using campaign requirements, portfolio metadata, skills, and relevant preferences.

### 2. Creator and Campaign Analytics

Provide useful summaries of application activity, campaign engagement, and creator discovery patterns when reliable data is available.

### 3. In-Platform Messaging

Introduce structured communication between brands and selected creators, with appropriate access controls.

### 4. Notifications

Notify users about new applications, status changes, relevant campaign opportunities, and other important events.

### 5. Campaign Collaboration Workspace

Support deliverable tracking, deadlines, feedback, and revision history.

### 6. Advanced Portfolio Discovery

Enable richer media previews, additional portfolio categories, and more specific search filters.

### 7. Multilingual Support

Expand accessibility for creators and brands in different regions and language communities.

### 8. Payments and Contracts

Explore secure payment and agreement workflows after the core marketplace has been validated. Payment processing, legal agreements, and creator payouts require separate design and compliance considerations.

### 9. Verification and Trust

Introduce appropriate verification, reporting, and moderation mechanisms to help build trust across the marketplace.

## 🌍 Project Impact

INOMARK aims to create value for both sides of the creator marketplace.

**For creators:**

- More structured access to brand opportunities.
- A centralized place to showcase creative work.
- Better visibility into campaign requirements.
- An organized way to apply for opportunities.
- Potential access to new clients and collaborations.

**For brands and agencies:**

- A centralized creator discovery experience.
- Less fragmented campaign management.
- Easier access to portfolios and relevant skills.
- More structured application review.
- Potentially faster identification of suitable creative talent.

**For the creator economy:**

- A more organized connection between creative talent and business demand.
- Better opportunities for emerging creators to present their work.
- A foundation for more intelligent discovery and collaboration.

These are intended benefits. Actual improvements in discovery time, conversion rates, creator income, or campaign performance should be measured after the platform has real users and reliable usage data.

## 🤝 Contributing

Contributions and suggestions are welcome.

A recommended contribution workflow is:

1. Fork or clone the repository.
2. Create a separate branch for your change.
3. Implement the feature or fix.
4. Test the affected workflows.
5. Check formatting, linting, and build results.
6. Submit a pull request with a clear explanation of the change.

Keep changes focused, avoid committing secrets, and update the documentation when application behavior or setup instructions change.

## 📄 License

No license has been specified in this README.

Before publishing the repository, choose an appropriate license and add the corresponding `LICENSE` file. If the project is private or contains code, assets, or designs that cannot be redistributed, confirm the relevant ownership and permissions before making it public.

## 👨‍💻 Project Summary

**INOMARK is an AI-powered creator marketplace that connects AI content creators with brands and agencies through creator discovery, portfolios, campaign briefs, applications, and intelligent assistance.**

The long-term vision is to make creator discovery and brand collaboration more organized, accessible, and efficient through a unified platform.

---

*INOMARK — Discover Talent. Create Opportunities. Build Together.*
