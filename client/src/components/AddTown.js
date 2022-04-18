import axios from "axios"
import React, { useEffect, useState } from "react"

const AddTown = () => {
	const [name, setName] = useState("")
	const [arabicName, setArabicName] = useState("")
	const [area, setArea] = useState("")
	const [altitude, setAltitude] = useState("")
	const [governateId, setGovernateId] = useState("")
	const [cazaId, setCazaId] = useState("")

	const [governorates, setGovernorates] = useState([])
	const [cazas, setCazas] = useState([])

	const [message, setMessage] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()

		const townObject = {
			name,
			arabic_name: arabicName,
			area,
			altitude,
			caza_id: cazaId,
			governorate_id: governateId,
		}

		axios.post("http://localhost:5000/town/add", townObject).then((res) => {
			setMessage(res.data)
			setName("")
			setArabicName("")
			setArea("")
			setAltitude("")
		})
	}

	useEffect(() => {
		axios.get("http://localhost:5000/governorate").then((res) => {
			if (res.data.length > 0) {
				setGovernorates(res.data)
				setGovernateId(res.data[0]._id)
			}
		})
	}, [])

	useEffect(() => {
		if (governateId) {
			setCazas([])
			setCazaId("")
			axios
				.get(`http://localhost:5000/caza/inGovernate/${governateId}`)
				.then((res) => {
					if (res.data.length > 0) {
						setCazas(res.data)
						setCazaId(res.data[0]._id)
					}
				})
		}
	}, [governateId])

	return (
		<div className="form-container pb-4">
			<h4>Add Town</h4>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="name" className="form-label">
						Name:
					</label>
					<input
						type="text"
						name="name"
						id="name"
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="arabic_name" className="form-label">
						Arabic Name:
					</label>
					<input
						type="text"
						name="arabicName"
						id="arabic_name"
						required
						value={arabicName}
						onChange={(e) => setArabicName(e.target.value)}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="area" className="form-label">
						Area:
					</label>
					<input
						type="text"
						name="area"
						id="area"
						value={area}
						onChange={(e) => setArea(e.target.value)}
						placeholder="Enter area in square kilometers"
						className="form-control"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="altitde">Altitude:</label>
					<input
						type="text"
						name="altitude"
						id="altitude"
						value={altitude}
						placeholder="Enter altitude in meters"
						onChange={(e) => setAltitude(e.target.value)}
						required
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="governate_id">Governate:</label>
					<select
						name="governate_id"
						className="form-select"
						id="governate_id"
						required
						onChange={(e) => setGovernateId(e.target.value)}
					>
						{governorates.length > 0 &&
							governorates.map((governonate) => {
								return (
									<option
										key={governonate._id}
										value={governonate._id}
									>
										{governonate.name}
									</option>
								)
							})}
					</select>
				</div>
				{cazas.length > 0 && (
					<div className="form-group">
						<label htmlFor="caza_id">Caza:</label>
						<select
							name="caza_id"
							id="caza_id"
							required
							className="form-select"
							onChange={(e) => setCazaId(e.target.value)}
						>
							{cazas.map((caza) => {
								return (
									<option key={caza._id} value={caza._id}>
										{caza.name}
									</option>
								)
							})}
						</select>
					</div>
				)}

				<div className="form-group d-flex justify-content-end mt-4">
					<input
						type="submit"
						value="Submit"
						className="btn btn-primary"
					/>
				</div>
			</form>
			{message}
		</div>
	)
}

export default AddTown
