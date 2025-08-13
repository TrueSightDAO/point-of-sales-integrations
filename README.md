# TrueSightDAO Point of Sale Integrations

## Overview

The `TrueSightDAO/point-of-sales-integrations` repository provides a collection of Google Apps Script adapters designed to integrate with various Point of Sale (POS) systems. These adapters enable merchants to seamlessly connect their POS systems to the TrueSightDAO ecosystem, supporting the **SunMint initiative**, which contributes to reforestation, soil regeneration, and carbon sequestration in the Amazon rainforest.

Each adapter facilitates the integration of a merchant’s POS system with a new **DApp module** (under development) that allows merchants to scan product UPC codes to register sales events. When a sale is recorded, it creates a transaction in both the merchant’s POS system and the TrueSightDAO registry, automatically contributing **$5 per sales event** to fund tree planting in the Amazon rainforest.

## Features

- **Google Apps Script Adapters**: Lightweight, serverless scripts to connect various POS systems to the TrueSightDAO ecosystem.
- **UPC Code Scanning**: Upcoming DApp module to scan product UPC codes and register sales events.
- **SunMint Integration**: Each registered sale triggers a $5 contribution to the SunMint initiative for Amazon rainforest tree planting.
- **Automated Record-Keeping**: Sales events are recorded in both the merchant’s POS system and the TrueSightDAO registry for transparency and accountability.
- **Open-Source**: Built with open-source principles to foster collaboration and trust.

## Supported POS Systems

The repository currently includes adapters for the following POS systems (additional adapters will be added as development progresses):

- **[HelloCash](https://myhellocash.com/)**: Fetches articles and invoices from the HelloCash API and syncs them to a Google Spreadsheet.
- *More adapters coming soon* (e.g., Square, Shopify, Clover, etc.).

## Getting Started

### Prerequisites
- A Google account with access to Google Apps Script and Google Sheets.
- A merchant account with a supported POS system (e.g., HelloCash in DEMO, PREMIUM, or GASTRO mode).
- A valid API token for the POS system (e.g., generated via `Cash Register > Settings > General > helloCash API` for HelloCash).
- Access to the upcoming TrueSightDAO DApp module for UPC code scanning (details to be provided upon release).

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/TrueSightDAO/point-of-sales-integrations.git
   ```
2. **Set Up Google Apps Script**:
   - Open Google Sheets and navigate to `Extensions > Apps Script`.
   - Copy the relevant adapter script (e.g., `HelloCashAPI.gs`) from the repository into the Apps Script editor.
   - Configure the script with your POS system’s API token and spreadsheet ID (see script comments for details).
3. **Deploy the Script**:
   - Save and run the script to sync POS data (e.g., articles or invoices) to a designated Google Sheet.
4. **Integrate with DApp Module** (Coming Soon):
   - Once available, install the TrueSightDAO DApp module to enable UPC code scanning.
   - Configure the DApp to connect to your POS system via the provided adapter.
5. **Register Sales Events**:
   - Scan product UPC codes using the DApp module to record sales.
   - Each sale automatically creates a record in your POS system and the TrueSightDAO registry, triggering a $5 contribution to the SunMint initiative.

### Example: HelloCash Adapter
The `HelloCashAPI.gs` script integrates with the HelloCash POS system to:
- Fetch articles and write them to an "Articles" sheet.
- Fetch invoices and write them to an "Invoices" sheet.
- Support SunMint contributions by logging sales events for future integration with the DApp module.

To use:
1. Set up a Google Sheet with "Articles" and "Invoices" tabs.
2. Add your HelloCash API token to the `getApiKey` function.
3. Run `fetchHelloCashArticles` or `fetchHelloCashInvoices` to sync data.

## SunMint Initiative

The SunMint initiative, part of TrueSightDAO’s mission, promotes environmental justice by funding reforestation in the Amazon rainforest. For every sales event registered through the DApp module:
- A $5 contribution is allocated to tree planting, soil regeneration, and carbon sequestration.
- Contributions are tracked transparently in the TrueSightDAO registry, ensuring accountability.

Merchants supporting SunMint not only streamline their POS operations but also contribute to a healthier planet for future generations. Learn more at [TrueSight.me](https://www.truesight.me/).[](https://www.truesight.me/)

## Contributing

We welcome contributions to expand the range of supported POS systems and enhance the adapters. To contribute:
1. Fork the repository.
2. Create a new branch for your adapter or feature (`git checkout -b feature/new-pos-adapter`).
3. Add your Google Apps Script adapter or improvements.
4. Submit a pull request with a clear description of your changes.

Please follow our [Code of Conduct](CODE_OF_CONDUCT.md) and ensure your code adheres to open-source principles.

## License

This project is licensed under the [GPL-3.0 License](LICENSE), aligning with TrueSightDAO’s commitment to open-source transparency.

## Contact

- **Website**: [TrueSight.me](https://www.truesight.me/)
- **Telegram**: Join our [co-creation space](https://t.me/TrueSightDAO) for collaboration.
- **GitHub Issues**: Report bugs or suggest features via [GitHub Issues](https://github.com/TrueSightDAO/point-of-sales-integrations/issues).

## Acknowledgments

This project is part of TrueSightDAO’s mission to drive social and environmental justice through open-source technology and compassionate business practices. Thank you to all contributors and merchants supporting the SunMint initiative.