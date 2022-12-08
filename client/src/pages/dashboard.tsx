import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllData } from '../apis/getAllData'
import { setData } from '../store/slices/allDataSlice'
import { RootState } from '../store/store'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

interface Holding {
	symbol: string
	name: string
	quantity: number
	paid: number
	date: string
}

interface Transaction {
	name: string
	quantity: number
	paid: number
	date: string
	symbol: string
}

interface Data {
	holdings: Holding[]
	transactions: Transaction[]
}

const Dashboard: React.FunctionComponent = () => {
	const data = useSelector((state: RootState) => state.allData.data)
	const dispatch = useDispatch()

	const [showModal, setShowModal] = useState(false)
	const [transactionData, setTransactionData] = useState({
		name: '',
		quantity: 0,
		paid: 0,
		date: '',
		symbol: '',
	})

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.currentTarget
		setTransactionData((prevState) => ({ ...prevState, [name]: value }))
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
	}

	useEffect(() => {
		if (data.length === 0) {
			const fetchDataAndDispatch = async () => {
				const data = await getAllData()
				dispatch(setData(data))
			}
			fetchDataAndDispatch()
		}
	}, [dispatch])

	return (
		<div>
			<div className="container mt-5">
				<h1>Dashboard</h1>
				{data.map((obj: Data, i: number) => (
					<Card key={i}>
						<Card.Body>
							<h2>Holdings</h2>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>Symbol</th>
										<th>Name</th>
										<th>Quantity</th>
										<th>Paid</th>
										<th>Last Updated</th>
									</tr>
								</thead>
								<tbody>
									{obj.holdings.map((holding, i) => (
										<tr key={i}>
											<td>{holding.symbol}</td>
											<td>{holding.name}</td>
											<td>{holding.quantity}</td>
											<td>{holding.paid}</td>
											<td>{holding.date}</td>
										</tr>
									))}
								</tbody>
							</Table>
							<h2>Transactions</h2>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>Symbol</th>
										<th>Name</th>
										<th>Quantity</th>
										<th>Paid</th>
										<th>Date</th>
									</tr>
								</thead>
								<tbody>
									{obj.transactions.map((transaction, i) => (
										<tr key={i}>
											<td>{transaction.symbol}</td>
											<td>{transaction.name}</td>
											<td>{transaction.quantity}</td>
											<td>{transaction.paid}</td>
											<td>{transaction.date}</td>
										</tr>
									))}
								</tbody>
							</Table>
							<Button variant="primary" onClick={() => setShowModal(!showModal)}>
								Add Transaction
							</Button>
						</Card.Body>
					</Card>
				))}
			</div>

			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Add Transaction</Modal.Title>
				</Modal.Header>
				<Modal.Body>
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
								value={transactionData.date}
								onChange={handleInputChange}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowModal(false)}>
						Close
					</Button>
					<Button variant="primary" type="submit" form="transactionForm"></Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default Dashboard
