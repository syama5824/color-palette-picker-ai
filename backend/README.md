# Color Palette Backend API

Backend service for AI-powered theme-based color palette generation using AWS Bedrock Claude 3 Sonnet.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure AWS Credentials
Edit `backend/.env` file with your AWS credentials:
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_actual_access_key
AWS_SECRET_ACCESS_KEY=your_actual_secret_key
PORT=3001
CORS_ORIGIN=http://localhost:5173
```

### 3. AWS Bedrock Model Access
Ensure you have access to Claude 3 Sonnet model in AWS Bedrock:
- Go to AWS Console → Bedrock → Model Access
- Request access to `anthropic.claude-3-sonnet-20240229-v1:0`

### 4. Start the Server
```bash
npm run dev    # Development with nodemon
# or
npm start      # Production
```

The API will be available at `http://localhost:3001`

## API Endpoints

### POST `/api/generate-theme-palette`
Generate a themed color palette using AI.

**Request:**
```json
{
  "theme": "sunset"
}
```

**Response:**
```json
{
  "success": true,
  "colors": ["#FCA17D", "#F76C6C", "#B1BCE6", "#7F95D1", "#4D7EA8"],
  "theme": "sunset"
}
```

### GET `/api/health`
Health check endpoint.

## Features

- ✅ AWS Bedrock Claude 3 Sonnet integration
- ✅ Rate limiting (10 requests/minute per IP)
- ✅ Input validation and sanitization
- ✅ Automatic fallback to random colors on AI failure
- ✅ CORS enabled for frontend
- ✅ Error handling and logging