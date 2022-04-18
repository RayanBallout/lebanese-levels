import axios from "axios"
import React, { useEffect, useRef, useState } from "react"

const ViewCazas = () => {
	const [cazas, setCazas] = useState([])
	const [governorateNames, setGovernorateNames] = useState([])

	const [searchTerm, setSearchTerm] = useState("")
	const initial = useRef(false)

	useEffect(() => {
		if (initial.current) {
			initial.current = false
			return
		}

		const timer = setTimeout(() => {
			if (searchTerm) {
				axios
					.get(`http://localhost:5000/caza/nameLike/${searchTerm}`)
					.then((res) => {
						if (res.data.length > 0) {
							setCazas(res.data)
						}
					})
			} else {
				axios.get("http://localhost:5000/caza").then((res) => {
					if (res.data.length > 0) {
						setCazas(res.data)
					}
				})
			}
		})
	}, [searchTerm])

	useEffect(() => {
		axios.get("http://localhost:5000/caza").then((res) => {
			if (res.data.length > 0) {
				setCazas(res.data)
			}
		})

		axios.get("http://localhost:5000/governorate").then((res) => {
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
	}, [])

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
					value={searchTerm}
					onChange={(e) => {
						setSearchTerm(e.target.value)
					}}
					className="form-control"
					placeholder="Search by caza name"
				/>
			</p>
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">ID</th>
						<th scope="col">Name</th>
						<th scope="col">Arabic Name</th>
						<th scope="col">Number Of Towns</th>
						<th scope="col">
							Area (km<sup>2</sup>)
						</th>
						<th scope="col">Governorate</th>
					</tr>
				</thead>
				<tbody>
					{cazas.length > 0 &&
						cazas.map((caza) => {
							return (
								<tr key={caza._id}>
									<th scope="row">{caza._id}</th>
									<td>{caza.name}</td>
									<td>{caza.arabic_name}</td>
									<td>{caza.num_of_towns}</td>
									<td>{caza.area}</td>
									<td>
										{governorateNames[caza.governorate_id]}
									</td>
								</tr>
							)
						})}
				</tbody>
			</table>
		</div>
	)
}

export default ViewCazas
