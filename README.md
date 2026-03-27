# CareerReady

A comprehensive career readiness platform designed to help students track their professional development, manage skills and experiences, and discover career opportunities. Built with Next.js, TypeScript, and modern web technologies.

## Quick Start

Get CareerReady running on your local machine in just a few minutes.

### Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **pnpm** (recommended package manager) - Install with: `npm install -g pnpm`
- **Git** (for cloning the repository)

### Step 1: Clone the Repository

```bash
git clone https://github.com/Tito-21/careerReady.git
cd careerReady
```

### Step 2: Install Dependencies

Using pnpm (recommended):
```bash
pnpm install
```

Or using npm:
```bash
npm install
```
### Step 4: Run the Development Server

```bash
pnpm dev
```

Or with npm:
```bash
npm run dev
```

### Step 5: Access the Application

Open your browser and navigate to:
- **Main Application:** [http://localhost:3000](http://localhost:3000)
- **Mock Login:** [http://localhost:3000/login-mock](http://localhost:3000/login-mock)


#### Student Account
- **Email:** `tito@alu.edu`
- **Password:** `password123`
- **Role:** Student

#### Coach Account  
- **Email:** `mugisha.chris@alu.edu`
- **Password:** `password123`
- **Role:** Career Coach

#### Admin Account
- **Email:** `admin@alu.edu`
- **Password:** `password123`
- **Role:** Administrator

## Project Structure

```
careerReady/
├── app/                    # Next.js app router pages
│   ├── (dashboard)/        # Protected dashboard routes
│   ├── login/             # Main login page
│   ├── login-mock/        # Mock login page
│   ├── register/          # User registration
│   └── profile-mock/      # Mock profile page
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn/ui components
│   └── hydration-fix.tsx # Client-side hydration fix
├── lib/                  # Utility libraries
│   ├── auth-context.tsx  # Authentication context
│   ├── mock-auth-context.tsx # Mock auth system
│   └── mock-data.ts      # Sample data
└── public/               # Static assets
```

## Features

### For Students
- **Personal Dashboard** - Track career readiness progress
- **Skills Management** - Add and showcase technical and soft skills
- **Experience Tracking** - Document internships, projects, and achievements
- **Opportunity Discovery** - Browse and apply for career opportunities
- **Profile Management** - Professional profile with portfolio links

### For Career Coaches
- **Student Management** - View and manage assigned students
- **Progress Tracking** - Monitor student career readiness
- **Feedback System** - Provide guidance and recommendations
- **Analytics Dashboard** - Insights on student performance

### For Administrators
- **User Management** - Manage all system users
- **System Configuration** - Configure platform settings
- **Reports & Analytics** - Comprehensive system insights

### Available Scripts

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Type checking
pnpm type-check
```

---

