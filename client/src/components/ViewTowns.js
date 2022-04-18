import axios from "axios"
import React, { useEffect, useRef, useState } from "react"

const ViewTowns = () => {
	const [towns, setTowns] = useState([])
	const [cazasNames, setCazasNames] = useState([])
	const [governorateNames, setGovernorateNames] = useState([])

	const [searchTerm, setSearchTerm] = useState("")

	useEffect(() => {
		axios.get("https://lebanese-levels.herokuapp.com/town").then((res) => {
			if (res.data.length > 0) {
				setTowns(res.data)
			}
		})

		axios
			.get("https://lebanese-levels.herokuapp.com/governorate")
			.then((res) => {
				if (res.data.length > 0) {
					var assoscNames = []
					const mapping = res.data.map((governorate) => {
						return (assoscNames[governorate._id] = governorate.name)
					})

					return Promise.all(mapping).then(() => {
						setGovernorateNames(assoscNames)
					})
				}
			})

		axios.get("https://lebanese-levels.herokuapp.com/caza").then((res) => {
			if (res.data.length > 0) {
				var assoscNames = []
				const mapping = res.data.map((caza) => {
					return (assoscNames[caza._id] = caza.name)
				})

				return Promise.all(mapping).then(() => {
					setCazasNames(assoscNames)
				})
			}
		})
	}, [])

	const initial = useRef(false)

	useEffect(() => {
		if (initial.current) {
			initial.current = false
			return
		}

		const timer = setTimeout(() => {
			if (searchTerm) {
				axios
					.get(
						`https://lebanese-levels.herokuapp.com/town/nameLike/${searchTerm}`
					)
					.then((res) => {
						if (res.data.length > 0) {
							setTowns(res.data)
						}
					})
			} else {
				axios
					.get("https://lebanese-levels.herokuapp.com/town")
					.then((res) => {
						if (res.data.length > 0) {
							setTowns(res.data)
						}
					})
			}
		})

		return () => clearTimeout(timer)
	}, [searchTerm])

	return (
		<div className="table-container">
			<p>
				<label htmlFor="search">
					<strong>Search:</strong>
				</label>
				<input
					type="search"
					name="search"
					id="search"
					className="form-control"
					value={searchTerm}
					onChange={(e) => {
						setSearchTerm(e.target.value)
					}}
					placeholder="Search by town or city name"
				/>
			</p>
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">ID</th>
						<th scope="col">Name</th>
						<th scope="col">Arabic Name</th>
						<th scope="col">
							Area (km<sup>2</sup>)
						</th>
						<th scope="col">Altitude (m)</th>
						<th scope="col">Caza</th>
						<th scope="col">Governorate</th>
					</tr>
				</thead>
				<tbody>
					{towns &&
						towns.map((town) => {
							return (
								<tr key={town._id}>
									<th scope="row">{town._id}</th>
									<td>{town.name}</td>
									<td>{town.arabic_name}</td>
									<td>{town.area}</td>
									<td>{town.altitude}</td>
									<td>{cazasNames[town.caza_id]}</td>
									<td>
										{governorateNames[town.governorate_id]}
									</td>
								</tr>
							)
						})}
				</tbody>
			</table>
		</div>
	)
}

export default ViewTowns
