import { useDispatch } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { showModal } from '../store/slices/modalSlice'
import CryptoModal from './CryptoModal'
import HoldingsTable from './HoldingsTable'
import TransactionsTable from './TransactionsTable'

const CryptoTable = () => {
	const dispatch = useDispatch()

	return (
		<div>
			<div className="container mt-5">
				<Card className="text-center">
					<Card.Body>
						<h2 className="mb-4">Holdings</h2>
						<HoldingsTable />
						<h2 className="mb-4">Transactions</h2>
						<TransactionsTable />
						<Button variant="primary" onClick={() => dispatch(showModal())}>
							Add Transaction
						</Button>
					</Card.Body>
				</Card>
			</div>
			<CryptoModal />
		</div>
	)
}
export default CryptoTable
