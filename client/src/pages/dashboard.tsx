import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllData } from '../apis/getAllData'
import { setData } from '../store/slices/allDataSlice'
import { RootState } from '../store/store'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

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
				{data.map((obj: Data, index: number) => (
					<Card key={index}>
						<Card.Body>
							<h2>Holdings</h2>
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
							<Button variant="primary">Add Transaction</Button>
						</Card.Body>
					</Card>
				))}
			</div>
		</div>
	)
}

export default Dashboard
