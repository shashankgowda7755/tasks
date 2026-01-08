
/* 
   OneSystem Tracker - Google Sheets Backend
   -----------------------------------------
   1. Create a new Google Sheet.
   2. Go to Extensions > Apps Script.
   3. Paste this code.
   4. Run 'setupSheet' once to create headers.
   5. Deploy > New Deployment > Web App > "Who has access: Anyone" > Deploy.
   6. Copy the Web App URL.
*/

function doGet(e) {
    return handleRequest(e);
}

function doPost(e) {
    return handleRequest(e);
}

function handleRequest(e) {
    try {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        const action = e.parameter.action;

        // 1. READ TASKS
        if (action === 'read') {
            const data = sheet.getDataRange().getValues();
            const headers = data[0];
            const rows = data.slice(1);

            const tasks = rows.map(row => {
                // Convert logs from JSON string back to array
                let logs = [];
                try { logs = JSON.parse(row[6] || '[]'); } catch (err) { }

                return {
                    id: row[0].toString(),
                    title: row[1],
                    priority: row[2],
                    category: row[3],
                    dueDate: row[4],
                    progress: parseInt(row[5]),
                    logs: logs,
                    notes: row[7],
                    completed: row[8] === true || row[8] === "true",
                    createdAt: row[9],
                    isVisible: row[10] === '' ? true : (row[10] === true || row[10] === "true") // New Field
                };
            }).filter(t => t.id); // Filter empty rows

            return response({ status: 'success', data: tasks });
        }

        // 2. SAVE TASKS (Sync)
        if (action === 'save') {
            const payload = JSON.parse(e.postData.contents);
            const tasks = payload.tasks;

            // Clear and Re-write (Simplest synchronization)
            // For very large datasets, we would update by ID, but for <1000 tasks, this is safer.
            sheet.clearContents();

            // Headers
            const headers = ["ID", "Title", "Priority", "Category", "Due Date", "Progress", "Logs (JSON)", "Legacy Notes", "Completed", "Created At", "Visible"];
            sheet.appendRow(headers);

            if (tasks.length > 0) {
                const rows = tasks.map(t => [
                    t.id,
                    t.title,
                    t.priority,
                    t.category,
                    t.dueDate,
                    t.progress,
                    JSON.stringify(t.logs || []), // Store complex log feed as JSON
                    t.notes || '',
                    t.completed,
                    t.createdAt,
                    t.isVisible // New Field
                ]);

                // Batch write for speed
                sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
            }

            return response({ status: 'success', count: tasks.length });
        }

        return response({ status: 'error', message: 'Invalid action' });

    } catch (err) {
        return response({ status: 'error', message: err.toString() });
    }
}

function response(data) {
    return ContentService
        .createTextOutput(JSON.stringify(data))
        .setMimeType(ContentService.MimeType.JSON);
}

function setupSheet() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const headers = ["ID", "Title", "Priority", "Category", "Due Date", "Progress", "Logs (JSON)", "Legacy Notes", "Completed", "Created At", "Visible"];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
}
