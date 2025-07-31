# Boon - A Modern E-commerce Platform

Boon is a full-stack, feature-rich e-commerce web application built with a modern technology stack. It provides a seamless shopping experience with features like user authentication, product browsing, a shopping cart, and a complete checkout process. The project is built using the Next.js App Router, ensuring a highly performant and scalable architecture.

## Features

- **Complete E-commerce Flow**: From browsing products to placing an order.
- **User Authentication**: Secure sign-up, sign-in with credentials, and social login (Google, Facebook) powered by NextAuth.js (Auth.js v5).
- **Product Discovery**:
  - Advanced product filtering by category, brand, and price.
  - Sorting options (Newest, Price, Name).
  - Dedicated search functionality.
- **Product Details**: Detailed product pages with image galleries, descriptions, stock counts, and customer reviews.
- **Shopping Cart**: Add, update, and remove items from the cart with persistent state.
- **Wishlist**: Save favorite items for later.
- **Multi-Step Checkout**: A streamlined checkout process for shipping and payment information.
- **User Profile**:
  - View order history.
  - Manage and view personal reviews.
  - Edit profile information and default shipping address.
- **Responsive Design**: A beautiful and intuitive UI built with **shadcn/ui** and **Tailwind CSS**, optimized for all screen sizes.
- **Theming**: Switch between light and dark modes.
- **Server-Side Logic**: Efficient data fetching using Next.js Server Components and Server Actions.
- **State Management**: Robust client-side and server-side state management with **TanStack Query (React Query)**.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 15 (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 4 & [shadcn/ui](https://ui.shadcn.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) v5 (Auth.js)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest) v5
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation
- **API Client**: [Axios](https://axios-http.com/)
- **UI Components**: Radix UI, Lucide Icons, Embla Carousel
- **Linting**: ESLint

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js (v20 or later)
- npm or yarn
- A running instance of the backend API.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd boon-front-end
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project by copying the example file.

```bash
cp .env .env.local
```

Now, fill in the necessary values in your `.env.local` file.

```dotenv
# API Configuration
# URL of your running backend e-commerce API
NEXT_PUBLIC_API_BASE_URL=http://localhost:3500/api/v1

# NextAuth.js Configuration
# Generate a secret using: `openssl rand -base64 32`
AUTH_SECRET=YOUR_AUTH_SECRET
AUTH_URL=http://localhost:3000

# Obtain these credentials from the Google Cloud Console
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

# Obtain these credentials from the Facebook for Developers portal
FACEBOOK_CLIENT_ID=YOUR_FACEBOOK_CLIENT_ID
FACEBOOK_CLIENT_SECRET=YOUR_FACEBOOK_CLIENT_SECRET
```

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev`: Starts the development server with Next.js Turbopack.
- `npm run build`: Creates a production-ready build of the application.
- `npm run start`: Starts the production server.
- `npm run lint`: Lints the project files using ESLint.

## Project Structure

The project follows a standard Next.js App Router structure with a focus on feature-colocation.

```
/src
├── actions/          # Server Actions for mutations
├── app/              # Main application routes (App Router)
│   ├── (auth)/       # Auth-related pages (login, register)
│   ├── (main)/       # Core app pages with shared layout
│   ├── api/          # API routes (e.g., NextAuth.js handler)
│   └── layout.tsx    # Root layout
├── components/       # Reusable React components
│   ├── auth/
│   ├── cart/
│   ├── checkout/
│   ├── products/
│   ├── profile/
│   ├── reviews/
│   └── ui/           # UI components from shadcn/ui
├── lib/              # Core logic, services, and utilities
│   ├── api.ts        # Server-side Axios instance creation
│   ├── auth.ts       # NextAuth.js configuration
│   ├── queries/      # TanStack Query hooks
│   ├── services/     # API service classes for data fetching
│   └── validation/   # Zod schemas for validation
└── types/            # TypeScript type definitions
```
