import { useContext, useEffect, useState } from "react";
import {
	Link,
	Route,
	Switch,
	useLocation,
	useParams,
	useRouteMatch,
} from "react-router-dom";
import styled, {
	ThemeConsumer,
	ThemeContext,
	useTheme,
} from "styled-components";
import Chart from "./Chart.tsx";
import Price from "./Price.tsx";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinIfo, fetchCoinTickers } from "../api.ts";
import { Helmet } from "react-helmet";
import { DefaultTheme } from "styled-components/dist/types";

const Container = styled.div`
	padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
`;

const Header = styled.header`
	height: 10vh;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0px;
	margin-bottom: 10px;
`;

const HomeButton = styled.span`
	display: flex;
	text-align: center;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.cardColor};
	color: ${(props) => props.theme.cardTextColor};
	border-radius: 10px;

	a {
		display: block;
		padding: 15px;
	}
`;

const ToggleThemeButton = styled.span`
	display: block;
	text-align: center;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.cardColor};
	color: ${(props) => props.theme.cardTextColor};
	border-radius: 10px;
	padding: 15px;
	cursor: pointer;
`;

const Title = styled.h1`
	color: ${(props) => props.theme.accentColor};
	font-size: 36px;
`;

const Loader = styled.span`
	text-align: center;
	display: block;
`;

const Overview = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: ${(props) => props.theme.cardColor};
	color: ${(props) => props.theme.cardTextColor};
	padding: 10px 20px;
	border-radius: 10px;
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

const Description = styled.p`
	margin: 20px 0px;
	line-height: 1.6;
`;

const Tabs = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin: 25px 0px;
	gap: 10px;
`;

const Tab = styled.span<{ $isActive: boolean }>`
	text-align: center;
	text-transform: uppercase;
	font-size: 16px;
	background-color: ${(props) => props.theme.cardColor};
	border-radius: 10px;
	color: ${(props) =>
		props.$isActive ? props.theme.accentColor : props.theme.cardTextColor};

	a {
		display: block;
		padding: 10px;
	}
`;

interface RouteParams {
	coinId: string;
}

interface RouteState {
	name: string;
	symbol: string;
}

interface InfoData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
	logo: string;
	description: string;
	message: string;
	open_source: boolean;
	started_at: string;
	development_status: string;
	hardware_wallet: boolean;
	proof_type: string;
	org_structure: string;
	hash_algorithm: string;
	first_data_at: string;
	last_data_at: string;
}

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
			percent_change_1h: number;
			percent_change_1y: number;
			percent_change_6h: number;
			percent_change_7d: number;
			percent_change_12h: number;
			percent_change_15m: number;
			percent_change_24h: number;
			percent_change_30d: number;
			percent_change_30m: number;
			percent_from_price_ath: number;
			price: number;
			volume_24h: number;
			volume_24h_change_24h: number;
		};
	};
}

interface ToggleThemeProps {
	toggleTheme: () => void;
}

function Coin({ toggleTheme }: ToggleThemeProps) {
	const { coinId } = useParams<RouteParams>();
	const { state } = useLocation<RouteState>();
	const chartMatch = useRouteMatch("/:coinId/chart");
	const priceMatch = useRouteMatch("/:coinId/price");

	const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>({
		queryKey: ["info", [coinId]],
		queryFn: () => fetchCoinIfo(coinId),
	});

	const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>({
		queryKey: ["tickers", coinId],
		queryFn: () => fetchCoinTickers(coinId),
		refetchInterval: 5 * 60 * 1000,
	});

	const loading = infoLoading || tickersLoading;

	const theme = useTheme();

	return (
		<Container>
			<Helmet>
				<title>
					{state?.name ? state.name : loading ? "Loading..." : infoData?.name}
				</title>
			</Helmet>
			<Header>
				<HomeButton>
					<Link to="/">🏠</Link>
				</HomeButton>
				<Title>
					{state?.name ? state.name : loading ? "Loading..." : infoData?.name}
				</Title>
				<ToggleThemeButton onClick={toggleTheme}>
					{theme.name === "dark" ? "\u{26aa}" : "\u{26ab}"}
				</ToggleThemeButton>
			</Header>
			{loading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<Overview>
						<OverviewItem>
							<span>Rank:</span>
							<span>{infoData?.rank}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Symbol:</span>
							<span>{infoData?.symbol}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Price:</span>
							<span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
						</OverviewItem>
					</Overview>
					<Description>{infoData?.description}</Description>
					<Overview>
						<OverviewItem>
							<span>Total Suply:</span>
							<span>{tickersData?.total_supply}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Max Suply:</span>
							<span>{tickersData?.max_supply}</span>
						</OverviewItem>
					</Overview>

					<Tabs>
						<Tab $isActive={chartMatch !== null}>
							<Link to={`/${coinId}/chart`}>Chart</Link>
						</Tab>
						<Tab $isActive={priceMatch !== null}>
							<Link to={{ pathname: `/${coinId}/price`, state: tickersData }}>
								Price
							</Link>
						</Tab>
					</Tabs>

					<Switch>
						<Route path={`/:coinId/price`}>
							<Price />
						</Route>
						<Route path={`/:coinId/chart`}>
							<Chart coinId={coinId} />
						</Route>
					</Switch>
				</>
			)}
		</Container>
	);
}

export default Coin;
