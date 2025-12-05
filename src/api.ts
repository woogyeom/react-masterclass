const BASE_URL = `https://api.coinpaprika.com/v1`;
const HISTORY_URL = `https://ohlcv-api.nomadcoders.workers.dev/?coinId=`;

export function fetchCoins() {
	return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinIfo(coinId: string) {
	return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
		response.json()
	);
}

export function fetchCoinTickers(coinId: string) {
	return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
		response.json()
	);
}

export function fetchCoinHistory(coinId: string) {
	return fetch(`${HISTORY_URL}${coinId}`).then((response) =>
		response.json().then((data) => {
			if (data.error) {
				throw new Error(data.error);
			}

            return data;
		})
	);
}
