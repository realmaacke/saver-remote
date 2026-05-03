import {
	TwoSplitContainer,
} from "./components/containers/Containers"
import { Repository } from "./components/repository/Repository";

import "./components/base.css";

import "normalize.css";

function App() {
	return (
		<>
			<TwoSplitContainer>
				<main className="main">
					<Repository />
				</main>
				<aside className="aside">
					<h1>Aside</h1>
				</aside>
			</TwoSplitContainer>
		</>
	)
}

export default App
