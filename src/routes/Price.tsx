import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinTickers } from "../api.ts";

const Overview = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: ${(props) => props.theme.cardColor};
	color: ${(props) => props.theme.cardTextColor};
	padding: 10px 20px;
	border-radius: 10px;
	margin-bottom: 20px;
`;

const OverviewItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	span:first-child {
		font-size: 10px;
		font-weight: 400;
		text-transform: uppercase;
		margin-bottom: 5px;
	}
`;

const PercentChange = styled.span<PercentProps>`
	color: ${(props) =>
		props.$value > 0 ? "green" : props.$value < 0 ? "red" : "gray"};
`;

interface PriceData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	total_supply: number;
	max_supply: number;
	beta_value: number;
	first_data_at: string;
	last_updated: string;
	quotes: {
		USD: {
			ath_date: string;
			ath_price: number;
			market_cap: number;
			market_cap_change_24h: number;
			percent_change_15m: number;
			percent_change_30m: number;
			percent_change_1h: number;
			percent_change_6h: number;
			percent_change_12h: number;
			percent_change_24h: number;
			percent_change_7d: number;
			percent_change_30d: number;
			percent_change_1y: number;
			percent_from_price_ath: number;
			price: number;
			volume_24h: number;
			volume_24h_change_24h: number;
		};
	};
}

interface PercentProps {
	$value: number;
}

interface PriceState {
	tickersData: PriceData;
}

interface RouteParams {
	coinId: string;
}

function Price() {
	const { coinId } = useParams<RouteParams>();
	const { state } = useLocation<PriceState>();
	const shouldFetch = state === undefined;

	const { isLoading, data } = useQuery<PriceData>({
		queryKey: ["tickers", coinId],
		queryFn: () => fetchCoinTickers(coinId),
		refetchInterval: 5 * 60 * 1000,
		enabled: shouldFetch,
	});

	const priceData = state?.tickersData || data;

	return isLoading ? (
		<h1>Loading...</h1>
	) : (
		<>
			<Overview>
				<OverviewItem>
					<span>percent_change_15m:</span>
					<PercentChange $value={priceData?.quotes.USD.percent_change_15m}>
						{priceData?.quotes.USD.percent_change_15m}%
					</PercentChange>
				</OverviewItem>
				<OverviewItem>
					<span>percent_change_30m:</span>
					<PercentChange $value={priceData?.quotes.USD.percent_change_30m}>
						{priceData?.quotes.USD.percent_change_30m}%
					</PercentChange>
				</OverviewItem>
				<OverviewItem>
					<span>percent_change_1h:</span>
					<PercentChange $value={priceData?.quotes.USD.percent_change_1h}>
						{priceData?.quotes.USD.percent_change_1h}%
					</PercentChange>
				</OverviewItem>
			</Overview>
			<Overview>
				<OverviewItem>
					<span>percent_change_6h:</span>
					<PercentChange $value={priceData?.quotes.USD.percent_change_6h}>
						{priceData?.quotes.USD.percent_change_6h}%
					</PercentChange>
				</OverviewItem>
				<OverviewItem>
					<span>percent_change_12h:</span>
					<PercentChange $value={priceData?.quotes.USD.percent_change_12h}>
						{priceData?.quotes.USD.percent_change_12h}%
					</PercentChange>
				</OverviewItem>
				<OverviewItem>
					<span>percent_change_24h:</span>
					<PercentChange $value={priceData?.quotes.USD.percent_change_24h}>
						{priceData?.quotes.USD.percent_change_24h}%
					</PercentChange>
				</OverviewItem>
			</Overview>
			<Overview>
				<OverviewItem>
					<span>percent_change_7d:</span>
					<PercentChange $value={priceData?.quotes.USD.percent_change_7d}>
						{priceData?.quotes.USD.percent_change_7d}%
					</PercentChange>
				</OverviewItem>
				<OverviewItem>
					<span>percent_change_30d:</span>
					<PercentChange $value={priceData?.quotes.USD.percent_change_30d}>
						{priceData?.quotes.USD.percent_change_30d}%
					</PercentChange>
				</OverviewItem>
				<OverviewItem>
					<span>percent_change_1y:</span>
					<PercentChange $value={priceData?.quotes.USD.percent_change_1y}>
						{priceData?.quotes.USD.percent_change_1y}%
					</PercentChange>
				</OverviewItem>
			</Overview>
		</>
	);
}

export default Price;
