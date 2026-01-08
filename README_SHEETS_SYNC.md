# OneSystem Tracker - Cloud Synchronization Guide

Connect your Task Tracker to Google Sheets to save data permanently and track history.

### Step 1: Create the Google Backend
1. Go to [Google Sheets](https://sheets.google.com) and create a new blank sheet. Name it **"OneSystem Data"**.
2. Shows "Extensions" in the top menu -> Click **Extensions** -> **Apps Script**.
3. Clear any code in the editor (`myFunction`).
4. Copy the code from `google_apps_script.js` in your project folder.
5. Paste it into the Google Apps Script editor.
6. Press the **Save** icon (floppy disk).

### Step 2: Initialize
1. In the Apps Script editor toolbar, look for a dropdown menu that says `readData` (or similar). Change it to `setupSheet`.
2. Click **Run**.
3. It will ask for permissions ("Review Permissions"). Click **Review Permissions**, choose your account, click **Advanced** -> **Go to (unsafe)** -> **Allow**.
   * *This is safe because it's your own script accessing your own sheet.*
4. Check your Google Sheet. You should see headers (ID, Title, Priority...) automatically created in Row 1.

### Step 3: Deploy as API
1. In the Apps Script editor (top right), click **Deploy** -> **New Deployment**.
2. Click the specific gear icon (Select type) -> **Web App**.
3. **Description**: "Task Tracker API".
4. **Execute as**: Me (your email).
5. **Who has access**: **Anyone** (Important! This allows your local app to talk to Google).
6. Click **Deploy**.
7. Copy the **Web App URL** (starts with `https://script.google.com/macros/s/...`).

### Step 4: Connect Frontend
1. Open your local file `/Users/mukesh/.gemini/antigravity/scratch/task_tracker/app.js`.
2. On Line 3, find: `const API_URL = '';`
3. Paste your URL inside the quotes:
   ```javascript
   const API_URL = 'https://script.google.com/macros/s/ALongStringOfCharacters/exec';
   ```
4. Save the file.
5. Reload your Task Tracker (`index.html`).

**You are now Live!**  
Any change you make in the app will sync to the Google Sheet. You can open the Google Sheet to see rows being updated in real-time.
