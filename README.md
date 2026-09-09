# 🎧 Customer Support Dashboard

A modern and responsive **Customer Support Dashboard** built with **React.js** and **Tailwind CSS** for managing and monitoring customer support tickets.

The application provides a clean support-management interface with ticket data fetched from a REST API, centralized state management, responsive UI components, and proper handling of loading, error, and empty states.

The frontend is deployed on **Vercel**, while a local `json-server` instance is used as a mock backend during development.

---

## 🚀 Live Demo

**Production:** [https://customer-support-dashboard-tau.vercel.app/]

**GitHub Repository:** [https://github.com/manishsharmadeveloper/Customer-Support-Dashboard.git]

---

## 📌 Project Overview

The Customer Support Dashboard is designed to provide support teams with an organized interface for viewing and managing customer support tickets.

### Key capabilities

* 📊 Customer support dashboard
* 🎫 Ticket management
* 🔍 Ticket data retrieval through REST API
* ⚡ Centralized state management
* 📱 Fully responsive interface
* 🎨 Modern UI built with Tailwind CSS
* ⏳ Loading state handling
* ❌ Error state handling
* 📭 Empty state handling
* 🌐 REST API integration
* 🗄️ Mock backend using JSON Server
* ☁️ Production deployment using Vercel

---

# ✨ Features

## 🎫 Ticket Management

The dashboard displays customer support ticket information retrieved from a REST API.

Typical ticket information can include:

* Customer name
* Ticket title
* Ticket description
* Ticket status
* Priority
* Category
* Created date
* Updated date
* Assigned support agent

---

## 🔄 API Integration

Ticket information is retrieved from a REST API.

During local development, the application uses:

```text
JSON Server
```

with the project's `db.json` file as the mock database.

Example local API:

```text
http://localhost:3000
```

---

## 🧠 State Management

The application uses centralized state management to maintain and share application data across components.

**State Management:** Zustand

State management is used for handling application-level data such as:

* Ticket data
* Loading status
* Error states
* Selected ticket information
* UI/application state

---

## ⏳ Loading States

The application provides appropriate feedback while API requests are being processed.

This prevents users from seeing a blank interface while data is loading.

---

## ❌ Error Handling

API and application errors are handled gracefully.

Instead of leaving the user with a blank screen, the dashboard displays an appropriate error state.

---

## 📭 Empty States

When no ticket data is available, the application displays a dedicated empty state instead of an empty dashboard.

---

## 📱 Responsive Design

The dashboard is designed to work across different screen sizes, including:

* Desktop
* Laptop
* Tablet
* Mobile

The responsive UI is implemented using **Tailwind CSS**.

---

# 🛠️ Tech Stack

| Technology   | Purpose                       |
| ------------ | ----------------------------- |
| React.js     | Frontend UI                   |
| Tailwind CSS | Styling and responsive design |
| Zustand      | State management              |
| REST API     | Ticket data communication     |
| JSON Server  | Mock backend/API              |
| JavaScript   | Application logic             |
| Vite         | Development and build tooling |
| Git          | Version control               |
| GitHub       | Source code repository        |
| Vercel       | Frontend deployment           |
| ChatGPT      | AI-assisted development       |

---

# 📂 Project Structure

The project follows a component-based React architecture.

```text
customer-support-dashboard/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── ...
│   │
│   ├── pages/
│   │   ├── ...
│   │
│   ├── store/
│   │   ├── ...
│   │
│   ├── services/
│   │   ├── ...
│   │
│   ├── hooks/
│   │   ├── ...
│   │
│   ├── utils/
│   │   ├── ...
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── db.json
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

> The exact structure may vary depending on the implementation of the project.

---

# ⚙️ Prerequisites

Before running the project, make sure the following are installed:

### Node.js

Install a current supported version of Node.js:

https://nodejs.org/

Verify the installation:

```bash
node --version
```

```bash
npm --version
```

### Git

Install Git:

https://git-scm.com/

Verify:

```bash
git --version
```

---

# 🔧 Installation & Setup

Follow the steps below to run the project locally.

## Step 1 — Clone the Repository

Clone the GitHub repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate into the project directory:

```bash
cd customer-support-dashboard
```

Open the project in your preferred code editor.

For Visual Studio Code:

```bash
code .
```

---

## Step 2 — Install Dependencies

Install all required npm packages:

```bash
npm install
```

---

## Step 3 — Configure Environment Variables

Create a `.env` file in the root directory of the project.

```text
.env
```

The repository includes an `.env.example` file containing the required environment variable structure.

Copy the values/variable names from:

```text
.env.example
```

and create your local:

```text
.env
```

### Example

```env
VITE_API_URL=http://localhost:3000
```

> Use the exact variable names provided in your project's `.env.example` file.

### Important

Do **not** commit your `.env` file to GitHub if it contains private credentials, API keys, tokens, or other secrets.

The `.env` file should be included in `.gitignore`.

---

# ▶️ Running the Project

The project requires the frontend and mock backend to run during local development.

## Step 4 — Start the Frontend

Run:

```bash
npm run dev
```

Vite will provide a local development URL, typically:

```text
http://localhost:5173
```

Open the displayed URL in your browser.

---

## Step 5 — Start the Backend

Open another terminal in the project root and run:

```bash
npx json-server db.json --port 3000
```

The mock REST API will then be available at:

```text
http://localhost:3000
```

You should keep both terminals running:

```text
Terminal 1 → React/Vite frontend
Terminal 2 → JSON Server backend
```

---

# 🔌 API Configuration

The application communicates with the mock REST API through the configured API base URL.

For local development:

```text
http://localhost:3000
```

JSON Server automatically creates REST endpoints based on the structure of `db.json`.

For example, if `db.json` contains:

```json
{
  "tickets": []
}
```

the tickets endpoint will be:

```text
GET http://localhost:3000/tickets
```

Other REST operations can include:

```text
GET     /tickets
GET     /tickets/:id
POST    /tickets
PUT     /tickets/:id
PATCH   /tickets/:id
DELETE  /tickets/:id
```

The exact endpoints depend on the data structure defined in `db.json`.

---

# 📜 Available Scripts

The following npm scripts are commonly available:

### Start development server

```bash
npm run dev
```

### Create production build

```bash
npm run build
```

### Preview production build locally

```bash
npm run preview
```

### Run linting

```bash
npm run lint
```

> Available commands depend on the scripts configured in `package.json`.

---

# 🏗️ Production Build

Before deploying the application, create an optimized production build:

```bash
npm run build
```

The generated production files are placed in:

```text
dist/
```

You can preview the production build locally:

```bash
npm run preview
```

---

# ☁️ Deployment

## Vercel

The frontend is deployed using **Vercel**.

### Deploy using GitHub

1. Push the project to GitHub.
2. Log in to [Vercel](https://vercel.com/).
3. Select **Add New Project**.
4. Import the GitHub repository.
5. Configure the project.
6. Add the required environment variables.
7. Deploy the application.

For a Vite application, Vercel generally detects the framework automatically.

### Typical build configuration

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

Use the environment variables required by your actual `.env.example` file.

---

# ⚠️ Important: Mock Backend in Production

The project uses **JSON Server** as a mock REST API for development/testing.

JSON Server is not intended to be used as a production database/backend service.

For a real production application, the mock API can be replaced with a backend such as:

* Node.js + Express
* Laravel
* Django
* Spring Boot
* Supabase
* Firebase
* PostgreSQL/MySQL-backed API
* Other production REST/GraphQL APIs

The frontend API layer can then be configured to point to the production API URL.

---

# 🔐 Environment Variables

Environment variables allow configuration to be separated from application source code.

Example:

```env
VITE_API_URL=http://localhost:3000
```

For Vercel, add environment variables from:

```text
Vercel Dashboard
→ Project
→ Settings
→ Environment Variables
```

### Security

Never commit sensitive values such as:

```text
API keys
Access tokens
Private keys
Database passwords
Authentication secrets
```

to GitHub.

---

# 🧪 Development Workflow

A typical development workflow is:

```text
1. Clone repository
       ↓
2. Install dependencies
       ↓
3. Configure .env
       ↓
4. Start JSON Server
       ↓
5. Start React/Vite
       ↓
6. Develop and test features
       ↓
7. Run lint/build
       ↓
8. Commit changes
       ↓
9. Push to GitHub
       ↓
10. Deploy through Vercel
```

---

# 🤖 AI Tools Usage

### ChatGPT

**ChatGPT** was used as an AI-assisted development tool during the project.

It was used for tasks such as:

* Development guidance
* Debugging assistance
* Error analysis
* Code improvement suggestions
* React development support
* Tailwind CSS assistance
* Documentation/README preparation
* Development workflow guidance

AI-generated suggestions were reviewed and adapted as needed during implementation.

---

# 📐 Design & Development Principles

The project follows common frontend development practices, including:

* Component-based architecture
* Reusable React components
* Centralized state management
* Separation of API/service logic
* Responsive design
* Utility-first CSS
* Environment-based configuration
* Proper loading/error/empty states
* Production build optimization
* Git-based version control

---

# 🐛 Troubleshooting

## `npm` is not recognized

Make sure Node.js is installed and added to your system PATH.

Check:

```bash
node --version
```

```bash
npm --version
```

---

## API request failed

Make sure JSON Server is running:

```bash
npx json-server db.json --port 3000
```

Then verify that the API is accessible:

```text
http://localhost:3000
```

Also verify that your `.env` API URL matches the backend URL.

---

## Port 3000 is already in use

Run JSON Server on another port:

```bash
npx json-server db.json --port 3001
```

Then update your frontend API environment variable accordingly.

---

## Frontend is not starting

Try reinstalling dependencies:

```bash
rm -rf node_modules
```

On Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules
```

Then:

```bash
npm install
npm run dev
```

---

# 🔄 Git Workflow

After making changes:

```bash
git status
```

Add the changes:

```bash
git add .
```

Create a commit:

```bash
git commit -m "feat: update customer support dashboard"
```

Push to GitHub:

```bash
git push
```

---

# 📌 Future Improvements

Potential future enhancements include:

* 🔐 User authentication and authorization
* 👥 Role-based access control
* 🎫 Create/update/delete ticket functionality
* 🔎 Advanced ticket search
* 🏷️ Ticket filtering by status and priority
* 📊 Support analytics and reporting
* 📈 Dashboard charts
* 🔔 Real-time notifications
* 💬 Customer-agent communication
* 📎 File attachments
* 🌐 Production backend integration
* 🗄️ Persistent database
* 🧪 Automated testing
* 🚀 CI/CD pipeline

---

# 📄 License

This project is intended for educational, portfolio, and demonstration purposes.

Add your preferred license here if you intend to distribute the project publicly.

For example:

```text
MIT License
```

---

# 👨‍💻 Author

**Manish Kumar Sharma**

Software Developer

GitHub: [Add your GitHub profile URL]

Portfolio: [Add your portfolio URL]

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---
