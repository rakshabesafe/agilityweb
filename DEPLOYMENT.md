# Deployment Guide

This document outlines how to deploy the Nutrio clone e-commerce application on Google Cloud Platform (GCP) and Zoho Cloud.

## Deployment on Google Cloud Platform (GCP)

There are two primary native ways to deploy this Next.js application on GCP: Google App Engine and Google Cloud Run.

### Option 1: Google App Engine (Standard Environment)

Google App Engine is a fully managed, serverless platform.

1.  **Prerequisites:**
    *   Install the [Google Cloud SDK (gcloud CLI)](https://cloud.google.com/sdk/docs/install).
    *   Initialize the CLI and login: `gcloud init`
    *   Ensure billing is enabled for your GCP project.

2.  **Build the application:**
    ```bash
    npm run build
    ```

3.  **Deploy using the provided `app.yaml`:**
    The `app.yaml` file in the root directory contains the configuration for App Engine.
    ```bash
    gcloud app deploy
    ```
    *(Note: App Engine standard environment for Node.js runs `npm start` by default. Ensure your `package.json` has `"start": "next start"`).*

### Option 2: Google Cloud Run (Containerized)

Cloud Run is a serverless execution environment for containerized applications. This is generally preferred for Next.js apps with custom Dockerfiles.

1.  **Prerequisites:**
    *   Google Cloud SDK installed.
    *   Docker installed locally (optional, but helpful for testing).
    *   Enable the Cloud Run and Container Registry/Artifact Registry APIs in your GCP project.

2.  **Build and Submit the Container Image:**
    ```bash
    gcloud builds submit --tag gcr.io/[YOUR_PROJECT_ID]/nutrio-app
    ```

3.  **Deploy to Cloud Run:**
    ```bash
    gcloud run deploy nutrio-app \
      --image gcr.io/[YOUR_PROJECT_ID]/nutrio-app \
      --platform managed \
      --region us-central1 \
      --allow-unauthenticated
    ```

---

## Deployment on Zoho Cloud (Zoho Catalyst)

Zoho Catalyst is a full-stack pro-code Serverless platform by Zoho. To deploy a Next.js App Router application on Zoho Catalyst, you use the "Web Client" or "App Sail" (PaaS) features. The easiest method for a full Next.js SSR app is using App Sail, which runs containerized applications.

### Deploying via Zoho App Sail

1.  **Prerequisites:**
    *   Install the [Zoho Catalyst CLI](https://catalyst.zoho.com/help/cli/installation.html).
    *   Login to your Zoho account: `catalyst login`

2.  **Initialize App Sail Project:**
    *   Run `catalyst init` in your project root.
    *   Select `App Sail` as the feature.
    *   Choose Node.js as the environment, or choose to build from the existing `Dockerfile` if prompted for a custom build.

3.  **Configuration:**
    If using the buildpack method without Docker, ensure your Catalyst configuration (`catalyst.json` / App Sail config) specifies the start command:
    ```json
    "scripts": {
      "start": "npm run start"
    }
    ```
    Since we have configured `next.config.ts` to output `standalone`, you might need to adjust the start command to `node server.js` if running purely from the standalone build inside a container.

4.  **Deploy:**
    ```bash
    catalyst deploy
    ```

### Alternative: Catalyst Web Client (Static Export)

If you only need a static site without API routes or server-side rendering, you can deploy to Catalyst Web Client:
1. Change `output: "standalone"` to `output: "export"` in `next.config.ts`.
2. Run `npm run build`.
3. Initialize Catalyst with the `Web Client` feature, pointing to the `out` directory.
4. Run `catalyst deploy`.
*(Note: Using this method will break the stubbed API routes `/api/payment` and `/api/shipping` as they require a Node server).*