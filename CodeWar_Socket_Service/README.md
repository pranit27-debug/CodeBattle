# CodeWar Socket Service

## 📋 Overview

The Socket Service is the real-time communication hub of the CodeWar platform, providing instant WebSocket-based communication between clients and services. It manages user connections, handles real-time notifications, and enables live updates for code submission status, evaluation results, and system events. Built with Socket.IO and Express.js for reliable real-time messaging.

## 🏗️ Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                    Socket Service                           │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │   Socket.IO     │  │   Connection    │  │   Event     │  │
│  │   Server        │  │   Management    │  │   Handlers  │  │
│  │   - WebSocket   │  │   - User Maps   │  │   - Topic   │  │
│  │   - Events      │  │   - Session     │  │   - Payload │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
│                                                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │   Redis Cache   │  │   HTTP Routes   │  │   CORS      │  │
│  │   - User Maps   │  │   - Send Msgs   │  │   - Config  │  │
│  │   - Session     │  │   - Health      │  │   - Origins │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                External Dependencies                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Redis       │  │ Client Apps │  │ Other Services      │  │
│  │ (Session)   │  │ (Frontend)  │  │ (Publishers)        │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Features

### Real-time Communication

- 🔌 **WebSocket Support**: Full-duplex real-time communication
- 📡 **Event-driven**: Topic-based message routing
- 🔄 **Auto-reconnection**: Client reconnection handling
- 📱 **Cross-platform**: Web, mobile, and desktop support
- 🌐 **CORS Enabled**: Cross-origin WebSocket connections

### Connection Management

- 👤 **User Mapping**: User ID to Socket ID mapping
- 💾 **Redis Storage**: Persistent connection state
- 🔄 **Auto-cleanup**: Cleanup on disconnect
- 📊 **Connection Tracking**: Real-time connection monitoring
- 🔍 **Connection Discovery**: Find user connections

### Message Broadcasting

- 📤 **Targeted Messaging**: Send to specific users
- 📢 **Topic-based**: Organized event channels
- 📦 **Payload Delivery**: Structured message payloads
- 🔄 **Delivery Status**: Message delivery confirmation
- 🛡️ **Error Handling**: Failed delivery handling

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **WebSocket**: Socket.IO
- **Cache**: Redis (for session management)
- **CORS**: Cross-origin resource sharing
- **HTTP Status**: Structured status codes

## 📁 Project Structure

```text
CodeWar_Socket_Service/
├── package.json                # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── src/
    ├── index.ts               # Application entry point
    └── config/
        ├── server.config.ts   # Server configuration
        └── redisConnection.ts # Redis connection setup
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Redis server
- CORS-enabled client applications

### Installation

1. **Navigate to the service directory**:

```bash
cd CodeWar_Socket_Service
```

2. **Install dependencies**:

```bash
npm install
```

3. **Set up environment variables**:

Create a `.env` file in the root directory:

```env
# Service Configuration
PORT=3004
NODE_ENV=development

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# CORS Configuration
ORIGIN=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# WebSocket Configuration
SOCKET_TRANSPORTS=websocket,polling
SOCKET_PING_TIMEOUT=60000
SOCKET_PING_INTERVAL=25000

# Logging
LOG_LEVEL=info
```

4. **Build the project**:

```bash
npm run build
```

5. **Start the service**:

```bash
# Development mode with hot reload
npm run dev

# Production mode
npm start
```

The service will be available at:
- **HTTP API**: `http://localhost:3004`
- **WebSocket**: `ws://localhost:3004`

## 📡 WebSocket API

### Connection Setup

#### Client Connection
```javascript
// Connect to Socket.IO server
const socket = io('http://localhost:3004', {
  transports: ['websocket', 'polling'],
  upgrade: true,
  rememberUpgrade: true
});

// Handle connection
socket.on('connect', () => {
  console.log('Connected to CodeWar Socket Service');
  console.log('Socket ID:', socket.id);
});
```

#### Set User ID
```javascript
// Map user ID to socket connection
socket.emit('setUserId', 'user_123');
```

#### Get Connection ID
```javascript
// Get socket ID for a user
socket.emit('getConnectionId', 'user_123');

socket.on('connectionId', (socketId) => {
  console.log('User socket ID:', socketId);
});
```

### Event Handling

#### Submission Status Updates
```javascript
// Listen for submission status changes
socket.on('submissionUpdate', (data) => {
  console.log('Submission Update:', data);
  // {
  //   submissionId: 'sub_123',
  //   status: 'IN_PROGRESS',
  //   testCase: 3,
  //   totalTestCases: 10
  // }
});
```

#### Evaluation Results
```javascript
// Listen for evaluation completion
socket.on('evaluationComplete', (data) => {
  console.log('Evaluation Complete:', data);
  // {
  //   submissionId: 'sub_123',
  //   status: 'ACCEPTED',
  //   result: {
  //     testCasesPassed: 10,
  //     totalTestCases: 10,
  //     executionTime: '120ms',
  //     memoryUsed: '25MB'
  //   }
  // }
});
```

#### Custom Run Results
```javascript
// Listen for custom run completion
socket.on('customRunComplete', (data) => {
  console.log('Custom Run Complete:', data);
  // {
  //   runId: 'run_456',
  //   output: 'Hello World',
  //   stderr: '',
  //   exitCode: 0,
  //   executionTime: '50ms'
  // }
});
```

#### Error Notifications
```javascript
// Listen for system errors
socket.on('error', (data) => {
  console.error('Socket Error:', data);
  // {
  //   type: 'EVALUATION_ERROR',
  //   message: 'Code execution failed',
  //   details: {...}
  // }
});
```

### Disconnect Handling
```javascript
// Handle disconnection
socket.on('disconnect', (reason) => {
  console.log('Disconnected:', reason);
});

// Handle connection errors
socket.on('connect_error', (error) => {
  console.error('Connection Error:', error);
});
```

## 🌐 HTTP API

### Send Message Endpoint

#### Send Payload to User
```http
POST /sendPayload
Content-Type: application/json
```

**Request Body**:
```json
{
  "userId": "user_123",
  "topic": "submissionUpdate",
  "status": "IN_PROGRESS",
  "submissionId": "sub_456",
  "progress": {
    "testCase": 5,
    "totalTestCases": 15
  }
}
```

**Response** (Success):
```json
{
  "message": "Payload sent successfully"
}
```

**Response** (User Not Connected):
```json
{
  "error": "User not connected"
}
```

**Response** (Bad Request):
```json
{
  "error": "Missing topic, payload or userId"
}
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Service port | 3004 | ❌ |
| `REDIS_HOST` | Redis server host | localhost | ✅ |
| `REDIS_PORT` | Redis server port | 6379 | ✅ |
| `ORIGIN` | Primary CORS origin | - | ✅ |
| `ALLOWED_ORIGINS` | Comma-separated origins | - | ❌ |
| `SOCKET_PING_TIMEOUT` | Ping timeout (ms) | 60000 | ❌ |
| `SOCKET_PING_INTERVAL` | Ping interval (ms) | 25000 | ❌ |

### Socket.IO Configuration

```typescript
// Socket.IO server setup
const io = new Server(httpServer, {
  cors: {
    origin: serverConfig.origin,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
  pingTimeout: 60000,
  pingInterval: 25000,
  transports: ['websocket', 'polling']
});
```

### Redis Configuration

```typescript
// Redis connection for session management
const redisConnection = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3
});
```

## 🔄 Event Flow

### User Connection Flow

```text
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client        │───▶│  Socket.IO      │───▶│  Redis Cache    │
│   Connects      │    │  Assigns ID     │    │  Store Mapping  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Client Sends   │───▶│  Map User ID    │───▶│  Update Redis   │
│  User ID        │    │  to Socket ID   │    │  with Mapping   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Message Delivery Flow

```text
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Service       │───▶│  HTTP POST      │───▶│  Find Socket    │
│   Sends Message │    │  /sendPayload   │    │  ID in Redis    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Emit to        │◀───│  Socket.IO      │◀───│  Validate       │
│  Client Socket  │    │  Send Event     │    │  Connection     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Disconnect Cleanup Flow

```text
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client        │───▶│  Socket.IO      │───▶│  Find User      │
│   Disconnects   │    │  Disconnect     │    │  in Redis       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Cleanup        │◀───│  Remove from    │◀───│  Match Socket   │
│  Complete       │    │  Redis Cache    │    │  ID and Delete  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🧪 Testing

### Manual Testing

1. **Test WebSocket connection**:
```javascript
// In browser console
const socket = io('http://localhost:3004');
socket.on('connect', () => console.log('Connected'));
socket.emit('setUserId', 'test_user');
```

2. **Test message sending**:
```bash
curl -X POST http://localhost:3004/sendPayload \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test_user",
    "topic": "test",
    "message": "Hello from API"
  }'
```

3. **Test connection mapping**:
```javascript
socket.emit('getConnectionId', 'test_user');
socket.on('connectionId', id => console.log('Connection ID:', id));
```

### Load Testing

```javascript
// Load test with multiple connections
const io = require('socket.io-client');

const connections = [];
for (let i = 0; i < 1000; i++) {
  const socket = io('http://localhost:3004');
  socket.emit('setUserId', `user_${i}`);
  connections.push(socket);
}
```

## 🐛 Error Handling

### Common Error Scenarios

1. **Connection Errors**:
   - Redis connection lost
   - Socket.IO server down
   - CORS policy violations

2. **Message Delivery Errors**:
   - User not connected
   - Invalid payload format
   - Socket ID not found

3. **Redis Errors**:
   - Cache read/write failures
   - Connection timeouts
   - Memory limitations

### Error Response Format

```json
{
  "error": "User not connected",
  "code": "USER_NOT_FOUND",
  "timestamp": "2025-09-18T10:30:00Z",
  "details": {
    "userId": "user_123",
    "action": "sendPayload"
  }
}
```

## 📊 Monitoring & Analytics

### Connection Metrics

- **Active Connections**: Real-time connection count
- **Connection Duration**: Average session length
- **Message Volume**: Messages per second/minute
- **Error Rate**: Failed message delivery rate

### Redis Metrics

- **Memory Usage**: Cache memory consumption
- **Hit Rate**: Cache hit/miss ratio
- **Connection Pool**: Redis connection status

### Logging

```typescript
// Structured logging for monitoring
console.log({
  event: 'user_connected',
  userId: 'user_123',
  socketId: 'socket_456',
  timestamp: new Date().toISOString(),
  ip: socket.request.connection.remoteAddress
});
```

## 🔒 Security

### CORS Configuration

```typescript
// Secure CORS setup
cors: {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || process.env.ORIGIN,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}
```

### Rate Limiting

```typescript
// Basic rate limiting (can be enhanced)
const rateLimitMap = new Map();

const rateLimit = (socketId, limit = 100) => {
  const now = Date.now();
  const windowStart = now - 60000; // 1 minute window
  
  if (!rateLimitMap.has(socketId)) {
    rateLimitMap.set(socketId, []);
  }
  
  const requests = rateLimitMap.get(socketId);
  const recentRequests = requests.filter(time => time > windowStart);
  
  if (recentRequests.length >= limit) {
    return false; // Rate limit exceeded
  }
  
  recentRequests.push(now);
  rateLimitMap.set(socketId, recentRequests);
  return true;
};
```

## 📈 Performance Optimization

### Connection Optimization

- **Connection Pooling**: Efficient Redis connections
- **Memory Management**: Cleanup disconnected users
- **Event Compression**: Compress large payloads

### Redis Optimization

```typescript
// Optimized Redis configuration
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379'),
  lazyConnect: true,
  keepAlive: 30000,
  maxRetriesPerRequest: 3,
  retryDelayOnFailover: 100
});
```

### Socket.IO Optimization

```typescript
// Performance-optimized Socket.IO
const io = new Server(httpServer, {
  pingTimeout: 60000,
  pingInterval: 25000,
  upgradeTimeout: 10000,
  maxHttpBufferSize: 1e6, // 1MB
  compression: true
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

EXPOSE 3004
CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  socket-service:
    build: .
    ports:
      - "3004:3004"
    environment:
      - REDIS_HOST=redis
      - ORIGIN=http://localhost:3000
    depends_on:
      - redis

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
```

### Clustering (for Scale)

```javascript
// Using Socket.IO Redis adapter for multiple instances
const { createAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');

const pubClient = createClient({ host: 'redis' });
const subClient = pubClient.duplicate();

io.adapter(createAdapter(pubClient, subClient));
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add comprehensive tests
4. Ensure WebSocket compatibility
5. Update documentation
6. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Tafheem Ahemad**
- GitHub: [@Tafheem-Ahemad](https://github.com/Tafheem-Ahemad)

---

For more information about the overall CodeWar platform, see the [main README](../README.md).