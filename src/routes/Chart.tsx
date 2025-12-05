import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api.ts";
import ApexChart from "react-apexcharts";
import { useTheme } from "styled-components";

interface IHistorical {
	time_open: number;
	time_close: number;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}

interface ChartProps {
	coinId: string;
}

function Chart({ coinId }: ChartProps) {
	const { isLoading, data } = useQuery<IHistorical[]>({
		queryKey: ["ohcvl", coinId],
		queryFn: () => fetchCoinHistory(coinId),
		refetchInterval: 5 * 60 * 1000,
		retry: 3,
		retryDelay: 1000,
	});
	const theme = useTheme();

	return (
		<div>
			{isLoading ? (
				"Loading..."
			) : (
				
				<ApexChart
					type="candlestick"
					series={[
						{
							name: "price",
							data:
								data?.map((price) => ({
									x: new Date(price.time_close * 1000).toUTCString(),
									y: [price.open, price.high, price.low, price.close],
								})) ?? [],
						},
					]}
					options={{
						theme: {
							mode: "dark",
						},
						chart: {
							height: 300,
							width: 500,
							toolbar: { show: false },
							background: "transparent",
                            zoom: {
                                enabled: false,
                            }
						},
						grid: { show: false },
						xaxis: {
							type: "datetime",
							labels: { show: false },
							axisBorder: { show: true, color: theme.textColor },
							axisTicks: { show: false },
							// tooltip: { enabled: false },
							categories:
								data?.map((price) =>
									new Date(price.time_close * 1000).toUTCString()
								) ?? [],
						},
						yaxis: {
							labels: { show: false },
							axisBorder: { show: true, color: theme.textColor },
						},
						tooltip: {
							y: {
								formatter: (value) => `${value.toFixed(1)} USD`,
							},
						},
						fill: {
							// type: "gradient",
							// gradient: { gradientToColors: ["blue"], stops: [0, 100] },
							// colors: ["red"],
						},
						stroke: {
							curve: "smooth",
							width: 3,
						},
					}}
				/>
			)}
		</div>
	);
}

export default Chart;
