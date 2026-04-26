// Google Apps Script Template for Telegram Integration
// Deploy as Web App and copy the URL to replace YOUR_SCRIPT_ID in application.html

// Configuration
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Format message for Telegram
    const message = formatTelegramMessage(data);
    
    // Send to Telegram
    sendTelegramMessage(message);
    
    // Log the application (optional)
    logApplication(data);
    
    return ContentService.createTextOutput('Success');
  } catch (error) {
    console.error('Error processing application:', error);
    return ContentService.createTextOutput('Error');
  }
}

function formatTelegramMessage(data) {
  const message = `
🏆 NEW INVESTMENT APPLICATION 🏆

👤 Personal Information:
• Name: ${data.firstName} ${data.lastName}
• Email: ${data.email}
• Phone: ${data.phone}
• WhatsApp: ${data.whatsapp || 'Not provided'}
• Country: ${data.country}

💼 Professional Information:
• Occupation: ${data.occupation}
• Income Range: ${data.incomeRange}

📝 Application Details:
• Reason: ${data.reason}
• Consent: ${data.consent ? 'Agreed' : 'Not agreed'}
• Source: ${data.source}
• Timestamp: ${data.timestamp}

🔔 Action Required: Review and contact applicant within 24-48 hours
  `.trim();
  
  return message;
}

function sendTelegramMessage(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  const payload = {
    chat_id: TELEGRAM_CHAT_ID,
    text: message,
    parse_mode: 'HTML',
    disable_web_page_preview: true
  };
  
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  };
  
  UrlFetchApp.fetch(url, options);
}

function logApplication(data) {
  // Optional: Log to Google Sheet
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Applications') || 
                SpreadsheetApp.getActiveSpreadsheet().insertSheet('Applications');
  
  const headers = ['Timestamp', 'FirstName', 'LastName', 'Email', 'Phone', 'WhatsApp', 
                   'Country', 'Occupation', 'IncomeRange', 'Reason', 'Consent', 'Source'];
  
  // Add headers if sheet is new
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  
  // Add new application
  const row = [
    data.timestamp,
    data.firstName,
    data.lastName,
    data.email,
    data.phone,
    data.whatsapp || '',
    data.country,
    data.occupation,
    data.incomeRange,
    data.reason,
    data.consent,
    data.source
  ];
  
  sheet.appendRow(row);
}

// Test function (run this in Google Apps Script editor to test)
function testTelegram() {
  const testData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    whatsapp: '+1234567890',
    country: 'US',
    occupation: 'Software Engineer',
    incomeRange: '5000-10000',
    reason: 'I am interested in this program because I want to diversify my investment portfolio.',
    consent: true,
    timestamp: new Date().toISOString(),
    source: 'Test'
  };
  
  const message = formatTelegramMessage(testData);
  sendTelegramMessage(message);
}

// Deployment instructions:
// 1. Go to Google Apps Script (script.google.com)
// 2. Create new project
// 3. Paste this code
// 4. Replace TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID
// 5. Deploy as Web App
// 6. Copy the URL and replace YOUR_SCRIPT_ID in application.html
// 7. Test with the testTelegram() function
