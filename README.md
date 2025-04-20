# TaskSync Microservices

This project is a cloud-based microservices architecture for TaskSync — a task and note management system. It consists of three independent microservices:

- 🧠 notes-service
- ✅ task-service
- 👤 user-service

Each service is containerized with Docker, deployed using AWS ECS Fargate, uses MongoDB for data persistence, and follows CI/CD and DevSecOps best practices.

---

## 🏗 Project Architecture

- 3 microservices, each running independently
- MongoDB Atlas database for each service
- Hosted on AWS using ECS Fargate
- CI/CD with GitHub Actions
- Container images stored on AWS ECR
- Security via IAM roles, security groups, and vulnerability scanning (Snyk)

---

## 📁 Folder Structure

```bash
TaskSync_microservices/
├── notes-service/
│   ├── Dockerfile
│   ├── .github/workflows/notes.yml
│   └── ...
├── task-service/
│   ├── Dockerfile
│   ├── .github/workflows/task.yml
│   └── ...
├── user-service/
│   ├── Dockerfile
│   ├── .github/workflows/user.yml
│   └── ...
```

---

## 🚀 Deployment

Each service is deployed on AWS ECS (Fargate) using its own container from AWS ECR.

Steps followed:

1. Created and pushed Docker images to AWS ECR.
2. Set up ECS Cluster and services using "Networking only (Fargate)".
3. Configured Task Definitions with port mappings and resource limits.
4. Created public-facing services with attached security groups and enabled public IPs.
5. MongoDB Atlas used with IP whitelisting for each service.

Example:  
http://<your-public-ip>:5000 → Notes service running!

---

## ⚙️ CI/CD – GitHub Actions

Each microservice has its own CI workflow triggered on push. Workflows include:

- Checkout code
- Install dependencies (Node.js 18)
- Run builds/tests (optional)
- Echo deployment message

Example workflow (notes-service):

```yaml
name: notes-service CI
on:
  push:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: notes-service
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: 18
    - run: npm install
    - run: echo "Ready for deployment"
```

---

## 🛣️ Dockerization

Each microservice includes:

- Dockerfile with production-ready Node.js setup
- Image published to AWS ECR
- Used in ECS task definitions

Example Dockerfile:

```Dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "server.js"]
```

---

## 🔐 Security & DevSecOps

We implemented multiple security measures:

- IAM Roles (least privilege for ECS task execution)
- Security Groups (only necessary ports open, e.g., port 5000)
- MongoDB Atlas IP whitelisting
- .env for secrets management (local dev)
- Docker image scanning and SAST with Snyk

Steps followed:
- Connected GitHub repo to Snyk
- Snyk scans package.json and Dockerfile
- IAM role for ECS: AmazonECSTaskExecutionRolePolicy

---

## ✅ How to Test

You can access any of the services via their public IP + port, e.g.:

- http://<public-ip>:5000 → Notes Service
- http://<public-ip>:5001 → Task Service
- http://<public-ip>:5002 → User Service

(Note: The public IP, such as 16.170.226.195, may change after re-deployments.)

Use Postman or browser to hit the GET/POST endpoints.

---

## 📸 Screenshots

> (Insert screenshots here below each heading)

- AWS ECS: Cluster, Service, Task running
- GitHub Actions: CI/CD pipeline triggered
- Snyk security scan dashboard
- Docker push commands from terminal
- MongoDB Atlas connection setup

---

## 👥 Team Members

| Name                | IT Number   | GitHub Profile                                                     |
|---------------------|-------------|--------------------------------------------------------------------|
| Withanagamage J.C.  | IT21250156  | [github.com/MalikaIT21277122](https://github.com/MalikaIT21277122) |
| Degaldoruwa M.B.B.  | IT21277122  | [github.com/JanithSample](https://github.com/JanithSample)         |
| Weerakoon W.M.B.B.  | IT21303302  | [github.com/BimsaraSample](https://github.com/BimsaraSample)       |

---

## 🏁 Conclusion

This project demonstrates the full lifecycle of building, containerizing, securing, and deploying microservices using modern cloud-native and DevOps practices.