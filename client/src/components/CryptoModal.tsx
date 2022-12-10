
import Modal from 'react-bootstrap/Modal'
import { hideModal } from '../store/slices/modalSlice'
import CryptoForm from './CryptoForm'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'

const CryptoModal = () => {
	const modalStatus = useSelector((state: RootState) => state.modal.isModalVisible)
	const dispatch = useDispatch()

	return (
		<Modal show={modalStatus} onHide={() => dispatch(hideModal())}>
			<Modal.Header closeButton>
				<Modal.Title>Add Transaction</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<CryptoForm />
			</Modal.Body>
		</Modal>
	)
}
export default CryptoModal
