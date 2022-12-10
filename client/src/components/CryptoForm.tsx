import Form from 'react-bootstrap/Form'
import { useState } from 'react'

const CryptoForm = () => {
	const date = new Date()
	const month = ('0' + (date.getMonth() + 1)).slice(-2)
	const day = ('0' + date.getDate()).slice(-2)
	const year = date.getFullYear()

	const today = `${year}-${month}-${day}`
	const minimumDate = `${year - 10}-${month}-${day}`

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
				<Form.Label>Symbol</Form.Label>
				<Form.Control
					type="text"
					name="symbol"
					value={transactionData.symbol}
					onChange={handleInputChange}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Name</Form.Label>
				<Form.Control
					type="text"
					name="name"
					value={transactionData.name}
					onChange={handleInputChange}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Quantity</Form.Label>
				<Form.Control
					type="number"
					name="quantity"
					value={transactionData.quantity}
					onChange={handleInputChange}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Paid</Form.Label>
				<Form.Control
					type="number"
					name="paid"
					value={transactionData.paid}
					onChange={handleInputChange}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Date</Form.Label>
				<Form.Control
					type="date"
					name="date"
					min={minimumDate}
					max={today}
					value={transactionData.date}
					onChange={handleInputChange}
				/>
			</Form.Group>
		</Form>
	)
}
export default CryptoForm
