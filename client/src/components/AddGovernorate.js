import React, { useState } from "react"
import axios from "axios"

const AddGovernorate = () => {
	const [name, setName] = useState("")
	const [arabicName, setArabicName] = useState("")
	const [numberOfCazas, setNumberOfCazas] = useState("")
	const [area, setArea] = useState("")

	const [message, setMessage] = useState(null)

	const handleSubmit = (e) => {
		e.preventDefault()

		const governateObject = {
			name,
			arabic_name: arabicName,
			num_of_cazas: parseInt(numberOfCazas, 10),
			area,
		}

		axios
			.post("http://localhost:5000/governorate/add", governateObject)
			.then((res) => {
				setMessage(res.data)
				setName("")
				setArabicName("")
				setNumberOfCazas("")
				setArea("")
			})
	}

	return (
		<div className="form-container">
			<h4>Add Governate</h4>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="name" className="form-label">
						Name:
					</label>
					<input
						type="text"
						name="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="form-control"
						id="name"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="arabic_name" className="form-label">
						Arabic Name:
					</label>
					<input
						type="text"
						name="arabic_name"
						value={arabicName}
						onChange={(e) => setArabicName(e.target.value)}
						className="form-control"
						id="arabic_name"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="num_cazas" className="form-label">
						Number of Cazas:
					</label>
					<input
						type="number"
						value={numberOfCazas}
						onChange={(e) => setNumberOfCazas(e.target.value)}
						name="num_cazas"
						id="num_cazas"
						className="form-control"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="area" className="form-label">
						Area:
					</label>
					<input
						type="number"
						name="area"
						id="area"
						value={area}
						onChange={(e) => setArea(e.target.value)}
						className="form-control"
						placeholder="Enter in kilometers squared"
						required
					/>
				</div>
				<div className="form-group d-flex justify-content-end">
					<input
						type="submit"
						value="Submit"
						className="btn btn-primary mt-4"
					/>
				</div>
				{message}
			</form>
		</div>
	)
}

export default AddGovernorate
