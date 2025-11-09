# Next.js Docker Template

## Description

This project is a template for packaging a Next.js application into a Docker image and running it in a Docker container. It provides a complete Dockerization solution with multi-architecture support (AMD64 and ARM64), making it easy to deploy to any Docker-compatible environment.

## Tech Stack

- **Next.js** - React framework for building full-stack web applications
- **Supabase** - Backend-as-a-Service (BaaS) providing authentication and database functionality
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe superset of JavaScript

## Features

### 1. User Authentication System
- ✅ User registration
- ✅ User login
- ✅ User logout

### 2. Route Protection
- ✅ Authentication middleware to intercept unauthenticated users
- ✅ Automatic redirect to homepage
- ✅ Protection for authenticated pages

## Quick Start

### Running with Docker Image (Recommended)

#### 1. Pull the Image

```bash
docker pull gl767077147/nextjs-docker-template:latest
```

#### 2. Run the Container

**Run with environment variables(Must):**

```bash
docker run -d -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_supabase_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key \
  --name nextjs-app \
  gl767077147/nextjs-docker-template:latest
```
  
  
1. Access the Application

Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

### Local Development

#### 1. Clone the Repository
```bash
git clone https://github.com/fortune-cook1e/nextjs-docker-template.git

cd nextjs-docker-template
```

#### 2. Install Dependencies

pnpm install

#### 3. Configure Environment Variables

Create a `.env.local` file and add the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### 4. Start the Development Server

```bash
pnpm dev
```

## Docker Commands Reference

### View Running Containers
```bash
docker ps # View Container Logs

docker logs nextjs-app # View Logs in Real-time

docker logs -f nextjs-app
```

### Stop Container
```bash
docker stop nextjs-app # Start Stopped Container

docker start nextjs-app # Remove Container

docker rm nextjs-app # Enter Container

docker exec -it nextjs-app
```

## Building Docker Image
If you want to build the image yourself:

```bash
docker build -t nextjs-docker-template:latest .
```

## CI/CD

The project is configured with GitHub Actions that automatically:
- Build multi-architecture Docker images (AMD64 and ARM64)
- Push to Docker Hub on every push to the `main` branch


