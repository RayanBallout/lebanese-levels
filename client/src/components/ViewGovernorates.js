import React, { useEffect, useState, useRef } from "react"
import axios from "axios"

const ViewGovernorates = () => {
	const [governorates, setGovernorates] = useState([])

	const [searchTerm, setSearchTerm] = useState("")

	const initial = useRef(true)

	useEffect(() => {
		if (initial.current) {
			initial.current = false
			return
		}

		const timer = setTimeout(() => {
			if (searchTerm) {
				axios
					.get(
						`http://localhost:5000/governorate/nameLike/${searchTerm}`
					)
					.then((res) => {
						if (res.data.length > 0) {
							setGovernorates(res.data)
						}
					})
			} else {
				axios.get("http://localhost:5000/governorate").then((res) => {
					if (res.data.length > 0) {
						setGovernorates(res.data)
					}
				})
			}
		}, 500)

		return () => clearTimeout(timer)
	}, [searchTerm])

	useEffect(() => {
		axios.get("http://localhost:5000/governorate").then((res) => {
			if (res.data.length > 0) {
				setGovernorates(res.data)
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
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					id="search"
					className="form-control"
					placeholder="Search by governorate name"
				/>
			</p>
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">ID</th>
						<th scope="col">Name</th>
						<th scope="col">Arabic Name</th>
						<th scope="col">Number Of Cazas</th>
						<th scope="col">
							Area (km<sup>2</sup>)
						</th>
					</tr>
				</thead>
				<tbody>
					{governorates &&
						governorates.map((governorate) => {
							return (
								<tr key={governorate._id}>
									<th scope="row">{governorate._id}</th>
									<td>{governorate.name}</td>
									<td>{governorate.arabic_name}</td>
									<td>{governorate.num_of_cazas}</td>
									<td>{governorate.area}</td>
								</tr>
							)
						})}
				</tbody>
			</table>
		</div>
	)
}

export default ViewGovernorates
