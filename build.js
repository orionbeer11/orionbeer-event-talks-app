const fs = require('fs');
const path = require('path');

const talks = JSON.parse(fs.readFileSync('talks.json', 'utf-8'));
const htmlTemplate = fs.readFileSync(path.join('src', 'template.html'), 'utf-8');
const css = fs.readFileSync(path.join('src', 'style.css'), 'utf-8');
const js = fs.readFileSync(path.join('src', 'script.js'), 'utf-8');

const finalJs = `
const talks = ${JSON.stringify(talks)};
${js}
`;

const finalHtml = htmlTemplate
    .replace('<style></style>', `<style>${css}</style>`)
    .replace('<script></script>', `<script>${finalJs}</script>`);

fs.writeFileSync('index.html', finalHtml);

console.log('Website built successfully! Open index.html in your browser.');
