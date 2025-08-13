function fetchHelloCashArticles() {
  // Define API endpoint and authentication token
  var apiUrl = "https://api.hellocash.business/api/v1/articles?limit=250&offset=1&caid=&name=&code=";
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
      
      // Get the spreadsheet and sheet
      var spreadsheetId = "1YFuNAX3ZnUA5RaNezeiERHUxkTg0MnoHWA1zmbyFXvE";
      var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
      var sheet = spreadsheet.getSheetByName("Articles");
      
      if (!sheet) {
        throw new Error("Sheet 'Articles' not found in the spreadsheet.");
      }
      
      // Clear existing content (except headers)
      sheet.getRange("A2:Z").clearContent();
      
      // Check if there are articles
      if (json.articles && json.articles.length > 0) {
        // Prepare headers based on API response fields
        var headers = [
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
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
        
        // Prepare data array
        var data = json.articles.map(function(article) {
          return [
            article.article_id || "",
            article.article_name || "",
            article.article_code || "",
            article.article_eanCode || "",
            article.article_taxRate || "",
            article.article_net_sellingPrice || 0,
            article.article_gross_sellingPrice || 0,
            article.article_stock || 0,
            article.article_category_id || "",
            article.article_comment || ""
          ];
        });
        
        // Write data to sheet
        sheet.getRange(2, 1, data.length, headers.length).setValues(data);
        
        Logger.log("Successfully wrote " + data.length + " articles to the sheet.");
      } else {
        Logger.log("No articles found in the API response.");
      }
    } else {
      throw new Error("Articles API request failed with status code: " + responseCode + " - " + responseText);
    }
  } catch (error) {
    Logger.log("Articles Error: " + error.message);
  }
}

function fetchHelloCashInvoices() {
  // Define API endpoint and authentication token
  var apiUrl = "https://api.hellocash.business/api/v1/invoices?limit=250&offset=1";
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
      
      // Get the spreadsheet and sheet
      var spreadsheetId = "1YFuNAX3ZnUA5RaNezeiERHUxkTg0MnoHWA1zmbyFXvE";
      var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
      var sheet = spreadsheet.getSheetByName("Invoices");
      
      if (!sheet) {
        throw new Error("Sheet 'Invoices' not found in the spreadsheet.");
      }
      
      // Clear existing content (except headers)
      sheet.getRange("A2:Z").clearContent();
      
      // Check if there are invoices
      if (json.invoices && json.invoices.length > 0) {
        // Prepare headers based on assumed invoice fields
        var headers = [
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
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
        
        // Prepare data array
        var data = json.invoices.map(function(invoice) {
          return [
            invoice.invoice_id || "",
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
          ];
        });
        
        // Write data to sheet
        sheet.getRange(2, 1, data.length, headers.length).setValues(data);
        
        Logger.log("Successfully wrote " + data.length + " invoices to the sheet.");
      } else {
        Logger.log("No invoices found in the API response.");
      }
    } else {
      throw new Error("Invoices API request failed with status code: " + responseCode + " - " + responseText);
    }
  } catch (error) {
    Logger.log("Invoices Error: " + error.message);
  }
}