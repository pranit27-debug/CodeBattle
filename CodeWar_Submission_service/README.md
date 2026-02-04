# CodeWar Submission Service

## 📋 Overview

The Submission Service is a high-performance microservice in the CodeWar platform responsible for handling user code submissions, managing submission lifecycle, and coordinating with the Evaluator Service. Built with Fastify for optimal performance, it processes submissions through message queues and provides real-time status updates.

## 🏗️ Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                  Submission Service                         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │   Controllers   │  │   Validators    │  │   Models    │  │
│  │   - Submission  │  │   - Zod Schema  │  │   - Schemas │  │
│  │   - Custom Run  │  │   - Validation  │  │   - Types   │  │
│  │   - User Mgmt   │  │   - Middleware  │  │             │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
│                                                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │   Producers     │  │   Workers       │  │   Queues    │  │
│  │   - Job Create  │  │   - Process     │  │   - BullMQ  │  │
│  │   - Result Pub  │  │   - Status Upd  │  │   - Redis   │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
│                                                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │   Services      │  │   Repositories  │  │   Utils     │  │
│  │   - Business    │  │   - Data Access │  │   - Helpers │  │
│  │   - Logic       │  │   - Prisma ORM  │  │   - Errors  │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                External Dependencies                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ PostgreSQL  │  │ Redis       │  │ Evaluator Service   │  │
│  │ (Database)  │  │ (Queues)    │  │ (Code Execution)    │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Features

### Core Functionality

- ⚡ **High Performance**: Fastify framework for optimal throughput
- 📝 **Submission Management**: Full submission lifecycle handling
- 🔄 **Queue Integration**: BullMQ for async job processing
- 🧪 **Custom Code Runs**: Test code without full submission
- 📊 **User Analytics**: Submission history and statistics
- 🔒 **Input Validation**: Comprehensive request validation

### Submission Features

- 💾 **Persistent Storage**: Database storage for all submissions
- ⏱️ **Real-time Status**: Live submission status updates
- 📈 **Progress Tracking**: Step-by-step execution tracking
- 🔄 **Retry Mechanism**: Failed submission retry logic
- 📋 **Batch Operations**: Multiple submission handling
- 🔍 **Query Support**: Flexible submission querying

### Integration Features

- 🔗 **Service Communication**: HTTP client for external services
- 📡 **Message Publishing**: Result broadcasting to other services
- 🎯 **Event-driven**: Async event processing
- 🔧 **Plugin Architecture**: Modular Fastify plugins

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Fastify
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Job Queue**: BullMQ
- **Cache/Message Broker**: Redis
- **HTTP Client**: Axios
- **Validation**: Zod

## 📁 Project Structure

```text
CodeWar_Submission_service/
├── package.json                    # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── generated/                     # Generated files
│   ├── problemService/           # Problem service client
│   └── submissionService/        # Submission service types
├── prisma/
│   ├── problem_service_db/       # Problem service schema
│   └── submission_service_db/    # Submission service schema
└── src/
    ├── index.ts                  # Application entry point
    ├── app.ts                    # Fastify app configuration
    ├── config/
    │   ├── serverConfig.ts       # Server configuration
    │   ├── dbConfig.ts           # Database configuration
    │   └── redisConfig.ts        # Redis configuration
    ├── controllers/
    │   └── submissionController.ts # Submission CRUD operations
    ├── models/
    │   ├── customRunSchema.ts    # Custom run validation schema
    │   ├── problemSubmissionSchema.ts # Submission schema
    │   └── userSchema.ts         # User validation schema
    ├── routes/
    │   ├── apiRouters.ts         # Main API router
    │   └── v1/
    │       ├── v1Routes.ts       # v1 API routes
    │       ├── submissionRoutes.ts # Submission endpoints
    │       └── problemRoutes.ts   # Problem endpoints
    ├── validators/
    │   └── validator.ts          # Request validation middleware
    ├── services/
    │   ├── submissionService.ts  # Business logic
    │   └── userService.ts        # User management
    ├── repositories/
    │   ├── submissionRepository.ts # Data access layer
    │   └── userRepository.ts      # User data access
    ├── producers/
    │   ├── submissionProducer.ts # Job creation
    │   └── customRunProducer.ts  # Custom run jobs
    ├── queues/
    │   ├── submissionQueue.ts    # Submission job queue
    │   └── customRunQueue.ts     # Custom run queue
    ├── workers/
    │   ├── controlLoop.ts        # Main worker loop
    │   ├── submissionWorker.ts   # Submission processing
    │   └── customRunWorker.ts    # Custom run processing
    ├── types/
    │   ├── submissionTypes.ts    # Type definitions
    │   ├── queueTypes.ts         # Queue type definitions
    │   └── apiTypes.ts           # API type definitions
    ├── utils/
    │   ├── errorhandlers.ts      # Error handling utilities
    │   ├── constants.ts          # Application constants
    │   └── helpers.ts            # Helper functions
    └── errors/
        ├── baseError.ts          # Base error class
        ├── validationError.ts    # Validation errors
        └── serviceError.ts       # Service errors
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v13 or higher)
- Redis (v6 or higher)
- Evaluator Service (running)
- Problem Admin Service (running)

### Installation

1. **Navigate to the service directory**:

```bash
cd CodeWar_Submission_service
```

2. **Install dependencies**:

```bash
npm install
```

3. **Set up environment variables**:

Create a `.env` file in the root directory:

```env
# Service Configuration
PORT=3003
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/codewar_submissions_db"

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# External Services
EVALUATOR_SERVICE_URL=http://localhost:3002
PROBLEM_ADMIN_SERVICE_URL=http://localhost:3001/api/v1
SOCKET_SERVICE_URL=http://localhost:3004

# Queue Configuration
SUBMISSION_QUEUE_NAME=submissionBeforeEvaluationQueue
CUSTOM_RUN_QUEUE_NAME=customRunBeforeEvaluationQueue

# API Configuration
API_RATE_LIMIT=100
REQUEST_TIMEOUT=30000
```

4. **Set up the database**:

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
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

The service will be available at `http://localhost:3003`

## 📡 API Documentation

### Base URL
```
http://localhost:3003/api/v1
```

### Health Check
```http
GET /health
```

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2025-09-18T10:30:00Z",
  "uptime": 3600
}
```

### Submission Endpoints

#### Create Submission
```http
POST /submission
Content-Type: application/json
```

**Request Body**:
```json
{
  "userId": "user_123",
  "problemId": "problem_456",
  "language": "python",
  "code": "def solution(nums, target):\n    # Your solution here\n    return result"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "submissionId": "sub_789",
    "status": "PENDING",
    "timestamp": "2025-09-18T10:30:00Z",
    "message": "Submission queued for evaluation"
  }
}
```

#### Get Submission by ID
```http
GET /submission/:id
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "sub_789",
    "userId": "user_123",
    "problemId": "problem_456",
    "language": "python",
    "code": "def solution(nums, target):\n    return result",
    "status": "ACCEPTED",
    "result": {
      "testCasesPassed": 15,
      "totalTestCases": 15,
      "executionTime": "120ms",
      "memoryUsed": "25MB",
      "score": 100
    },
    "createdAt": "2025-09-18T10:30:00Z",
    "completedAt": "2025-09-18T10:30:05Z"
  }
}
```

#### Get User Submissions
```http
GET /submissions/user/:id
```

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `status` (optional): Filter by status
- `problemId` (optional): Filter by problem

**Response**:
```json
{
  "success": true,
  "data": {
    "submissions": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    },
    "stats": {
      "totalSubmissions": 150,
      "acceptedSubmissions": 120,
      "acceptanceRate": 80.0
    }
  }
}
```

#### Get Multiple Submissions
```http
GET /submissions/getMany
```

**Query Parameters**:
- `ids`: Comma-separated submission IDs

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "sub_789",
      "status": "ACCEPTED",
      "result": {...}
    }
  ]
}
```

### Custom Run Endpoints

#### Create Custom Run
```http
POST /customRun
Content-Type: application/json
```

**Request Body**:
```json
{
  "userId": "user_123",
  "problemId": "problem_456",
  "language": "python",
  "code": "print('Hello World')",
  "input": "test input"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "runId": "run_321",
    "status": "PENDING",
    "timestamp": "2025-09-18T10:30:00Z"
  }
}
```

### User Endpoints

#### Get User by ID
```http
GET /user/:id
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "username": "coder123",
    "email": "user@example.com",
    "profile": {
      "problemsSolved": 45,
      "totalSubmissions": 150,
      "acceptanceRate": 80.0,
      "rank": "Expert"
    }
  }
}
```

## 🗃️ Database Schema

### Submission Table
```sql
Submission {
  id          String    @id @default(cuid())
  userId      String
  problemId   String
  language    String
  code        String
  status      Status    @default(PENDING)
  result      Json?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  completedAt DateTime?
}
```

### Custom Run Table
```sql
CustomRun {
  id          String    @id @default(cuid())
  userId      String
  problemId   String?
  language    String
  code        String
  input       String?
  output      String?
  status      Status    @default(PENDING)
  createdAt   DateTime  @default(now())
  completedAt DateTime?
}
```

### Status Enum
```sql
enum Status {
  PENDING
  IN_PROGRESS
  ACCEPTED
  WRONG_ANSWER
  TIME_LIMIT_EXCEEDED
  MEMORY_LIMIT_EXCEEDED
  RUNTIME_ERROR
  COMPILATION_ERROR
  INTERNAL_ERROR
}
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Service port | 3003 | ❌ |
| `DATABASE_URL` | PostgreSQL connection | - | ✅ |
| `REDIS_HOST` | Redis host | localhost | ✅ |
| `REDIS_PORT` | Redis port | 6379 | ✅ |
| `EVALUATOR_SERVICE_URL` | Evaluator service URL | - | ✅ |
| `PROBLEM_ADMIN_SERVICE_URL` | Problem service URL | - | ✅ |
| `SOCKET_SERVICE_URL` | Socket service URL | - | ✅ |

### Fastify Configuration

```typescript
// Server setup with optimal performance
const server = fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty'
    }
  },
  requestTimeout: 30000,
  bodyLimit: 1048576, // 1MB
  maxParamLength: 200
});
```

## 🔄 Queue Processing

### Submission Flow

```text
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Submits  │───▶│  Validate &     │───▶│  Queue Job      │
│   Code          │    │  Store in DB    │    │  for Evaluation │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Return Job ID  │    │  Worker Picks   │───▶│  Send to        │
│  to User        │    │  Up Job         │    │  Evaluator      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  WebSocket      │◀───│  Update Status  │◀───│  Receive Results│
│  Notification   │    │  in Database    │    │  from Evaluator │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Worker Configuration

```typescript
// Worker settings for optimal performance
const workerOptions = {
  concurrency: 10,          // Process 10 jobs simultaneously
  removeOnComplete: 100,    // Keep last 100 completed jobs
  removeOnFail: 50,         // Keep last 50 failed jobs
  attempts: 3,              // Retry failed jobs 3 times
  backoff: {
    type: 'exponential',
    delay: 2000,            // Start with 2s delay
  }
};
```

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### Integration Tests
```bash
npm run test:integration
```

### API Testing with curl

1. **Submit code**:
```bash
curl -X POST http://localhost:3003/api/v1/submission \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test_user",
    "problemId": "test_problem",
    "language": "python", 
    "code": "print(\"Hello World\")"
  }'
```

2. **Check submission status**:
```bash
curl http://localhost:3003/api/v1/submission/sub_123
```

3. **Get user submissions**:
```bash
curl http://localhost:3003/api/v1/submissions/user/user_123
```

## 🐛 Error Handling

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid submission data",
    "details": {
      "field": "language",
      "value": "unsupported_lang",
      "allowed": ["python", "java", "cpp"]
    },
    "timestamp": "2025-09-18T10:30:00Z"
  }
}
```

### Common Error Types

- `VALIDATION_ERROR` (400): Invalid request data
- `SUBMISSION_NOT_FOUND` (404): Submission doesn't exist
- `USER_NOT_FOUND` (404): User doesn't exist
- `SERVICE_UNAVAILABLE` (503): External service down
- `QUEUE_ERROR` (500): Job queue issues
- `DATABASE_ERROR` (500): Database connection issues

## 📊 Monitoring & Analytics

### Metrics Tracking

- **Submission Volume**: Submissions per hour/day
- **Success Rate**: Accepted vs rejected submissions
- **Response Time**: API response latencies
- **Queue Health**: Job processing times
- **Error Rate**: Failed request percentage

### Logging

```typescript
// Structured logging for better monitoring
logger.info({
  submissionId: 'sub_123',
  userId: 'user_456',
  problemId: 'prob_789',
  language: 'python',
  status: 'queued',
  timestamp: new Date().toISOString()
}, 'Submission queued for evaluation');
```

## 🚀 Performance Optimization

### Database Optimization
- **Indexing**: Optimized indexes for common queries
- **Connection Pooling**: Efficient database connections
- **Query Optimization**: Optimized Prisma queries

### Caching Strategy
- **Redis Caching**: Cache frequently accessed data
- **Result Caching**: Cache evaluation results
- **User Session**: Cache user data

### Rate Limiting
```typescript
// Rate limiting for API protection
server.register(require('@fastify/rate-limit'), {
  max: 100,                    // 100 requests
  timeWindow: '1 minute',      // per minute
  keyGenerator: (request) => {
    return request.ip;         // by IP address
  }
});
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

### Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3003
CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  submission-service:
    build: .
    ports:
      - "3003:3003"
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/submissions
      - REDIS_HOST=redis
    depends_on:
      - postgres
      - redis
      - evaluator-service
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Write comprehensive tests
4. Ensure API compatibility
5. Update documentation
6. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Tafheem Ahemad**
- GitHub: [@Tafheem-Ahemad](https://github.com/Tafheem-Ahemad)

---

For more information about the overall CodeWar platform, see the [main README](../README.md).