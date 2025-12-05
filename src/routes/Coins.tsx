import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { fetchCoins } from "../api.ts";
import { Helmet } from "react-helmet";

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

const CoinsList = styled.ul``;

const Coin = styled.li`
	background-color: ${(props) => props.theme.cardColor};
	color: ${(props) => props.theme.cardTextColor};
	margin-bottom: 10px;
	border-radius: 15px;
	a {
		display: flex;
		align-items: center;
		padding: 20px;
		transition: color 0.2s ease-in;
	}
	&:hover {
		color: ${(props) => props.theme.accentColor};
	}
`;

const Title = styled.h1`
	color: ${(props) => props.theme.accentColor};
	font-size: 36px;
`;

const Loader = styled.span`
	text-align: center;
	display: block;
`;

const Img = styled.img`
	width: 35px;
	height: 35px;
	margin-right: 10px;
`;

interface ICoin {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

interface ToggleThemeProps {
	toggleTheme: () => void;
}

function Coins({ toggleTheme }: ToggleThemeProps) {
	const { isLoading, data } = useQuery<ICoin[]>({
		queryKey: ["allCoins"],
		queryFn: fetchCoins,
	});

	const theme = useTheme();

	return (
		<Container>
			<Helmet>
				<title>Top 100 Crypto</title>
			</Helmet>
			<Header>
				<HomeButton>
					<Link to="/">🏠</Link>
				</HomeButton>
				<Title>Top 100 Crypto</Title>
				<ToggleThemeButton onClick={toggleTheme}>
					{theme.name === "dark" ? "\u{26aa}" : "\u{26ab}"}
				</ToggleThemeButton>
			</Header>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<CoinsList>
					{data?.slice(0, 100).map((coin) => (
						<Coin key={coin.id}>
							<Link
								to={{
									pathname: `/${coin.id}/chart`,
									state: { name: coin.name },
								}}
							>
								<Img
									src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
								/>
								{coin.name} &nbsp; &rarr;
							</Link>
						</Coin>
					))}
				</CoinsList>
			)}
		</Container>
	);
}

export default Coins;
