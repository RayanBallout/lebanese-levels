import React, { useEffect, useState } from "react"
import axios from "axios"

const AddCaza = () => {
	const [governorates, setGovernorates] = useState([])

	const [name, setName] = useState("")
	const [arabicName, setArabicName] = useState("")
	const [towns, setTowns] = useState("")
	const [area, setArea] = useState("")
	const [governateId, setGovernateId] = useState("")

	const [message, setMessage] = useState("")

	useEffect(() => {
		axios.get("http://localhost:5000/governorate").then((res) => {
			if (res.data.length > 0) {
				setGovernorates(res.data)
				setGovernateId(res.data[0]._id)
			}
		})
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()

		const cazaObject = {
			name,
			arabic_name: arabicName,
			num_of_towns: towns,
			area,
			governorate_id: governateId,
		}

		axios.post("http://localhost:5000/caza/add", cazaObject).then((res) => {
			setMessage(res.data)
			setName("")
			setArabicName("")
			setTowns("")
			setArea("")
		})
	}

	return (
		<div className="form-container">
			<h4>Add Caza</h4>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="name" className="form-label">
						Name:
					</label>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						type="text"
						name="name"
						id="name"
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="arabic_name" className="form-label">
						Arabic Name:
					</label>
					<input
						value={arabicName}
						onChange={(e) => setArabicName(e.target.value)}
						type="text"
						className="form-control"
						required
						name="arabicName"
						id="arabic_name"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="num_town" className="form-label">
						Number of Towns:
					</label>
					<input
						value={towns}
						onChange={(e) => setTowns(e.target.value)}
						type="number"
						name="num_towns"
						id="num_town"
						className="form-control"
						required
					/>
				</div>
				<div className="form-group">
					<label className="form-label" htmlFor="area">
						Area:
					</label>
					<input
						value={area}
						onChange={(e) => setArea(e.target.value)}
						type="number"
						name="num"
						id="area"
						className="form-control"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="governate_id" className="form-label">
						Governate:
					</label>
					<select
						onChange={(e) => setGovernateId(e.target.value)}
						name="governorateId"
						className="form-select"
						id="goverbate_id"
						required
					>
						{governorates.map((governorate) => {
							return (
								<option
									value={governorate._id}
									key={governorate._id}
								>
									{governorate.name}
								</option>
							)
						})}
					</select>
				</div>
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

export default AddCaza
