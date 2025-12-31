const express = require('express');
const cors = require('cors');
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));
app.use(express.json());

// AWS Bedrock client
const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Rate limiting (simple in-memory store)
const requestCounts = new Map();
const RATE_LIMIT = 10; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = requestCounts.get(ip) || [];
  
  // Remove old requests outside the window
  const recentRequests = userRequests.filter(time => now - time < RATE_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT) {
    return false;
  }
  
  recentRequests.push(now);
  requestCounts.set(ip, recentRequests);
  return true;
}

// Generate themed color palette
app.post('/api/generate-theme-palette', async (req, res) => {
  try {
    const { theme } = req.body;
    
    // Validate input
    if (!theme || typeof theme !== 'string' || theme.length > 100) {
      return res.status(400).json({ 
        error: 'Invalid theme. Please provide a theme string (max 100 characters).' 
      });
    }
    
    // Rate limiting
    const clientIP = req.ip || req.connection.remoteAddress;
    if (!checkRateLimit(clientIP)) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded. Please try again later.' 
      });
    }
    
    // Prepare Claude prompt
    const prompt = `Generate exactly 5 hex color codes for a "${theme}" themed color palette. 
    
The colors should:
- Capture the mood and aesthetic of "${theme}"
- Work harmoniously together
- Be suitable for design projects
- Include variety in lightness and saturation

Respond with ONLY a JSON object in this exact format:
{
  "colors": ["#RRGGBB", "#RRGGBB", "#RRGGBB", "#RRGGBB", "#RRGGBB"],
  "theme": "${theme}"
}

No additional text or explanation.`;

    const modelId = process.env.BEDROCK_MODEL_ID || 'anthropic.claude-3-sonnet-20240229-v1:0';
    
    const command = new InvokeModelCommand({
      modelId,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: 200,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });
    
    console.log(`Generating palette for theme: "${theme}"`);
    
    const response = await bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    
    // Parse Claude's response
    const aiResponse = responseBody.content[0].text;
    console.log('Claude response:', aiResponse);
    
    // Extract JSON from response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid AI response format');
    }
    
    const paletteData = JSON.parse(jsonMatch[0]);
    
    // Validate response format
    if (!paletteData.colors || !Array.isArray(paletteData.colors) || paletteData.colors.length !== 5) {
      throw new Error('AI returned invalid color palette format');
    }
    
    // Validate hex codes
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    const validColors = paletteData.colors.every(color => hexRegex.test(color));
    
    if (!validColors) {
      throw new Error('AI returned invalid hex color codes');
    }
    
    res.json({
      success: true,
      colors: paletteData.colors,
      theme: theme
    });
    
  } catch (error) {
    console.error('Error generating themed palette:', error);
    
    // Return fallback random colors
    const fallbackColors = [
      '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'),
      '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'),
      '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'),
      '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'),
      '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
    ];
    
    res.json({
      success: false,
      colors: fallbackColors,
      theme: req.body.theme,
      error: 'AI generation failed, showing random colors',
      fallback: true
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Color Palette API running on port ${PORT}`);
  console.log(`📡 CORS enabled for: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`);
});