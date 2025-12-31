# 🎨 AI Color Palette Picker — Micro Tool  

An elegant micro-tool that generates stunning color palettes for design & UI inspiration.  
Enhanced with **AI Color Generation using Amazon Bedrock (Claude 3 Sonnet)**, allowing users to generate palettes based on **themes like _sunset, cyberpunk, mint aesthetic, forest, pastel vintage_ and more.**  

---

## 🖥 Demo

| Feature | Preview |
|--------|---------|
| 🤖 Backend AI JSON Output | ![Backend JSON Screenshot](https://github.com/syama5824/color-palette-picker-ai/blob/main/Screenshot%202025-12-31%20205134.png)|
| 📹 Demo Video | [Click to watch](https://github.com/syama5824/color-palette-picker-ai/blob/main/Untitled%20video%20-%20Made%20with%20Clipchamp.mp4)|

---

## 🚀 Features

### Core Features
- Generate **random 5-color palettes**
- Copy HEX values with one click
- Clean modern UI

### AI Features (Claude 3 Sonnet)
- Enter a theme keyword → AI generates palette JSON
- Returns 5 colors with HEX values + aesthetic description
- Useful for UI/UX designers & branding ideas

Example Output:
```json
{
  "theme": "sunset beach",
  "colors": [
    {"name": "Warm Coral", "hex": "#FF6F61"},
    {"name": "Sand Yellow", "hex": "#F4D35E"},
    {"name": "Soft Orange", "hex": "#EE964B"},
    {"name": "Ocean Blue", "hex": "#3A7CA5"},
    {"name": "Sky Purple", "hex": "#9A6BB1"}
  ],
  "description": "Warm summer tones with sea & sky gradients."
}
