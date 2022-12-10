import Form from 'react-bootstrap/Form'
import { useState } from 'react'

const CryptoForm = () => {

	const date = new Date()
	const today = date.toISOString().slice(0, 10)	
	const priorDate = new Date(date.setFullYear(date.getFullYear() - 10))
	const minimumDate = priorDate.toISOString().slice(0, 10)

	const [transactionData, setTransactionData] = useState({
		name: '',
		quantity: 0,
		paid: 0,
		date: today,
		symbol: '',
	})

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.currentTarget
		setTransactionData((prevState) => ({ ...prevState, [name]: value }))
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group>
				<Form.Label>Name</Form.Label>
				<Form.Control
					type="text"
					name="name"
					value={transactionData.name}
					onChange={handleInputChange}
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Quantity</Form.Label>
				<Form.Control
					type="number"
					name="quantity"
					max={100_000}
					min={0.0}
					value={transactionData.quantity}
					onChange={handleInputChange}
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Paid</Form.Label>
				<Form.Control
					type="number"
					name="paid"
					max={10_000}
					min={0.0}
					value={transactionData.paid}
					onChange={handleInputChange}
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Date</Form.Label>
				<Form.Control
					type="date"
					name="date"
					max={today}
					min={minimumDate}
					value={transactionData.date}
					onChange={handleInputChange}
					required
				/>
			</Form.Group>
		</Form>
	)
}
export default CryptoForm
