# Conversion Rate

[![Docker Pulls](https://img.shields.io/docker/pulls/ismyrnow/conversion-rate.svg)](https://hub.docker.com/r/ismyrnow/conversion-rate/)

This is a Node.js web service that provides currency conversion rates to or from USD.

The service is currently available free to use on http://currency.ish.lol

```
curl -X GET "http://currency.ish.lol/rate?from=USD&to=EUR"
```

## Endpoint

### GET /rate

Returns the conversation rate between two currencies.

A few important things to note:

- Only supports converting to or from USD (for now).
- Exchange rates are updated only once per day.

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

## Project Structure

```
conversion-rate
├── public                       # Static hosted files
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
npm start
```

The service will be available at `http://localhost:3000`.

### Production

To run the server in production mode, use:

```
NODE_ENV=production node src/app.js
```

## With Docker

```
docker pull ismyrnow/conversion-rate:latest
docker run -p 3000:3000 -e API_KEY=your-api-key ismyrnow/conversion-rate:latest
```

### Environment Variables

- API_KEY: Your API key for the [currency conversion](https://freecurrencyapi.com/) API.
- PORT: The port on which the server will run (default is 3000).
- DEBUG: (optional) use "exchange-rates" to get additional information on conversion rate API usage.

## License

This project is licensed under the MIT License.