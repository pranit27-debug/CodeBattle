# CodeWar Problem Admin Service

## 📋 Overview

The Problem Admin Service is a core microservice in the CodeWar platform responsible for managing the problem repository. It provides CRUD operations for coding problems, test cases, code templates, and solutions. Built with Express.js and TypeScript, it uses PostgreSQL with Prisma ORM for data persistence.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                Problem Admin Service                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │   Controllers   │  │   Validators    │  │   Models    │  │
│  │   - Problem     │  │   - Zod Schema  │  │   - Schemas │  │
│  │   - CRUD Ops    │  │   - Validation  │  │   - Types   │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
│                                                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │    Routes       │  │   Repositories  │  │   Services  │  │
│  │   - API Routes  │  │   - Data Layer  │  │   - Logic   │  │
│  │   - Middleware  │  │   - Prisma      │  │   - Utils   │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                    PostgreSQL Database                      │
│                    (via Prisma ORM)                         │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Features

### Core Functionality
- ✅ **Problem Management**: Full CRUD operations for coding problems
- ✅ **Test Case Management**: Visible and hidden test cases
- ✅ **Code Templates**: Language-specific starter code snippets
- ✅ **Solution Storage**: Reference solutions for problems
- ✅ **Metadata Management**: Tags, companies, difficulty levels
- ✅ **Editorial Support**: Problem explanations and hints
- ✅ **Markdown Processing**: Rich text formatting for problem descriptions

### Technical Features
- 🔒 **Input Validation**: Zod schema validation
- 🛡️ **HTML Sanitization**: Secure content processing
- 📝 **Markdown Support**: Rich problem descriptions
- 🗃️ **Database ORM**: Prisma for type-safe database operations
- 🌐 **CORS Support**: Cross-origin request handling
- 📊 **Error Handling**: Structured error responses

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod
- **Markdown**: marked
- **HTML Sanitization**: sanitize-html
- **Markdown Conversion**: turndown

## 📁 Project Structure

```
CodeWar_Problem_Admin_Service/
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/             # Database migrations
└── src/
    ├── index.ts                # Application entry point
    ├── config/
    │   ├── db.config.ts        # Database configuration
    │   └── server.config.ts    # Server configuration
    ├── controllers/
    │   └── problemController.ts # Problem CRUD controllers
    ├── models/
    │   ├── createProblemSchema.ts
    │   ├── updateProblemSchema.ts
    │   ├── testcaseSchema.ts
    │   ├── codeSubsSchema.ts
    │   └── solutionSchema.ts
    ├── routes/
    │   ├── index.ts            # Main router
    │   └── v1/
    │       ├── index.ts        # v1 API router
    │       └── problemRoutes.ts # Problem routes
    ├── validators/
    │   └── probelemValidator.ts # Request validation
    ├── errors/
    │   ├── baseError.ts
    │   ├── badRequestError.ts
    │   ├── notFoundError.ts
    │   └── internalServerError.ts
    ├── repositories/           # Data access layer
    ├── service/               # Business logic layer
    └── utils/
        └── ErrorHandler.ts    # Global error handler
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn

### Installation

1. **Navigate to the service directory**:
```bash
cd CodeWar_Problem_Admin_Service
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
Create a `.env` file in the root directory:
```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/codewar_problems_db"

# Server Configuration
PORT=3001

# Environment
NODE_ENV=development
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

The service will be available at `http://localhost:3001`

## 📡 API Documentation

### Base URL
```
http://localhost:3001/api/v1
```

### Health Check
```http
GET /api/ping
```
**Response**:
```json
{
  "message": "API is up and running"
}
```

### Problem Endpoints

#### Get All Problems
```http
GET /problems
```
**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "clx1234567890",
      "title": "Two Sum",
      "description": "Find two numbers that add up to target",
      "difficulty": "Easy",
      "tags": ["Array", "Hash Table"],
      "companies": ["Google", "Amazon"],
      "testcases": [...],
      "codeSubs": [...],
      "solutions": [...]
    }
  ]
}
```

#### Get Problem by ID
```http
GET /problems/:id
```
**Response**:
```json
{
  "success": true,
  "data": {
    "id": "clx1234567890",
    "title": "Two Sum",
    "description": "Find two numbers that add up to target",
    "difficulty": "Easy",
    "tags": ["Array", "Hash Table"],
    "companies": ["Google", "Amazon"],
    "editorial": "This problem can be solved using...",
    "hints": ["Try using a hash map", "Think about the complement"],
    "testcases": [
      {
        "id": "tc1",
        "input": "[2,7,11,15]\n9",
        "output": "[0,1]",
        "isHidden": false
      }
    ],
    "codeSubs": [
      {
        "id": "cs1",
        "language": "python",
        "startSnippet": "def twoSum(nums, target):",
        "endSnippet": "    return result",
        "userSnippet": "    # Your code here"
      }
    ],
    "solutions": [
      {
        "id": "sol1",
        "language": "python",
        "code": "def twoSum(nums, target):\n    hash_map = {}\n    ..."
      }
    ]
  }
}
```

#### Create New Problem
```http
POST /problems
Content-Type: application/json
```
**Request Body**:
```json
{
  "title": "Two Sum",
  "description": "Find two numbers that add up to target",
  "difficulty": "Easy",
  "tags": ["Array", "Hash Table"],
  "companies": ["Google", "Amazon"],
  "editorial": "This problem can be solved using...",
  "hints": ["Try using a hash map"],
  "testcases": [
    {
      "input": "[2,7,11,15]\n9",
      "output": "[0,1]",
      "isHidden": false
    }
  ],
  "codeSubs": [
    {
      "language": "python",
      "startSnippet": "def twoSum(nums, target):",
      "endSnippet": "    return result",
      "userSnippet": "    # Your code here"
    }
  ],
  "solutions": [
    {
      "language": "python",
      "code": "def twoSum(nums, target):\n    hash_map = {}\n    ..."
    }
  ]
}
```

#### Update Problem
```http
PUT /problems/:id
Content-Type: application/json
```
**Request Body**: Same as create, but all fields are optional.

#### Delete Problem
```http
DELETE /problems/:id
```
**Response**:
```json
{
  "success": true,
  "message": "Problem deleted successfully"
}
```

## 🗃️ Database Schema

### Problem Table
```sql
Problem {
  id          String     @id @default(cuid())
  title       String     @unique
  description String
  difficulty  String
  testcases   testcase[]
  codeSubs    codeSubs[]
  solutions   solution[]
  tags        String[]
  companies   String[]
  editorial   String?
  hints       String[]
}
```

### Test Case Table
```sql
testcase {
  id         String   @id @default(cuid())
  problemId  String
  input      String
  output     String
  isHidden   Boolean  @default(false)
  problem    Problem  @relation(fields: [problemId], references: [id], onDelete: Cascade)
}
```

### Code Substitution Table
```sql
codeSubs {
  id          String   @id @default(cuid())
  problemId   String
  language    String
  startSnippet String
  endSnippet   String
  userSnippet  String
  problem     Problem  @relation(fields: [problemId], references: [id], onDelete: Cascade)
}
```

### Solution Table
```sql
solution {
  id         String   @id @default(cuid())
  problemId  String
  language   String
  code       String
  problem    Problem  @relation(fields: [problemId], references: [id], onDelete: Cascade)
}
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DATABASE_URL` | PostgreSQL connection string | - | ✅ |
| `PORT` | Server port | 3001 | ❌ |
| `NODE_ENV` | Environment mode | development | ❌ |

### Server Configuration
Located in `src/config/server.config.ts`:
- Port configuration
- Environment-specific settings

### Database Configuration
Located in `src/config/db.config.ts`:
- Prisma client initialization
- Connection management

## 🧪 Testing

### Running Tests
```bash
npm test
```

### Manual Testing with curl

1. **Health check**:
```bash
curl http://localhost:3001/api/ping
```

2. **Get all problems**:
```bash
curl http://localhost:3001/api/v1/problems
```

3. **Create a problem**:
```bash
curl -X POST http://localhost:3001/api/v1/problems \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Problem","description":"A test","difficulty":"Easy"}'
```

## 🐛 Error Handling

The service uses structured error handling with custom error classes:

- `BadRequestError` (400): Invalid request data
- `NotFoundError` (404): Resource not found
- `InternalServerError` (500): Server errors

### Error Response Format
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "statusCode": 400,
    "details": "Additional error details"
  }
}
```

## 📊 Monitoring & Logging

### Logging
- Request/response logging
- Error tracking
- Database query logging (via Prisma)

### Health Monitoring
- `/api/ping` endpoint for health checks
- Database connection status
- Memory and CPU usage

## 🔒 Security

### Input Validation
- Zod schema validation for all inputs
- HTML sanitization for user content
- SQL injection prevention via Prisma

### CORS Configuration
- Configurable origins
- Secure headers
- Method restrictions

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

### Docker (Optional)
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3001
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Tafheem Ahemad**
- GitHub: [@Tafheem-Ahemad](https://github.com/Tafheem-Ahemad)

---

For more information about the overall CodeWar platform, see the [main README](../README.md).