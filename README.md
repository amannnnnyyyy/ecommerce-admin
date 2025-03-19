# E-commerce Platform with Dashboard

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Contributors](https://img.shields.io/github/contributors/amannnnnyyyy/ecommerce-admin)](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/graphs/contributors)
[![Forks](https://img.shields.io/github/forks/amannnnnyyyy/ecommerce-admin)](https://github.com/amannnnnyyyy/ecommerce-admin/network/members)
[![Stars](https://img.shields.io/github/stars/amannnnnyyyy/ecommerce-admin)](https://github.com/amannnnnyyyy/ecommerce-admin/stargazers)
[![Issues](https://img.shields.io/github/issues/amannnnnyyyy/ecommerce-admin)](https://github.com/amannnnnyyyy/ecommerce-admin/issues)

<!-- <p align="center">
  <img src="path/to/your/project/screenshot.png" alt="Project Screenshot" width="800">
</p> -->

## Description

This project provides a comprehensive e-commerce platform, featuring both a user-facing store and a powerful administrative dashboard. The store enables users to browse products, add them to their cart, and complete purchases via Stripe. The dashboard empowers administrators to manage products, categories, stores, and API routes. Built with modern technologies, this platform offers a seamless and scalable solution for online retail.

## Features

**E-commerce Store:**

* **Product Browsing:** Intuitive interface for viewing and filtering products by color and size.
* **Detailed Product Pages:** Rich product information with image galleries and related item suggestions.
* **Shopping Cart:** Easy management of selected items.
* **Stripe Integration:** Secure and reliable payment processing.
* **Responsive Design:** Optimized for various devices.

**Dashboard:**

* **Store Management:** Create and manage multiple e-commerce stores.
* **Category Management:** Add, edit, and delete product categories.
* **Product Management:** Add, edit, and delete products with detailed specifications.
* **API Route Generation:** Dynamically create API endpoints.
* **User Authentication:** Secure access using Clerk.
* **Real-time Notifications:** Toaster integration for instant feedback.

## Technologies Used

* **Frontend:**
    * React.js
    * Next.js
    * Shadcn UI
    * Tailwind CSS
* **Backend:**
    * Next.js API Routes
* **Database:**
    * Supabase
* **Authentication:**
    * Clerk
* **Payments:**
    * Stripe
* **Notifications:**
    * Toaster

## Getting Started

### Prerequisites

* Node.js (>= 18)
* npm or yarn
* Supabase account
* Stripe account
* Clerk account

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/amannnnnyyyy/ecommerce-admin.git](https://www.google.com/search?q=https://github.com/amannnnnyyyy/ecommerce-admin.git)
    cd ECOMMERCE-ADMIN
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**

    * Create a `.env.local` file in the root directory.
    * Add the necessary environment variables.
        ```
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
        CLERK_SECRET_KEY=your_clerk_secret_key
        DATABASE_URL=your_Supabase_database_url
        STRIPE_SECRET_KEY=your_stripe_secret_key
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
        ```
4.  **Set up Supabase:**
    * Create a database within your Supabase account.
    * Use the provided database URL in your `.env.local` file.
5.  **Set up Clerk:**
    * create an application on clerk.dev and add the keys to the .env.local file.
6.  **Set up Stripe:**
    * Create a stripe account and add the keys to the .env.local file.

7.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

8.  Open your browser and navigate to `http://localhost:3000`.

## Deployment

1.  **Build the application:**

    ```bash
    npm run build
    # or
    yarn build
    ```

2.  **Deploy to your hosting platform (e.g., Vercel, Netlify):**

    * Follow the deployment instructions provided by your hosting platform.
    * Ensure that your environment variables are correctly configured in your hosting environment.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them.
4.  Push your changes to your fork.
5.  Submit a pull request.


## Acknowledgments

* Shadcn UI for providing beautiful and accessible UI components.
* Supabase for the reliable database service.
* Clerk for simple and secure authentication.
* Stripe for making payments easy.

## Contact

* Your Name: Amanuel Moha
* Email: amanuelmoha.official@gmail.com
* GitHub: [Amanuel Moha](https://github.com/amannnnnyyyy)