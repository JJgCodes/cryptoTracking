import Table from 'react-bootstrap/Table'
import { useSelector } from 'react-redux'
import { Transaction } from '../config/config'
import { RootState } from '../store/store'

const TransactionsTable = () => {
	const data = useSelector((state: RootState) => state.allData.data)
	const transaction: Transaction[] = data.length ? data[0]['transactions'] : []

	return (
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
				{transaction.length ? (
					transaction.map((transaction, i) => (
						<tr key={transaction._id || i}>
							<td>{transaction.symbol}</td>
							<td>{transaction.name}</td>
							<td>{transaction.quantity}</td>
							<td>{transaction.paid}</td>
							<td>{transaction.date}</td>
						</tr>
					))
				) : (
					<tr>
						<td colSpan={5}>Loading.....</td>
					</tr>
				)}
			</tbody>
		</Table>
	)
}
export default TransactionsTable
