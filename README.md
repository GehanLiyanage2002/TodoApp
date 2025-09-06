# Todo App with Full DevOps CI/CD Pipeline

A modern full-stack **Todo App** built with **React** and **Flask**, containerized with **Docker**, and deployed on **Azure Kubernetes Service (AKS)** using **CI/CD pipelines**.  

---

## 🚀 Features

- Add, update, delete, and toggle tasks.
- Filter tasks by **all / active / completed**.
- Dashboard to track task completion.
- Mobile-responsive and modern UI with **Tailwind CSS** and **Chakra UI**.
- Fully containerized backend and frontend with **Docker**.

---

## 🛠 Tech Stack

| Layer        | Technology |
|-------------|------------|
| Frontend     | React, Tailwind CSS, Chakra UI |
| Backend      | Flask, SQLite |
| DevOps       | Docker, Docker Compose, GitHub Actions |
| Cloud        | Azure Container Registry (ACR), Azure Kubernetes Service (AKS) |


---

## ⚙️ DevOps & CI/CD Setup

1. **Containerization**
   - Backend and frontend are packaged as separate Docker images.
   - Managed locally with **Docker Compose**.

2. **CI/CD Pipeline**
   - **GitHub Actions** workflow:
     - Checkout code
     - Build and run unit tests
     - Build Docker images
     - Push images to **Azure Container Registry (ACR)**
     - Deploy/update services on **AKS**
   - Automatic deployment on push to `main` branch.

3. **Kubernetes Deployment**
   - Frontend and backend have separate **deployments and services**.
   - Nginx load balancer to manage traffic across backend pods.
   - Rolling updates handled automatically via CI/CD.

---



