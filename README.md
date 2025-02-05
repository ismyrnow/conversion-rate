# Conversion Rate

This is a Node.js web service that provides currency conversion rates.

## Project Structure

```
conversion-rate
├── src
│   ├── app.js                   # Entry point of the application
│   └── routes
│       └── rate.js              # Defines the GET /rate endpoint
│   └── services
│       └── ExchangeRates.js     # Service for fetching and caching exchange rates
├── package.json                 # Configuration file for npm
└── README.md                    # Documentation for the project
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd conversion-rate
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Add a .env file
   ```
   cp .sample.env .env
   ```

## Running the Service

### Development

To run the server in development mode with automatic restarts on code changes, use:

```
npm run dev
```

The service will be available at `http://localhost:3000`.

### Production

To run the server in production mode, use:

```
npm start
```

Make sure to set the NODE_ENV environment variable to production when running in production mode.

### Environment Variables

API_KEY: Your API key for the [currency conversion](https://freecurrencyapi.com/) API.
PORT: The port on which the server will run (default is 3000).
DEBUB: (optional) use "exchange-rates" to get additional information on conversion rate API usage.


## Endpoint

### GET /rate

Query Parameters:
- `from`: The currency code to convert from.
- `to`: The currency code to convert to.

Example request:
```
curl -X GET "http://localhost:3000/rate?from=USD&to=EUR"
```

Example response:
```json
{
  "data": {
    "from": "USD",
    "to": "EUR",
    "rate": 0.85
  }
}
```

## License

This project is licensed under the MIT License.