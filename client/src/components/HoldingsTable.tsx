import Table from 'react-bootstrap/Table'
import { useSelector } from 'react-redux'
import { Holding } from '../config/config'
import { RootState } from '../store/store'

const HoldingsTable = () => {
	const data = useSelector((state: RootState) => state.allData.data)
	const holding: Holding[] = data.length ? data[0]['holdings'] : []

	return (
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
				{data.length && holding.length ? (
					holding.map((holding, i) => (
						<tr key={holding._id || i}>
							<td>{holding.symbol}</td>
							<td>{holding.name}</td>
							<td>{holding.quantity}</td>
							<td>{holding.paid}</td>
							<td>{holding.date}</td>
						</tr>
					))
				) : (
					<tr>
						<td colSpan={5}>Loading....</td>
					</tr>
				)}
			</tbody>
		</Table>
	)
}
export default HoldingsTable
