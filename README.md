# 🐳 Docker Learning Project

A complete example project demonstrating how Docker and Docker Compose work together to run a full-stack application with frontend-backend communication.

## 📁 Project Structure

```
docker-learning-project/
├── backend/                 # Python FastAPI backend
│   ├── main.py            # FastAPI application
│   ├── requirements.txt   # Python dependencies
│   ├── Dockerfile         # Backend container configuration
│   └── .dockerignore      # Files to ignore when building
├── frontend/              # React frontend
│   ├── src/               # React source code
│   ├── public/            # Static files
│   ├── package.json       # Node.js dependencies
│   ├── Dockerfile         # Frontend container configuration
│   └── .dockerignore      # Files to ignore when building
└── docker-compose.yml     # Multi-container orchestration
```

## 🚀 Quick Start

### Prerequisites
- Docker installed and running
- Docker Compose installed

### Step 1: Navigate to the project directory
```bash
cd docker-learning-project
```

### Step 2: Build and start all services
```bash
# Build images and start containers
docker-compose up --build

# Or run in detached mode (background)
docker-compose up --build -d
```

### Step 3: Access the applications
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Backend Health Check**: http://localhost:8000/health

## 📚 Learning Commands

### Building Images
```bash
# Build all services defined in docker-compose.yml
docker-compose build

# Build a specific service
docker-compose build backend
docker-compose build frontend

# Build without cache (useful when dependencies change)
docker-compose build --no-cache
```

### Running Containers
```bash
# Start all services
docker-compose up

# Start in background (detached mode)
docker-compose up -d

# Start specific services
docker-compose up backend
docker-compose up frontend

# Start with rebuild
docker-compose up --build
```

### Stopping and Cleaning Up
```bash
# Stop all running containers
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Stop and remove everything (containers, networks, images)
docker-compose down --rmi all

# Remove all stopped containers and unused images
docker system prune -a
```

### Viewing Logs
```bash
# View logs from all services
docker-compose logs

# View logs from specific service
docker-compose logs backend
docker-compose logs frontend

# Follow logs in real-time
docker-compose logs -f

# View logs with timestamps
docker-compose logs -t
```

### Debugging and Inspection
```bash
# List running containers
docker-compose ps

# Execute commands inside running container
docker-compose exec backend bash
docker-compose exec frontend sh

# View container details
docker-compose inspect backend
docker-compose inspect frontend

# Check service health
docker-compose ps
```

## 🔧 Development Workflow

### When you change code:

1. **For backend changes** (Python files):
   ```bash
   # Stop and rebuild backend
   docker-compose down
   docker-compose up --build
   ```

2. **For frontend changes** (React files):
   ```bash
   # Stop and rebuild frontend
   docker-compose down
   docker-compose up --build
   ```

3. **For dependency changes** (requirements.txt or package.json):
   ```bash
   # Rebuild without cache to ensure fresh install
   docker-compose down
   docker-compose build --no-cache
   docker-compose up
   ```

### Hot Reload Development
The containers are configured for development with hot reload:
- **Backend**: FastAPI with `--reload` flag
- **Frontend**: React development server with hot reload

## 🌐 How Container Communication Works

### Key Concepts:

1. **Service Names as Hostnames**: 
   - In `docker-compose.yml`, services are named `backend` and `frontend`
   - Containers can reach each other using these names as hostnames
   - Frontend connects to backend using `http://backend:8000/`

2. **Docker Networks**:
   - Docker Compose creates a default network
   - All services in the same compose file can communicate
   - No need to expose internal ports between services

3. **Port Mapping**:
   - `ports: "3000:3000"` maps host port 3000 to container port 3000
   - External access uses host ports
   - Internal communication uses service names

### Network Flow:
```
Browser → localhost:3000 → Frontend Container → backend:8000 → Backend Container
```

## 🐛 Troubleshooting

### Common Issues:

1. **"Connection refused" errors**:
   - Check if containers are running: `docker-compose ps`
   - Verify service names in code match docker-compose.yml
   - Ensure backend is healthy before frontend starts

2. **Port already in use**:
   ```bash
   # Check what's using the port
   sudo lsof -i :3000
   sudo lsof -i :8000
   
   # Kill the process or change ports in docker-compose.yml
   ```

3. **Build failures**:
   ```bash
   # Clean everything and rebuild
   docker-compose down --rmi all
   docker-compose build --no-cache
   docker-compose up
   ```

4. **Permission issues**:
   ```bash
   # Add user to docker group (if not already done)
   sudo usermod -aG docker $USER
   newgrp docker
   ```

### Debug Commands:
```bash
# Check container logs
docker-compose logs backend
docker-compose logs frontend

# Test backend directly
curl http://localhost:8000/
curl http://localhost:8000/health

# Check network connectivity
docker-compose exec frontend ping backend
docker-compose exec backend ping frontend
```

## 📖 What You've Learned

After completing this project, you understand:

1. **Dockerfile basics**: How to containerize Python and Node.js applications
2. **Docker Compose**: How to orchestrate multiple containers
3. **Container networking**: How services communicate using service names
4. **Port mapping**: How to expose container ports to the host
5. **Dependencies**: How to ensure services start in the correct order
6. **Health checks**: How to verify services are running properly
7. **Development workflow**: How to rebuild and restart containers during development

## 🎯 Next Steps

Try these modifications to deepen your understanding:

1. **Add a database**: Include PostgreSQL or MongoDB
2. **Environment variables**: Use `.env` files for configuration
3. **Volumes**: Persist data between container restarts
4. **Multi-stage builds**: Optimize image sizes
5. **Production setup**: Create production-ready configurations

Happy Docker learning! 🐳
