import fetch from "node-fetch";
import debug from "debug";

const log = debug("exchange-rates");

const API_URL = "https://api.freecurrencyapi.com/v1/latest";
const API_KEY = process.env.API_KEY;

const ONE_DAY = 24 * 60 * 60 * 1000;
let cachedRates = null;
let lastFetchTime = null;
// const cachedRates = {
//   AUD: 1.5995201884,
//   BGN: 1.888570317,
//   BRL: 5.7589009996,
//   CAD: 1.433020176,
//   CHF: 0.9052500994,
//   CNY: 7.2506908891,
//   CZK: 24.2120346108,
//   DKK: 7.1904312664,
//   EUR: 0.9638901359,
//   GBP: 0.8015101221,
//   HKD: 7.7843314104,
//   HRK: 6.7852008008,
//   HUF: 392.1155557393,
//   IDR: 16345.021982697,
//   ILS: 3.5673706376,
//   INR: 87.0459564566,
//   ISK: 142.0073242219,
//   JPY: 154.1246083143,
//   KRW: 1449.9136882186,
//   MXN: 20.5071226136,
//   MYR: 4.4432604507,
//   NOK: 11.248601178,
//   NZD: 1.7705302386,
//   PHP: 57.998947994,
//   PLN: 4.0545305738,
//   RON: 4.7967009031,
//   RUB: 100.7149676832,
//   SEK: 10.9772013094,
//   SGD: 1.3523801927,
//   THB: 33.6696538908,
//   TRY: 35.9447469001,
//   USD: 1,
//   ZAR: 18.6698123227,
// };
// const lastFetchTime = new Date();

class ExchangeRates {
  static async getRates(base = "USD") {
    if (base !== "USD") {
      throw new Error("Only 'USD' is supported as a base currency");
    }

    const now = new Date();

    if (cachedRates && lastFetchTime && now - lastFetchTime < ONE_DAY) {
      log("Using cached exchange rates");
      return cachedRates;
    }

    log("Fetching new exchange rates from API");
    const response = await fetch(`${API_URL}?apikey=${API_KEY}`);
    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }

    const data = await response.json();
    log("API response:", data);
    cachedRates = data.data;
    lastFetchTime = now;

    return cachedRates;
  }
}

export default ExchangeRates;
