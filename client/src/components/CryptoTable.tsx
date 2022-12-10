import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllData } from '../apis/getAllData'
import { setData } from '../store/slices/allDataSlice'
import { RootState } from '../store/store'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { Data } from '../config/config'
import { showModal } from '../store/slices/modalSlice'
import CryptoModal from './CryptoModal'

const CryptoTable = () => {
	const data = useSelector((state: RootState) => state.allData.data)
	const modalStatus = useSelector((state: RootState) => state.modal.isModalVisible)
	const dispatch = useDispatch()

	useEffect(() => {
		if (data.length === 0) {
			const fetchDataAndDispatch = async () => {
				const data = await getAllData()
				dispatch(setData(data))
			}
			fetchDataAndDispatch()
		}
	}, [])

	return (
		<div>
			<div className="container mt-5">
				{data.map((obj: Data, i: number) => (
					<Card key={i} className="text-center">
						<Card.Body>
							<h2 className="mb-4">Holdings</h2>
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
							<h2 className="mb-4 mt-5">Transactions</h2>
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
							<Button variant="primary" onClick={() => dispatch(showModal())}>
								Add Transaction
							</Button>
						</Card.Body>
					</Card>
				))}
			</div>
			<CryptoModal />
		</div>
	)
}
export default CryptoTable
