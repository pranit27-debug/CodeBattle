# CodeWar - Competitive Programming Platform

## 🚀 Overview

CodeWar is a comprehensive competitive programming platform built with a microservices architecture. It allows users to solve coding problems, submit solutions, and get real-time feedback on their code execution. The platform supports multiple programming languages and provides a seamless coding experience similar to platforms like LeetCode and CodeforceS.

## 🏗️ Architecture

CodeWar follows a microservices architecture with the following core services:

### System Flow Diagram

<img width="1640" height="820" alt="Screenshot 2025-07-13 000305" src="https://github.com/user-attachments/assets/5ba4fc0e-6707-4425-850a-5782ce3d37c3" />

The above diagram illustrates the complete flow of how services interact:

1. **Client** submits code to **Submission Server**
2. **Submission Server** stores submission in **Submission DB**
3. **Submission Server** sends job to **Message Broker** (Submission Queue)
4. **Client** receives acknowledgment from **Submission Server**
5. **Submission Server** adds job to **Submission Queue**
6. **Evaluator Service** picks up job from queue
7. **Evaluator Service** fetches problem data from **Static DB** (Problem Admin Service)
8. **Evaluator Service** executes code in isolated **Docker Container**
9. **Evaluator Service** sends results back through **Evaluator Queue**
10. **Submission Server** processes evaluation results
11. **Submission Server** updates submission status in **Submission DB**
12. **Web Socket** service provides real-time updates to **Client**
13. **Client** receives real-time status updates


## 📋 Services Overview

### 1. CodeWar Problem Admin Service
**Framework**: Express.js  
**Database**: PostgreSQL (via Prisma ORM)  
**Port**: Configurable

**Purpose**: Manages the problem repository and administrative operations.

**Key Features**:
- CRUD operations for coding problems
- Problem metadata management (title, description, difficulty, tags, companies)
- Test cases management (visible and hidden test cases)
- Code snippets/templates for different programming languages
- Editorial and hints management
- Problem solutions storage

**Database Schema**:
- `Problem`: Core problem information
- `testcase`: Test cases for problems (input/output pairs)
- `codeSubs`: Language-specific code templates
- `solution`: Reference solutions for problems

**Key Dependencies**:
- `@prisma/client`: Database ORM
- `express`: Web framework
- `zod`: Schema validation
- `marked`: Markdown processing
- `sanitize-html`: HTML sanitization

### 2. CodeWar Evaluator Service
**Framework**: Express.js  
**Job Queue**: BullMQ with Redis  
**Execution**: Docker containers  
**Port**: Configurable

**Purpose**: Handles code execution and evaluation in isolated environments.

**Key Features**:
- Multi-language support (Python, Java, C++)
- Docker-based code execution for security and isolation
- Resource limiting (memory: 1GB, CPU: 0.5 cores)
- Queue-based job processing for scalability
- Real-time execution monitoring
- Bull Board dashboard for job monitoring

**Supported Languages**:
- Python
- Java  
- C++

**Security Features**:
- Network isolation (`NetworkMode: 'none'`)
- Resource constraints
- Auto-removal of containers
- Sandboxed execution environment

**Key Dependencies**:
- `dockerode`: Docker API client
- `bullmq`: Job queue management
- `@bull-board/express`: Job monitoring dashboard
- `ioredis`: Redis client

### 3. CodeWar Submission Service
**Framework**: Fastify  
**Database**: PostgreSQL (via Prisma ORM)  
**Job Queue**: BullMQ with Redis  
**Port**: Configurable

**Purpose**: Manages user submissions and coordinates with the evaluator service.

**Key Features**:
- Submission processing and validation
- Integration with evaluator service for code execution
- Submission history and tracking
- User submission analytics
- Queue-based submission processing
- Fast API responses with Fastify

**Key Dependencies**:
- `fastify`: High-performance web framework
- `@prisma/client`: Database ORM
- `bullmq`: Job queue management
- `axios`: HTTP client for service communication
- `zod`: Schema validation

### 4. CodeWar Socket Service
**Framework**: Socket.IO with Express.js  
**Real-time Communication**: WebSockets  
**Cache**: Redis  
**Port**: Configurable

**Purpose**: Provides real-time communication between clients and services.

**Key Features**:
- Real-time submission status updates
- Live code execution feedback
- User session management
- Socket connection mapping with Redis
- CORS-enabled for cross-origin requests
- Scalable real-time messaging

**Key Dependencies**:
- `socket.io`: WebSocket library
- `express`: Web framework
- `ioredis`: Redis client for session management

## 🛠️ Technology Stack

### Backend Technologies
- **Runtime**: Node.js with TypeScript
- **Web Frameworks**: Express.js, Fastify
- **Real-time Communication**: Socket.IO
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Cache/Message Broker**: Redis
- **Job Queue**: BullMQ
- **Container Engine**: Docker
- **Code Execution**: Dockerized environments

### Development Tools
- **Language**: TypeScript
- **Package Manager**: npm
- **Process Manager**: nodemon
- **Build Tool**: TypeScript Compiler (tsc)
- **Concurrency**: concurrently

## 🚀 Getting Started

### Prerequisites

1. **Node.js** (v18 or higher)
2. **Docker** and Docker Compose
3. **PostgreSQL** (v13 or higher)
4. **Redis** (v6 or higher)
5. **npm** package manager

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/Tafheem-Ahemad/CodeWar.git
cd CodeWar
```

2. **Set up environment variables**:
Create `.env` files in each service directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/codewar_db"

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Service Ports
PORT=3000

# Docker (for Evaluator Service)
DOCKER_HOST=unix:///var/run/docker.sock

# CORS Origins (for Socket Service)
ORIGIN=http://localhost:3000
```

3. **Install dependencies for all services**:
```bash
# Problem Admin Service
cd CodeWar_Problem_Admin_Service
npm install

# Evaluator Service
cd ../CodeWar_Evaluator_Service
npm install

# Submission Service  
cd ../CodeWar_Submission_service
npm install

# Socket Service
cd ../CodeWar_Socket_Service
npm install
```

4. **Set up the database**:
```bash
# In Problem Admin Service directory
cd CodeWar_Problem_Admin_Service
npx prisma migrate dev
npx prisma generate

# In Submission Service directory
cd ../CodeWar_Submission_service
npx prisma migrate dev
npx prisma generate
```

5. **Pull Docker images for code execution**:
```bash
docker pull python:3.9-alpine
docker pull openjdk:11-alpine
docker pull gcc:latest
```

### Running the Services

You can run each service individually or use Docker Compose (if available):

#### Individual Services:

1. **Start Redis** (if not using managed Redis):
```bash
redis-server
```

2. **Problem Admin Service**:
```bash
cd CodeWar_Problem_Admin_Service
npm run dev
```

3. **Evaluator Service**:
```bash
cd CodeWar_Evaluator_Service
npm run dev
```

4. **Submission Service**:
```bash
cd CodeWar_Submission_service
npm run dev
```

5. **Socket Service**:
```bash
cd CodeWar_Socket_Service
npm run dev
```

#### Service URLs:
- Problem Admin Service: `http://localhost:3001`
- Evaluator Service: `http://localhost:3002`
- Submission Service: `http://localhost:3003`
- Socket Service: `http://localhost:3004`
- Bull Board (Job Monitoring): `http://localhost:3002/ui`

## 📡 API Endpoints

### Problem Admin Service
- `GET /api/problems` - Get all problems
- `POST /api/problems` - Create a new problem
- `GET /api/problems/:id` - Get problem by ID
- `PUT /api/problems/:id` - Update problem
- `DELETE /api/problems/:id` - Delete problem

### Submission Service
- `POST /api/submissions` - Submit code for evaluation
- `GET /api/submissions/:id` - Get submission status
- `GET /api/submissions/user/:userId` - Get user submissions

### Evaluator Service
- Job processing endpoints (internal)
- Bull Board dashboard: `/ui`

### Socket Service
- WebSocket events for real-time communication
- Connection management endpoints

## 🔧 Configuration

Each service can be configured through environment variables:

### Common Variables:
- `PORT`: Service port number
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_HOST`: Redis server host
- `REDIS_PORT`: Redis server port

### Service-Specific Variables:
- **Evaluator Service**: Docker configuration, resource limits
- **Socket Service**: CORS origins, WebSocket settings
- **Submission Service**: External service URLs

## 📊 Monitoring & Debugging

### Bull Board Dashboard
Access the job monitoring dashboard at: `http://localhost:3002/ui`

Features:
- Real-time job status monitoring
- Queue management
- Failed job inspection
- Performance metrics

### Logging
Each service provides structured logging:
- Request/response logging
- Error tracking
- Job processing logs
- Docker container logs

## 🧪 Testing

### Running Tests:
```bash
# In each service directory
npm test
```

### Manual Testing:
1. Create a problem via Problem Admin API
2. Submit code via Submission Service
3. Monitor execution in Bull Board
4. Check real-time updates via Socket connection

## 📈 Performance & Scalability

### Scalability Features:
- **Horizontal scaling**: Each service can be replicated
- **Queue-based processing**: Handles high loads efficiently
- **Redis caching**: Reduces database load
- **Docker isolation**: Secure and resource-controlled execution

### Performance Optimizations:
- **Fastify**: High-performance HTTP framework for submissions
- **Connection pooling**: Efficient database connections
- **Job queuing**: Non-blocking code execution
- **Resource limits**: Prevents resource exhaustion

## 🔒 Security

### Security Measures:
- **Container isolation**: Code execution in sandboxed Docker containers
- **Network restrictions**: No network access during code execution
- **Resource limits**: Memory and CPU constraints
- **Input validation**: Zod schema validation
- **CORS configuration**: Controlled cross-origin access

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Docker for containerization
- Prisma for database management
- BullMQ for job processing
- Socket.IO for real-time communication
- All open-source contributors

---

For detailed API documentation and advanced configuration options, please refer to the individual service documentation in their respective directories.



