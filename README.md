# Onboard Form Project

Explore the live demo here: [Employee Onboarding Form](https://employee-onboarding-m360.netlify.app/)

This is a multi-step onboarding form built with **Next.js**, **React**, **React Hook Form**, **Zod**, and **shadcn/ui** components. It demonstrates a complex form workflow with proper validations, file uploads, and dynamic field handling.

---

## How to Run the Project

### Prerequisites

- Node.js >= 18
- npm or yarn
- Git

### Steps

1. Clone the repository:

```bash
git clone https://github.com/mahbubnoyon506/m360-form-validation
cd m360-form-validation
Install dependencies:

npm install
# or
yarn install

Run the development server:

npm run dev
# or
yarn dev
Open your browser at http://localhost:3000

To build for production:

npm run build
npm start
```

Complex Logic Handling:

Multi-Step Form

The form is divided into 5 steps: Personal, Job, Skills, Emergency, Review.

State is preserved across steps using React useState.

Navigation between steps is handled via nextStep and prevStep functions.

Form Validation

Used Zod schemas for strict and user-friendly validation.

Each step has a dedicated schema (Step1Personal, Step2Job, Step3Skills).

Validation messages are customized for user clarity.

Age check (minimum 18 years)

Salary range based on job type

Start date restrictions (cannot be past, weekend restrictions for certain departments, max 90 days in future)

Working hours check (start < end)

Reusable Components

Assumptions:
Users must be at least 18 years old.

HR and Finance cannot have start dates on weekends.

Salary ranges differ for full-time, part-time, and contract positions.

Profile picture is optional but must be JPG/PNG and ≤ 2MB if uploaded.

Phone numbers follow the format: +<country code>-xxx-xxx-xxxx.

Multi-step form persists state only during the session; no backend persistence implemented.

TypeScript any is allowed for dynamic or complex objects where strict typing is not feasible.

Date fields are received as strings in ISO format.
