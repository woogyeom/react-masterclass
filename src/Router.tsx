import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coins from "./routes/Coins.tsx";
import Coin from "./routes/Coin.tsx";

interface ToggleThemeProps {
	toggleTheme: () => void;
}

function Router({ toggleTheme }: ToggleThemeProps) {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<Switch>
				<Route path="/:coinId">
					<Coin toggleTheme={toggleTheme} />
				</Route>
				<Route path="/">
					<Coins toggleTheme={toggleTheme} />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default Router;
