interface field {
  name: string;
  key: string;
}

export const HomePageFields: field[] = [
  { key: "rank", name: "Rank" },
  { key: "name", name: "Name" },
  { key: "price", name: "Price" },
  { key: "change", name: "Change" },
  { key: "marketCap", name: "Market Cap." },
  { key: "btcPrice", name: "BTC Price" },
];

export const coinPageFields: field[] = [
  { key: "rank", name: "Rank" },
  { key: "source", name: "Source" },
  { key: "pairs", name: "Pairs" },
  { key: "price", name: "Price" },
  { key: "24hVolume", name: "Volume" },
  { key: "marketShare", name: "Volume %" },
  { key: "btcPrice", name: "BTC Price" },
];

export const cardsData = [
  { key: "total", name: "Total", isCurrency: false },
  { key: "total24hVolume", name: "Total Volume (24h)", isCurrency: true },
  { key: "totalExchanges", name: "Total Exchanges", isCurrency: false },
  { key: "totalMarketCap", name: "Total Market Cap", isCurrency: true },
  { key: "totalMarkets", name: "Total Markets", isCurrency: false },
];

export const CACHE_TIME = 1000 * 24 * 60 * 60;
