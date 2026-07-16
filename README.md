# 🍿 MovieMania

MovieMania is a sleek, modern, and production-ready React application for searching and exploring movies. Powered by **Vite** and **Tailwind CSS v4**, it interfaces with the external **OMDb API** to fetch movie details (ratings, plot, actors, directors, box office, etc.) dynamically.

---

## 🚀 Features

- **Dynamic Movie Search**: Instant search with built-in debouncing (500ms) to reduce API request overhead.
- **Detailed Modal Views**: View comprehensive details including Director, Cast, Box Office, Genre pills, Year, Language, and Plot outline.
- **Loading Indicators**: High-performance spinning animations for seamless transitions.
- **Error Handlers**: Real-time error alerts via React Hot Toast for network failures or missing results.
- **Dockerized**: Fully containerized using a multi-stage Docker build, serving optimized production assets through Nginx.
- **Production Ready**: Optimized scripts, configuration setups, zero-error ESLint compliance, and pre-configured Netlify redirection rules.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 (using `@tailwindcss/vite` and modern custom utilities)
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Linter**: ESLint (Flat Config)
- **Containerization**: Docker (Node.js Build Stage + Nginx Production Stage)

---

## 📦 Local Setup and Installation

Follow these steps to run the project locally on your machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) and `npm` installed.

### 1. Install Dependencies

In the root of the project directory, run:

```bash
npm install
```

### 2. Configure Environment Variables

The application relies on the OMDb API. You need to obtain a free API key from [OMDb API Key Request](http://www.omdbapi.com/apikey.aspx).

Once you have your key, copy the template `.env.example` file and create a `.env` file:

```bash
cp .env.example .env
```

Open `.env` and replace the placeholder value with your key:

```env
VITE_OMDB_API=your_omdb_api_key_here
```

### 3. Run Development Server

To launch the project in development mode with Hot Module Replacement (HMR):

```bash
npm run dev
```

Your app will be running at `http://localhost:5173`.

---

## 🐳 Running with Docker

To containerize and run the application locally or in a cloud environment using Docker, follow these instructions.

### 1. Build the Docker Image

Since Vite packages environment variables at build-time, you must pass your OMDb API key as a build argument using `--build-arg`:

```bash
docker build --build-arg VITE_OMDB_API="your_api_key_here" -t moviemania .
```

### 2. Run the Container

Run the built image mapping port 80 in the container to port 8080 (or any port of your choice) on your host:

```bash
docker run -d -p 8080:80 --name moviemania-app moviemania
```

Now, navigate to `http://localhost:8080` in your web browser.

---

## ☁️ Production Build & Netlify Deployment

### Local Production Build

To compile and optimize the app for production:

```bash
npm run build
```

This generates a static build directory named `dist`. You can preview the production bundle locally with:

```bash
npm run preview
```

### Hosting on Netlify

This project is fully configured for Netlify out of the box using [netlify.toml](netlify.toml):

1. **Deploying via Git (Recommended)**:
   - Push your code to a Git repository (GitHub, GitLab, Bitbucket).
   - Link the repository to Netlify.
   - Netlify will automatically detect the configuration in `netlify.toml`:
     - **Build Command**: `npm run build`
     - **Publish Directory**: `dist`
     - **Redirect Rules**: Configured to map all routes (`/*`) to `/index.html` to avoid 404 errors if client-side routing is introduced.
2. **Environment Variables on Netlify**:
   - Go to your Netlify dashboard -> **Site Configuration** -> **Environment variables**.
   - Add a new variable:
     - **Key**: `VITE_OMDB_API`
     - **Value**: `your_actual_omdb_api_key_here`
   - Trigger a new deploy.

---

## 🧹 Quality Control

To run lint checks and verify code quality:

```bash
npm run lint
```
