import { useSignal } from '@preact/signals';

const rates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.81,
  INR: 82.74,
};

export default function CurrencyConverter() {
  const amount = useSignal(1);
  const fromCurrency = useSignal('USD');
  const toCurrency = useSignal('EUR');
  const result = useSignal((amount.value * rates[toCurrency.value]) / rates[fromCurrency.value]);

  function convertCurrency() {
    result.value = (amount.value * rates[toCurrency.value]) / rates[fromCurrency.value];
  }

  return (
    <div className="currency-converter p-4 border rounded shadow-md max-w-sm">
      <h2 className="text-xl font-semibold mb-4">Currency Converter</h2>
      <div className="mb-4">
        <label>
          Amount:
          <input
            type="number"
            value={amount.value}
            min="0"
            className="border rounded p-1 w-full"
            onInput={e => (amount.value = Number(e.currentTarget.value) || 0)}
          />
        </label>
      </div>
      <div className="mb-4 flex space-x-2">
        <label className="flex-1">
          From:
          <select
            value={fromCurrency.value}
            className="border rounded p-1 w-full"
            onChange={e => (fromCurrency.value = e.currentTarget.value)}
          >
            {Object.keys(rates).map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </label>
        <label className="flex-1">
          To:
          <select
            value={toCurrency.value}
            className="border rounded p-1 w-full"
            onChange={e => (toCurrency.value = e.currentTarget.value)}
          >
            {Object.keys(rates).map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </label>
      </div>
      <button className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700" onClick={convertCurrency}>
        Convert
      </button>
      <div className="mt-4 font-semibold">
        Result: {result.value.toFixed(2)} {toCurrency.value}
      </div>
    </div>
  );
}
