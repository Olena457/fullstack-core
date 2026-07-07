# Quiz Builder Platform

A full-stack web application that allows users to create custom quizzes with various types of questions, view a dashboard of all available quizzes, and inspect quiz details in a read-only mode.

## 🛠 Tech Stack

**Backend:**
* Node.js with NestJS
* TypeScript
* Prisma ORM
* PostgreSQL (Supabase)

**Frontend:**
* React.js (v19)
* Next.js (App Router)
* TypeScript
* Material-UI (MUI) for styling and responsive design
* React Hook Form & Yup for dynamic form handling and validation
* Zustand / Redux (State Management)
* Lucide React (Icons)

---

## 📁 Project Structure

This project is organized as a monorepo containing two main directories:
* `/apps/backend` - Contains the NestJS REST API and Prisma database schema.
* `/apps/frontend` - Contains the Next.js user interface.

---

## ⚙️ Environment Setup & Database Configuration

Before running the application, you must configure the database connection. This project uses PostgreSQL.

Create a `.env` file in the root of the `apps/backend` folder and add your PostgreSQL connection strings and the port configuration:
```env
DATABASE_URL="your_postgresql_connection_string"
DIRECT_URL="your_postgresql_direct_connection_string"
PORT=4000