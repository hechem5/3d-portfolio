const fs = require('fs');
const content = fs.readFileSync('C:/Users/Hechem/.gemini/antigravity/brain/5014867e-1c7c-4af6-9a7e-d488dc486400/.system_generated/steps/1704/content.md', 'utf-8');

// Try to find code blocks containing useScroll
const regex = /<code[^>]*>([\s\S]*?)<\/code>/g;
let match;
let found = false;

while ((match = regex.exec(content)) !== null) {
  const code = match[1];
  if (code.includes('useScroll') || code.includes('Timeline')) {
    console.log('--- FOUND CODE BLOCK ---');
    console.log(code.substring(0, 1000));
    found = true;
  }
}

if (!found) {
    console.log('No code blocks with useScroll found.');
}
