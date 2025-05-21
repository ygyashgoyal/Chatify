````markdown
# Full Stack Chatbot & Portfolio Website with Google OAuth Integration

## Overview

**Full Stack Chatbot Application**  
   A Next.js app integrated with Supabase Auth + PostgreSQL backend, allowing users to upload PDFs and chat with the content via the Gemini API. All chat sessions are stored securely.


Additionally, this README includes a **Google OAuth Setup Guide** to configure authentication for your apps.

---

## Table of Contents

- [Chatbot Application](#chatbot-application)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Setup Instructions](#setup-instructions)
  - [Database Schema](#database-schema)
  - [Usage](#usage)
- [Personal Portfolio Website](#personal-portfolio-website)
  - [Features](#portfolio-features)
  - [Footer Usage](#footer-usage)
- [Google OAuth Setup Guide](#google-oauth-setup-guide)
  - [Step 1: Create Google Cloud Project](#step-1-create-google-cloud-project)
  - [Step 2: Configure OAuth Consent Screen](#step-2-configure-oauth-consent-screen)
  - [Step 3: Create OAuth Credentials](#step-3-create-oauth-credentials)
  - [Step 4: Configure Redirect URIs](#step-4-configure-redirect-uris)
  - [Step 5: Add Client ID and Secret to Your App](#step-5-add-client-id-and-secret-to-your-app)
- [Contact](#contact)
- [License](#license)

---

## Chatbot Application

### Features

- User authentication with Supabase (email/password & OAuth)
- PDF upload and server-side text extraction with `pdfjs-dist`
- Chatbot powered by Gemini API that answers questions about uploaded PDFs
- Persistent chat history stored in Supabase PostgreSQL
- Secure access: only logged-in users can use chatbot features

### Tech Stack

- Frontend: Next.js, React, Tailwind CSS (optional)
- Backend: Next.js API routes, Supabase Functions
- Authentication: Supabase Auth
- Database: Supabase PostgreSQL
- PDF Parsing: `pdfjs-dist`
- Chatbot API: Gemini API

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/ygyashgoyal/Chatify.git
   cd Chatify
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create Supabase project**

   * Visit [Supabase](https://supabase.com/)
   * Create a new project
   * Note `SUPABASE_URL` and `SUPABASE_ANON_KEY`

4. **Set up database schema**

   In Supabase SQL Editor, run:

   ```sql
   -- Table: chats
   CREATE TABLE chats (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES auth.users(id),
     message TEXT NOT NULL,
     response TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

5. **Configure environment variables**

   Create `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

6. **Run development server**

   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000)

### Usage

* Register/login with Supabase Auth
* Upload PDF files to chat with their content
* View and interact with chat history
* Logout securely

---

## Personal Portfolio Website

### Portfolio Features

* Responsive design for desktop and mobile
* Sticky footer fixed to bottom of the page
* Footer includes clickable links to:

  * LinkedIn
  * GitHub
  * Personal Portfolio

---

## Google OAuth Setup Guide

### Prerequisites

* Google account
* Access to [Google Cloud Console](https://console.cloud.google.com/)
* Your app domain or `localhost` for development

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (e.g., `My App OAuth`)

### Step 2: Configure OAuth Consent Screen

1. Navigate to **APIs & Services > OAuth consent screen**
2. Select **External**
3. Fill in app name, support email, developer contact
4. Save and continue

### Step 3: Create OAuth Credentials

1. Go to **APIs & Services > Credentials**
2. Click **Create Credentials > OAuth client ID**
3. Select **Web application**
4. Name your client (e.g., `MyApp Web Client`)

### Step 4: Configure Redirect URIs

Add authorized redirect URIs, for example:

* `http://localhost:3000/api/auth/callback/google` (local)
* `https://yourdomain.com/api/auth/callback/google` (production)

### Step 5: Add Client ID and Secret to Your App

Add the generated credentials securely as environment variables:

```env
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_URL=http://localhost:3000
```

### Security Best Practices

* Never commit secrets to version control
* Use environment variables or secret managers
* Restrict redirect URIs to trusted domains

---

## Contact

* Email: [yashgoyal2k5@gmail.com](mailto:yashgoyal2k5@gmail.com)
* LinkedIn: [https://www.linkedin.com/in/yourprofile](https://www.linkedin.com/in/yash-goyal-8642b1253/)
* GitHub: [https://github.com/yourusername](https://github.com/yourusername)
* Portfolio: [[https://yourportfolio.com](https://yourportfolio.com](https://github.com/ygyashgoyal)

---

## License

This project is licensed under the MIT License.

---

*Made with ❤️ by Yash Goyal*

```
