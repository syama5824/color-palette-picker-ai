const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');
require('dotenv').config({ path: './backend/.env' });

async function checkBedrockAccess() {
  console.log('🔍 Checking AWS Bedrock Access...\n');
  
  // Check environment variables
  console.log('📋 Configuration:');
  console.log(`   Region: ${process.env.AWS_REGION || 'Not set'}`);
  console.log(`   Access Key: ${process.env.AWS_ACCESS_KEY_ID ? 'Set ✓' : 'Not set ❌'}`);
  console.log(`   Secret Key: ${process.env.AWS_SECRET_ACCESS_KEY ? 'Set ✓' : 'Not set ❌'}`);
  console.log('');

  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.log('❌ AWS credentials not configured. Please edit backend/.env file.');
    return;
  }

  // Create Bedrock client
  const bedrockClient = new BedrockRuntimeClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  // Test model access
  try {
    console.log('🧪 Testing Claude 3 Sonnet access...');
    
    const modelId = 'anthropic.claude-3-sonnet-20240229-v1:0';
    const command = new InvokeModelCommand({
      modelId,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: 50,
        messages: [
          {
            role: 'user',
            content: 'Say "Hello" in JSON format: {"message": "Hello"}'
          }
        ]
      })
    });

    const response = await bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    
    console.log('✅ SUCCESS! Claude 3 Sonnet is accessible.');
    console.log('📝 Test response:', responseBody.content[0].text);
    console.log('');
    console.log('🎉 Your AI Color Palette Picker is ready to use!');
    console.log('   Run: start-learning-app.bat');
    
  } catch (error) {
    console.log('❌ FAILED to access Claude 3 Sonnet');
    console.log('');
    console.log('🔧 Troubleshooting:');
    
    if (error.name === 'ValidationException') {
      console.log('   • Model access not enabled in AWS Bedrock');
      console.log('   • Go to AWS Console → Bedrock → Foundation Models');
      console.log('   • Find Claude 3 Sonnet and enable access');
    } else if (error.name === 'UnauthorizedOperation' || error.name === 'AccessDeniedException') {
      console.log('   • AWS credentials may be incorrect');
      console.log('   • Check your Access Key ID and Secret Key');
      console.log('   • Ensure root user has Bedrock permissions');
    } else if (error.name === 'ResourceNotFoundException') {
      console.log('   • Model not available in this region');
      console.log('   • Try changing AWS_REGION to us-east-1 in backend/.env');
    } else {
      console.log('   • Error:', error.message);
      console.log('   • Check AWS region and model availability');
    }
    
    console.log('');
    console.log('📚 Need help? Check LEARNING-GUIDE.md');
  }
}

checkBedrockAccess();