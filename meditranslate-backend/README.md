# Meditranslate Backend

AI-powered medical report translation system with Nepali language support.

## Features

- 🔐 JWT-based authentication
- 🤖 AI-powered medical translation (LoRA fine-tuned)
- 💬 ChatGPT-like conversation history
- 🛡️ Production-ready security (rate limiting, sanitization, helmet)
- 📝 Input validation with Joi
- 🏗️ Domain-Driven Design architecture
- 📊 Structured logging with Winston

## Prerequisites

- Node.js >= 18.0.0
- MongoDB >= 5.0
- AI Translation Service (Python/FastAPI)

## Installation

\`\`\`bash
# Clone repository
git clone <your-repo-url>
cd meditranslate-backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your configurations

# Start MongoDB (if using Docker)
docker-compose up -d mongodb

# Run development server
npm run dev
\`\`\`

## Running with Docker

\`\`\`bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop services
docker-compose down
\`\`\`

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- POST /api/auth/logout - Logout user

### AI Translation
- POST /api/ai/translate - Translate medical report
- GET /api/ai/health - Check AI service health

### Chat Management
- GET /api/chat - Get all chat sessions
- GET /api/chat/:id - Get chat by ID
- POST /api/chat - Create new chat
- PATCH /api/chat/:id - Update chat title
- DELETE /api/chat/:id - Delete chat

## Project Structure

\`\`\`
src/
├── domains/          # Business domains
│   ├── auth/        # Authentication domain
│   ├── user/        # User domain
│   ├── chat/        # Chat domain
│   └── ai/          # AI translation domain
├── shared/          # Shared resources
│   ├── middleware/  # Express middleware
│   ├── utils/       # Utility functions
│   ├── constants/   # Application constants
│   └── exceptions/  # Custom exceptions
├── config/          # Configuration files
├── app.js          # Express app setup
└── server.js       # Server entry point
\`\`\`

## Testing

\`\`\`bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
\`\`\`

## Linting & Formatting

\`\`\`bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
\`\`\`

## Environment Variables

See `.env.example` for all required environment variables.

## License

MIT
