import express from "express";
import ExchangeRates from "../services/ExchangeRates.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const from = req.query.from;
  const to = req.query.to;

  // Validate that either 'from' or 'to' is 'USD'
  if (from !== "USD" && to !== "USD") {
    return res
      .status(400)
      .json({ error: "Either 'from' or 'to' must be 'USD'" });
  }

  const rates = await ExchangeRates.getRates("USD");

  // Check if the rates for 'from' and 'to' currencies are available
  if (!rates[from]) {
    return res
      .status(400)
      .json({ error: `Exchange rate for '${from}' not found` });
  }

  if (!rates[to]) {
    return res
      .status(400)
      .json({ error: `Exchange rate for '${to}' not found` });
  }

  // Calculate the conversion rate
  const fromRate = rates[from];
  const toRate = rates[to];
  let rate = toRate / fromRate;

  // Round the conversion rate to two decimal places
  rate = parseFloat(rate.toFixed(2));

  const response = { data: { from, to, rate } };
  res.json(response);
});

export default router;
