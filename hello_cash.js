function fetchHelloCashArticles() {
  // Define API endpoint and authentication token
  var token = getApiKey();
  
  // Set up headers for the API request
  var headers = {
    "Authorization": "Bearer " + token,
    "Content-Type": "application/json",
    "Accept": "application/json"
  };
  
  // Set up options for the fetch request
  var options = {
    "method": "GET",
    "headers": headers,
    "muteHttpExceptions": true
  };
  
  try {
    var allArticles = [];
    var limit = 250;
    var offset = 1;
    var articles;
    
    do {
      var apiUrl = "https://api.hellocash.business/api/v1/articles?limit=" + limit + "&offset=" + offset + "&caid=&name=&code=";
      // Make the API request
      var response = UrlFetchApp.fetch(apiUrl, options);
      var responseCode = response.getResponseCode();
      var responseText = response.getContentText();
      
      Logger.log("Articles Response Code: " + responseCode);
      Logger.log("Articles Response Text: " + responseText);
      
      if (responseCode === 200) {
        // Parse the JSON response
        var json = JSON.parse(responseText);
        
        // Check for error in response
        if (json.error) {
          throw new Error("Articles API returned an error: " + json.error);
        }
        
        articles = json.articles || [];
        allArticles = allArticles.concat(articles);
        offset += 1;
      } else {
        throw new Error("Articles API request failed with status code: " + responseCode + " - " + responseText);
      }
    } while (articles.length === limit);
    
    // Get the spreadsheet and sheet
    var spreadsheetId = "1YFuNAX3ZnUA5RaNezeiERHUxkTg0MnoHWA1zmbyFXvE";
    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    var sheet = spreadsheet.getSheetByName("Articles");
    
    if (!sheet) {
      throw new Error("Sheet 'Articles' not found in the spreadsheet.");
    }
    
    // Prepare headers based on API response fields
    var articleHeaders = [
      "Article ID",
      "Name",
      "Code",
      "EAN Code",
      "Tax Rate",
      "Net Selling Price",
      "Gross Selling Price",
      "Stock",
      "Category ID",
      "Comment"
    ];
    
    // Set headers if not present
    if (sheet.getRange(1, 1).getValue() === "") {
      sheet.getRange(1, 1, 1, articleHeaders.length).setValues([articleHeaders]);
    }
    
    // Get existing Article IDs
    var lastRow = sheet.getLastRow();
    var idSet = new Set();
    if (lastRow > 1) {
      var existingIds = sheet.getRange(2, 1, lastRow - 1, 1).getValues().flat();
      existingIds.forEach(function(id) {
        if (id) idSet.add(String(id));
      });
    }
    
    // Prepare new data array
    var newData = [];
    allArticles.forEach(function(article) {
      var id = String(article.article_id || "");
      if (id && !idSet.has(id)) {
        newData.push([
          id,
          article.article_name || "",
          article.article_code || "",
          article.article_eanCode || "",
          article.article_taxRate || "",
          article.article_net_sellingPrice || 0,
          article.article_gross_sellingPrice || 0,
          article.article_stock || 0,
          article.article_category_id || "",
          article.article_comment || ""
        ]);
        idSet.add(id);
      }
    });
    
    // Write new data to sheet
    if (newData.length > 0) {
      var startRow = lastRow + 1;
      sheet.getRange(startRow, 1, newData.length, articleHeaders.length).setValues(newData);
      Logger.log("Successfully appended " + newData.length + " new articles to the sheet.");
    } else {
      Logger.log("No new articles to append.");
    }
  } catch (error) {
    Logger.log("Articles Error: " + error.message);
  }
}

function fetchHelloCashInvoices() {
  // Define API endpoint and authentication token
  var token = getApiKey();
  
  // Set up headers for the API request
  var headers = {
    "Authorization": "Bearer " + token,
    "Content-Type": "application/json",
    "Accept": "application/json"
  };
  
  // Set up options for the fetch request
  var options = {
    "method": "GET",
    "headers": headers,
    "muteHttpExceptions": true
  };
  
  try {
    var allInvoices = [];
    var limit = 250;
    var offset = 1;
    var invoices;
    
    do {
      var apiUrl = "https://api.hellocash.business/api/v1/invoices?limit=" + limit + "&offset=" + offset;
      // Make the API request
      var response = UrlFetchApp.fetch(apiUrl, options);
      var responseCode = response.getResponseCode();
      var responseText = response.getContentText();
      
      Logger.log("Invoices Response Code: " + responseCode);
      Logger.log("Invoices Response Text: " + responseText);
      
      if (responseCode === 200) {
        // Parse the JSON response
        var json = JSON.parse(responseText);
        
        // Check for error in response
        if (json.error) {
          throw new Error("Invoices API returned an error: " + json.error);
        }
        
        invoices = json.invoices || [];
        allInvoices = allInvoices.concat(invoices);
        offset += 1;
      } else {
        throw new Error("Invoices API request failed with status code: " + responseCode + " - " + responseText);
      }
    } while (invoices.length === limit);
    
    // Get the spreadsheet and sheet
    var spreadsheetId = "1YFuNAX3ZnUA5RaNezeiERHUxkTg0MnoHWA1zmbyFXvE";
    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    var sheet = spreadsheet.getSheetByName("Invoices");
    
    if (!sheet) {
      throw new Error("Sheet 'Invoices' not found in the spreadsheet.");
    }
    
    // Prepare headers based on assumed invoice fields
    var invoiceHeaders = [
      "Invoice ID",
      "Timestamp",
      "Invoice Number",
      "Cashier",
      "Payment Method",
      "Total Gross",
      "Discount",
      "Cancellation",
      "Tax Rate",
      "Tax Gross",
      "Tax Net",
      "Tax Amount"
    ];
    
    // Set headers if not present
    if (sheet.getRange(1, 1).getValue() === "") {
      sheet.getRange(1, 1, 1, invoiceHeaders.length).setValues([invoiceHeaders]);
    }
    
    // Get existing Invoice IDs
    var lastRow = sheet.getLastRow();
    var idSet = new Set();
    if (lastRow > 1) {
      var existingIds = sheet.getRange(2, 1, lastRow - 1, 1).getValues().flat();
      existingIds.forEach(function(id) {
        if (id) idSet.add(String(id));
      });
    }
    
    // Prepare new data array
    var newData = [];
    allInvoices.forEach(function(invoice) {
      var id = String(invoice.invoice_id || "");
      if (id && !idSet.has(id)) {
        newData.push([
          id,
          invoice.invoice_timestamp || "",
          invoice.invoice_number || "",
          invoice.invoice_cashier || "",
          invoice.invoice_payment || "",
          invoice.invoice_total || 0,
          invoice.invoice_discount || 0,
          invoice.invoice_cancellation || 0,
          invoice.taxes[0].tax_taxRate || 0,
          invoice.taxes[0].tax_gross || 0,
          invoice.taxes[0].tax_net || 0,
          invoice.taxes[0].tax_tax || 0
        ]);
        idSet.add(id);
      }
    });
    
    // Write new data to sheet
    if (newData.length > 0) {
      var startRow = lastRow + 1;
      sheet.getRange(startRow, 1, newData.length, invoiceHeaders.length).setValues(newData);
      Logger.log("Successfully appended " + newData.length + " new invoices to the sheet.");
    } else {
      Logger.log("No new invoices to append.");
    }
  } catch (error) {
    Logger.log("Invoices Error: " + error.message);
  }
}