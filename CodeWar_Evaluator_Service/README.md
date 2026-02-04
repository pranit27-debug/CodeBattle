# CodeWar Evaluator Service

## 📋 Overview

The Evaluator Service is the core execution engine of the CodeWar platform, responsible for safely executing user-submitted code in isolated Docker containers. It processes evaluation jobs from message queues, runs code against test cases, and returns results. Built with Express.js, Docker, and BullMQ for high-performance, scalable code execution.

## 🏗️ Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                   Evaluator Service                         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │   Job Workers   │  │   Containers    │  │   Executors │  │
│  │   - BullMQ      │  │   - Docker      │  │   - Python  │  │
│  │   - Queue Proc  │  │   - Isolation   │  │   - Java    │  │
│  │   - Control Loop│  │   - Resource    │  │   - C++     │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
│                                                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │   Fetch Data    │  │   Queue Mgmt    │  │   Utils     │  │
│  │   - Solutions   │  │   - Custom Run  │  │   - Factory │  │
│  │   - Test Cases  │  │   - Submission  │  │   - Constants│ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                    External Dependencies                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Docker      │  │ Redis       │  │ Problem Admin       │  │
│  │ Engine      │  │ (BullMQ)    │  │ Service (Data)      │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Features

### Core Functionality

- 🐳 **Docker-based Execution**: Secure, isolated code execution
- 🔄 **Multi-language Support**: Python, Java, C++ execution
- ⚡ **Queue Processing**: BullMQ for scalable job handling
- 🛡️ **Resource Control**: Memory and CPU limits
- 📊 **Real-time Monitoring**: Bull Board dashboard
- 🔒 **Security**: Network isolation and sandboxing

### Execution Features

- ⏱️ **Timeout Control**: Configurable execution timeouts
- 📈 **Resource Monitoring**: Memory and CPU usage tracking
- 🔄 **Auto-cleanup**: Container auto-removal after execution
- 📝 **Output Capture**: Stdout, stderr, and exit codes
- 🧪 **Test Case Validation**: Automated result comparison

### Queue Management

- 📥 **Submission Queue**: Handles code submissions
- 🔧 **Custom Run Queue**: Handles custom code runs
- 📤 **Result Publishing**: Publishes results to other services
- 🔄 **Retry Logic**: Failed job retry mechanisms
- 📊 **Job Monitoring**: Real-time job status tracking

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Containerization**: Docker
- **Job Queue**: BullMQ
- **Cache/Message Broker**: Redis
- **Monitoring**: Bull Board
- **HTTP Client**: Axios (for external service calls)

## 📁 Project Structure

```text
CodeWar_Evaluator_Service/
├── package.json                    # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── prisma/
│   └── schema.prisma              # Database schema
└── src/
    ├── index.ts                   # Application entry point
    ├── config/
    │   ├── service.config.ts      # Service configuration
    │   ├── bullBoard.config.ts    # Bull Board setup
    │   ├── db.config.ts           # Database configuration
    │   └── redisConnection.ts     # Redis connection
    ├── containers/
    │   ├── containerFactory.ts    # Docker container creation
    │   ├── dockerOutputFetcher.ts # Output handling
    │   ├── pullImage.ts           # Docker image management
    │   ├── pythonExecutor.ts      # Python execution logic
    │   ├── javaExecutor.ts        # Java execution logic
    │   └── cppExecutor.ts         # C++ execution logic
    ├── fetchData/
    │   ├── fetchSolution.ts       # Fetch problem solutions
    │   └── fetchTestcases.ts      # Fetch test cases
    ├── Jobs/
    │   ├── submissionJob.ts       # Submission job processing
    │   └── customRunJob.ts        # Custom run job processing
    ├── producers/
    │   ├── submissionAfterEvaluationProducer.ts
    │   └── customRunAfterEvaluationProducer.ts
    ├── queues/
    │   ├── submissionBeforeEvaluationQueue.ts
    │   ├── submissionAfterEvaluationQueue.ts
    │   ├── customRunBeforeEvaluationQueue.ts
    │   └── customRunAfterEvaluationQueue.ts
    ├── workers/
    │   ├── controlLoop.ts         # Main worker control loop
    │   ├── submissionBeforeEvaluationWorker.ts
    │   └── customRunBeforeEvaluationWorker.ts
    ├── types/
    │   ├── bullMqJobDefinition.ts
    │   ├── bullMqWorkerResponse.ts
    │   ├── CodeExecutorStrategy.ts
    │   ├── submissionPayload.ts
    │   ├── customRunPayload.ts
    │   ├── dockerStreamOutput.ts
    │   ├── problemSolution.ts
    │   └── testCases.ts
    └── utils/
        ├── constants.ts           # Application constants
        └── ExecutorFactory.ts     # Executor factory pattern
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- Redis server
- PostgreSQL (for metadata)
- Problem Admin Service (running)

### Docker Images Required

Pull the following Docker images for code execution:

```bash
# Python execution
docker pull python:3.9-alpine

# Java execution  
docker pull openjdk:11-alpine

# C++ execution
docker pull gcc:latest
```

### Installation

1. **Navigate to the service directory**:

```bash
cd CodeWar_Evaluator_Service
```

2. **Install dependencies**:

```bash
npm install
```

3. **Set up environment variables**:

Create a `.env` file in the root directory:

```env
# Service Configuration
PORT=3002
NODE_ENV=development

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Database Configuration (for metadata)
DATABASE_URL="postgresql://username:password@localhost:5432/codewar_db"

# Docker Configuration
DOCKER_HOST=unix:///var/run/docker.sock

# External Services
PROBLEM_ADMIN_SERVICE_URL=http://localhost:3001/api/v1

# Execution Limits
MAX_MEMORY_MB=1024
MAX_CPU_CORES=0.5
EXECUTION_TIMEOUT_MS=30000
```

4. **Set up the database**:

```bash
# Generate Prisma client
npx prisma generate

# Run migrations if needed
npx prisma migrate dev
```

5. **Build the project**:

```bash
npm run build
```

6. **Start the service**:

```bash
# Development mode with hot reload
npm run dev

# Production mode
npm start
```

The service will be available at:
- **API**: `http://localhost:3002`
- **Bull Board Dashboard**: `http://localhost:3002/ui`

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Service port | 3002 | ❌ |
| `REDIS_HOST` | Redis server host | localhost | ✅ |
| `REDIS_PORT` | Redis server port | 6379 | ✅ |
| `DATABASE_URL` | PostgreSQL connection | - | ✅ |
| `DOCKER_HOST` | Docker daemon socket | unix:///var/run/docker.sock | ✅ |
| `PROBLEM_ADMIN_SERVICE_URL` | Problem service URL | - | ✅ |
| `MAX_MEMORY_MB` | Container memory limit | 1024 | ❌ |
| `MAX_CPU_CORES` | Container CPU limit | 0.5 | ❌ |
| `EXECUTION_TIMEOUT_MS` | Code execution timeout | 30000 | ❌ |

### Docker Container Configuration

```typescript
// Container limits (in containerFactory.ts)
{
  Memory: 1024 * 1024 * 1024,     // 1GB memory limit
  NanoCpus: 0.5 * 1e9,            // 0.5 CPU cores
  NetworkMode: 'none',             // No network access
  AutoRemove: true                 // Auto-cleanup containers
}
```

## 📊 Monitoring & Management

### Bull Board Dashboard

Access the monitoring dashboard at: `http://localhost:3002/ui`

**Features**:
- 📈 Real-time job statistics
- 🔍 Job details and logs
- ⏸️ Queue pause/resume
- 🔄 Failed job retry
- 📊 Performance metrics

### Queue Management

#### Submission Jobs
- **Queue**: `submissionBeforeEvaluationQueue`
- **Worker**: `submissionBeforeEvaluationWorker`
- **Process**: Full evaluation against all test cases

#### Custom Run Jobs
- **Queue**: `customRunBeforeEvaluationQueue`
- **Worker**: `customRunBeforeEvaluationWorker`
- **Process**: Single test case execution

### Job Flow

```text
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Job Received  │───▶│  Fetch Data     │───▶│  Create Container│
│   from Queue    │    │  (Problem/Tests)│    │  with Limits    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Execute Code  │───▶│  Capture Output │───▶│  Compare Results│
│   in Container  │    │  (stdout/stderr)│    │  with Expected  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Cleanup        │───▶│  Publish Result │───▶│  Update Status  │
│  Container      │    │  to Queue       │    │  in Database    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🐳 Supported Languages

### Python
- **Image**: `python:3.9-alpine`
- **Execution**: Direct script execution
- **File**: Code written to temporary file
- **Command**: `python3 /tmp/code.py`

### Java
- **Image**: `openjdk:11-alpine`
- **Execution**: Compile then run
- **Files**: `Main.java` → `Main.class`
- **Commands**: 
  - Compile: `javac Main.java`
  - Execute: `java Main`

### C++
- **Image**: `gcc:latest`
- **Execution**: Compile then run
- **Files**: `main.cpp` → `main`
- **Commands**:
  - Compile: `g++ -o main main.cpp`
  - Execute: `./main`

## 🔒 Security Features

### Container Isolation
- **Network**: `NetworkMode: 'none'` (no internet access)
- **Filesystem**: Read-only where possible
- **Resources**: Strict memory and CPU limits
- **Time**: Execution timeout enforcement

### Code Safety
- No system call restrictions (handled by container limits)
- Input/output sanitization
- Resource monitoring during execution
- Automatic container cleanup

## 🧪 Testing

### Manual Testing

1. **Check service health**:
```bash
curl http://localhost:3002/
```

2. **Monitor queues**:
Visit `http://localhost:3002/ui`

3. **Submit test job** (via Submission Service):
```bash
curl -X POST http://localhost:3003/api/v1/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "problemId": "test-problem",
    "language": "python",
    "code": "print(\"Hello World\")"
  }'
```

### Load Testing

```bash
# Install artillery for load testing
npm install -g artillery

# Run load test
artillery run load-test.yml
```

## 🐛 Error Handling

### Common Error Types

1. **Container Creation Errors**:
   - Docker daemon not running
   - Insufficient resources
   - Image not found

2. **Execution Errors**:
   - Compilation failures
   - Runtime exceptions
   - Timeout exceeded
   - Memory limit exceeded

3. **Queue Errors**:
   - Redis connection lost
   - Job processing failure
   - Invalid payload format

### Error Response Format

```json
{
  "success": false,
  "error": {
    "type": "EXECUTION_ERROR",
    "message": "Code execution failed",
    "details": {
      "exitCode": 1,
      "stderr": "Error message",
      "timeout": false
    }
  }
}
```

## 📈 Performance Optimization

### Container Management
- **Image Caching**: Keep frequently used images in cache
- **Container Reuse**: Reuse containers when possible
- **Lazy Loading**: Pull images on-demand

### Queue Optimization
- **Concurrency**: Configure worker concurrency based on resources
- **Batching**: Process similar jobs in batches
- **Prioritization**: Priority queues for urgent jobs

### Resource Management
```typescript
// Optimal worker configuration
const workerOptions = {
  concurrency: 5,           // Process 5 jobs simultaneously
  removeOnComplete: 10,     // Keep last 10 completed jobs
  removeOnFail: 50,         // Keep last 50 failed jobs
};
```

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

### Docker Deployment
```dockerfile
FROM node:18-alpine

# Install Docker CLI (for container management)
RUN apk add --no-cache docker-cli

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3002
CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  evaluator:
    build: .
    ports:
      - "3002:3002"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - REDIS_HOST=redis
      - DATABASE_URL=postgresql://user:pass@postgres:5432/db
    depends_on:
      - redis
      - postgres
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add comprehensive tests
4. Ensure Docker compatibility
5. Update documentation
6. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Tafheem Ahemad**
- GitHub: [@Tafheem-Ahemad](https://github.com/Tafheem-Ahemad)

---

For more information about the overall CodeWar platform, see the [main README](../README.md).