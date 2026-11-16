/**
 * ============================================================================
 * LSPD | Los Santos Police Department - Official Web Server
 * Node.js + Express
 * ============================================================================
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Google Forms Complaint URL
const COMPLAINT_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdcNDCBLHxIllWC0Msst7ZGjhjYj9lNAESX-XQOZFcXp7wEcQ/viewform?usp=dialog';

// Middleware
app.use(express.static(path.join(__dirname)));

// Direct Complaint redirect route
app.get('/stiznost', (req, res) => {
  res.redirect(COMPLAINT_FORM_URL);
});

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start listening
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` LSPD PORTAL RUNNING`);
  console.log(` Local URL: http://localhost:${PORT}`);
  console.log(` Complaint Forms: ${COMPLAINT_FORM_URL}`);
  console.log(`====================================================`);
});
