# Brother Ben Frontend - Backend Integration

## Project Structure

```
natal/DCL/
├── brotherben/          # Backend (AWS Lambda, Bedrock Agent)
└── bbenb/               # Frontend (React + Vite + TypeScript)
```

## Integration Overview

The frontend (`bbenb`) now connects to the Brother Ben backend API deployed on AWS API Gateway.

### Backend Agent Configuration

**Bedrock Agent**: BrotherBen (ID: `PLGO7CNWUR`)
**Current Alias**: `ingested-v1` (ID: `BAVA5PWNNI`)
**Agent Version**: 5
**Foundation Model**: Claude Haiku 4.5

The agent has 2 Knowledge Bases connected:
- **knowledge-base-references** (Y7VVIQP9B5): Official ACCA doctrine documents
- **knowledge-base-quick-start** (OGH5GDDL95): Monthly devotional articles 2022-2025

### Backend API Endpoints

- **Base URL**: `https://v6nfnsyr8f.execute-api.us-east-1.amazonaws.com/prod`
- **Chat**: `POST /chat` - Conversational interface with Brother Ben
- **Analyze**: `POST /analyze` - Content analysis pipeline

### Frontend Integration Files

1. **[src/config/api.ts](src/config/api.ts)** - API configuration
2. **[src/services/brotherBenApi.ts](src/services/brotherBenApi.ts)** - API service client
3. **[src/components/BrotherBen/ChatScreen.tsx](src/components/BrotherBen/ChatScreen.tsx)** - Updated to use real API

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the frontend root:

```bash
cp .env.example .env
```

The `.env` file contains:
```
VITE_API_BASE_URL=https://v6nfnsyr8f.execute-api.us-east-1.amazonaws.com/prod
```

### 2. Install Dependencies

```bash
cd bbenb
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or another port if 5173 is busy).

### 4. Build for Production

```bash
npm run build
```

## Features

### Chat Interface

- **Real-time chat** with Brother Ben using AWS Bedrock Agent
- **Session management** - conversations are tracked across messages
- **User identification** - automatic user ID generation and storage
- **Error handling** - fallback to mock responses if API fails
- **Toast notifications** - user-friendly error messages

### API Service Features

- **Timeout handling** - 30-second timeout for API calls
- **TypeScript types** - full type safety for API requests/responses
- **Error messages** - detailed error reporting
- **Abort controllers** - proper cleanup of network requests

### User Context

The frontend sends user context to personalize responses:

```typescript
user_context: {
  role: 'member' | 'minister' | 'teacher' | 'seeker'
}
```

Currently defaults to `'member'` but can be customized.

## Testing

### Test with Real API

The default mode (`useRealApi = true` in ChatScreen.tsx) connects to the live backend.

### Test with Mock Responses

Set `useRealApi = false` in [src/components/BrotherBen/ChatScreen.tsx](src/components/BrotherBen/ChatScreen.tsx#L28) to use mock responses for offline development.

### Backend Testing

Test the backend API directly:

```bash
cd ../brotherben
python test_api.py chat "What does the AC church teach about baptism?"
```

## CORS Configuration

**Important**: The API Gateway needs CORS enabled for the frontend to connect from the browser.

If you encounter CORS errors, add these headers to your API Gateway responses:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

## Deployment Options

### Option 1: AWS S3 + CloudFront

1. Build the frontend: `npm run build`
2. Upload `dist/` to S3 bucket
3. Configure CloudFront distribution
4. Update CORS in API Gateway to allow your CloudFront URL

### Option 2: Vercel/Netlify

1. Connect GitHub repo to Vercel/Netlify
2. Set environment variable: `VITE_API_BASE_URL`
3. Deploy automatically on push

### Option 3: AWS Amplify

1. Connect GitHub repo to AWS Amplify
2. Configure build settings
3. Set environment variables in Amplify Console

## File Structure

```
bbenb/
├── src/
│   ├── components/
│   │   └── BrotherBen/
│   │       ├── BrotherBen.tsx          # Main component
│   │       ├── ChatScreen.tsx          # Chat interface (✅ API integrated)
│   │       ├── ChatMessage.tsx         # Message display
│   │       ├── ChatInput.tsx           # User input
│   │       ├── OnboardingScreen.tsx    # Welcome screen
│   │       └── mockResponses.ts        # Fallback responses
│   ├── config/
│   │   └── api.ts                      # ✅ API configuration
│   ├── services/
│   │   └── brotherBenApi.ts            # ✅ API client service
│   └── ...
├── .env                                # ✅ Environment variables (gitignored)
├── .env.example                        # ✅ Example env file
└── README_INTEGRATION.md               # ✅ This file
```

## Next Steps

1. **Test the integration** - Start both frontend and verify API calls
2. **Configure CORS** - Update API Gateway if needed
3. **Customize user roles** - Add user role selection in UI
4. **Add loading states** - Improve UX during API calls
5. **Deploy frontend** - Choose deployment platform

## Troubleshooting

### CORS Errors

If you see CORS errors in browser console:
1. Check API Gateway CORS configuration
2. Verify `Access-Control-Allow-Origin` header is set
3. Test API directly with curl to verify backend works

### Connection Timeout

If requests timeout:
1. Check Lambda function timeout settings (default 30s)
2. Verify Bedrock Agent is responding
3. Check CloudWatch logs for Lambda errors

### Mock Responses Showing

If you see mock responses instead of real ones:
1. Check `useRealApi` flag in [ChatScreen.tsx](src/components/BrotherBen/ChatScreen.tsx#L28)
2. Verify `.env` file exists with correct API URL
3. Check browser console for API errors

## Resources

- **Backend README**: [../brotherben/README.md](../brotherben/README.md)
- **API Test Script**: [../brotherben/test_api.py](../brotherben/test_api.py)
- **Backend Docs**: See brotherben project for full API documentation
