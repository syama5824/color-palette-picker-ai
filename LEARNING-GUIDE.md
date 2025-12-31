# 🎓 Learning Guide: AI Color Palette Picker

## 📚 What You'll Learn

This project teaches you:
- **React + TypeScript** frontend development
- **Node.js + Express** backend API creation
- **AWS Bedrock** AI model integration
- **Claude 3 Sonnet** prompt engineering
- **Full-stack** application architecture

## 🚀 Quick Start (Root User)

### 1. Setup (One Time)
```bash
# Run this once to install everything
setup-learning-env.bat
```

### 2. Configure AWS (One Time)
1. Get your AWS root access keys from AWS Console
2. Edit `backend/.env` with your credentials:
```env
AWS_ACCESS_KEY_ID=AKIA...your_key
AWS_SECRET_ACCESS_KEY=your_secret_key
```

### 3. Start Learning
```bash
# Run this every time you want to code
start-learning-app.bat
```

## 🧪 Learning Experiments

### Experiment 1: Basic AI Prompts
Try these themes and see how AI interprets them:
- `sunset` → Should give warm colors
- `cyberpunk` → Should give neon colors
- `minimalist` → Should give neutral colors

### Experiment 2: Modify AI Prompts
Edit `backend/server.js` line 45-60 to change how AI generates colors:
```javascript
const prompt = `Generate exactly 5 hex color codes for a "${theme}" themed color palette...`
```

### Experiment 3: Add New Features
Try adding:
- More color formats (RGB, HSL)
- Color harmony validation
- Palette history
- Custom theme suggestions

### Experiment 4: Frontend Customization
Modify `src/components/ThemeInput.tsx` to:
- Add more example themes
- Change the UI design
- Add color preview animations

## 🔍 Code Structure Learning

### Frontend (`src/`)
- `App.tsx` → Main application logic
- `components/` → Reusable UI components
- `services/apiService.ts` → Backend communication
- `utils/` → Helper functions

### Backend (`backend/`)
- `server.js` → Express API server
- `.env` → Configuration (your AWS keys)
- `package.json` → Dependencies

## 🛠 Learning Challenges

### Beginner
- [ ] Change the default color palette
- [ ] Add a new example theme
- [ ] Modify the glassmorphism styling

### Intermediate  
- [ ] Add color format conversion (hex to RGB)
- [ ] Implement palette favorites/history
- [ ] Add loading animations

### Advanced
- [ ] Add different AI models (GPT, Gemini)
- [ ] Implement user authentication
- [ ] Add palette sharing functionality
- [ ] Create mobile app version

## 🚨 Common Learning Issues

**"AI unavailable" message:**
- Check AWS credentials in `backend/.env`
- Verify Bedrock model access is enabled
- Ensure backend is running at localhost:3001

**Backend won't start:**
- Run `setup-learning-env.bat` first
- Check Node.js is installed
- Verify no other app is using port 3001

**Frontend issues:**
- Refresh http://localhost:5173
- Check browser console for errors
- Ensure Vite dev server is running

## 📖 Learning Resources

- **React**: https://react.dev/learn
- **TypeScript**: https://www.typescriptlang.org/docs/
- **AWS Bedrock**: https://docs.aws.amazon.com/bedrock/
- **Express.js**: https://expressjs.com/
- **TailwindCSS**: https://tailwindcss.com/docs

## 🎯 Learning Goals

By the end of this project, you should understand:
1. How to build a React frontend with TypeScript
2. How to create a Node.js backend API
3. How to integrate with AWS AI services
4. How to handle API communication and error handling
5. How to deploy full-stack applications

Happy learning! 🚀