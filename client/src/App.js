import React, { useState } from "react"
import AddCaza from "./components/AddCaza"
import AddGovernorate from "./components/AddGovernorate"
import AddTown from "./components/AddTown"
import "bootstrap/dist/css/bootstrap.css"
import "./App.css"
import ViewGovernorates from "./components/ViewGovernorates"
import ViewCazas from "./components/ViewCazas"
import ViewTowns from "./components/ViewTowns"

function App() {
	const [activeTab, setActiveTab] = useState("governorate")
	return (
		<div className="App">
			<div className="container">
				<div className="text-center mt-5">
					<h1>Lebanese Levels</h1>
					<nav className="navigation">
						<button
							className="tab-activation"
							onClick={() => setActiveTab("governorate")}
						>
							Add Governorate
						</button>
						<button
							className="tab-activation"
							onClick={() => setActiveTab("caza")}
						>
							Add Caza
						</button>
						<button
							className="tab-activation"
							onClick={() => setActiveTab("town")}
						>
							Add Town
						</button>
					</nav>
					<nav className="navigation">
						<button
							className="tab-activation"
							onClick={() => setActiveTab("view-governorates")}
						>
							View Governorates
						</button>
						<button
							className="tab-activation"
							onClick={() => setActiveTab("view-cazas")}
						>
							View Cazas
						</button>
						<button
							className="tab-activation"
							onClick={() => setActiveTab("view-towns")}
						>
							View Towns
						</button>
					</nav>
				</div>
				<div className="mt-5">
					{activeTab === "governorate" && <AddGovernorate />}
					{activeTab === "caza" && <AddCaza />}
					{activeTab === "town" && <AddTown />}
					{activeTab === "view-governorates" && <ViewGovernorates />}
					{activeTab === "view-cazas" && <ViewCazas />}
					{activeTab === "view-towns" && <ViewTowns />}
				</div>
			</div>
		</div>
	)
}

export default App
