import Form from 'react-bootstrap/Form'
import React, { useEffect, useState } from 'react'
import { COIN_URL } from '../config/config'
import { addCryptoToDb } from '../apis/addToDb'
import Button from 'react-bootstrap/Button'
import { useDispatch } from 'react-redux'
import { hideModal } from '../store/slices/modalSlice'

// import { pushData } from '../store/slices/allDataSlice'

const CryptoForm = () => {
	const dispatch = useDispatch()


	const date = new Date()
	const today = date.toISOString().slice(0, 10)
	const priorDate = new Date(date.setFullYear(date.getFullYear() - 10))
	const minimumDate = priorDate.toISOString().slice(0, 10)

	const [transactionData, setTransactionData] = useState({
		name: '',
		quantity: '',
		paid: '',
		date: today,
		symbol: '',
	})
	const [cryptoList, setCryptoList] = useState<any[]>([])
	const [isDropDownVisable, setDropDown] = useState(false)
	const [canSave, setCanSave] = useState(false)

	const handleDropDownClick = (symbol: string, name: string) => {
		setTransactionData((prevState) => ({
			...prevState,
			symbol: symbol.toUpperCase(),
			name: name,
		}))
		setDropDown(false)
	}

	const lookForMatch = (data: any[], checkAgainstThis: string) => {
		const value = checkAgainstThis.toLowerCase()
		const valueLeng = checkAgainstThis.length

		return data.find(
			({ name, id, symbol }) =>
				name.slice(0, valueLeng) === value ||
				id.slice(0, valueLeng) === value ||
				symbol.slice(0, valueLeng) === value
		)
	}

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.currentTarget

		if (name === 'name') {
			value !== '' && lookForMatch(cryptoList, value) ? setDropDown(true) : setDropDown(false)
		}

		setTransactionData((prevState) => ({ ...prevState, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		setCanSave(false)
		e.preventDefault()
		// dispatch(pushData(transactionData))
		try {
			await addCryptoToDb(transactionData)
			dispatch(hideModal())
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (!cryptoList.length) {
			async function fetchListData() {
				try {
					const response = await fetch(COIN_URL)
					setCryptoList(await response.json())
				} catch (error) {
					console.log(error)
				}
			}
			fetchListData()
		}
		setCanSave([...Object.values(transactionData)].every(Boolean))
	}, [transactionData])

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className="formGroup">
				<Form.Label>Name</Form.Label>
				<Form.Control
					type="text"
					name="name"
					autoComplete="off"
					value={transactionData.name}
					onChange={handleInputChange}
					required
				/>
				<ul
					className={`dropdown-menu ${isDropDownVisable ? 'show' : 'hidden'}`}
					style={{
						height: '300px',
						overflowY: 'scroll',
						overflowX: 'hidden',
						cursor: 'pointer',
					}}
				>
					{cryptoList.map((item, index) => {
						{
							const { id, name, symbol } = item
							const userInput = transactionData.name.toLowerCase()

							if (
								userInput === id.slice(0, userInput.length) ||
								userInput === symbol.slice(0, userInput.length) ||
								userInput === name.slice(0, userInput.length)
							) {
								return (
									<li
										className="dropdown-item"
										key={index}
										onClick={() => handleDropDownClick(symbol, name)}
									>
										{name} ({symbol})
									</li>
								)
							}
						}
					})}
				</ul>
			</Form.Group>
			<Form.Group className="formGroup">
				<Form.Label>Symbol</Form.Label>
				<Form.Control
					type="text"
					name="symbol"
					value={transactionData.symbol}
					onChange={handleInputChange}
					required
				/>
			</Form.Group>
			<Form.Group className="formGroup">
				<Form.Label>Quantity</Form.Label>
				<Form.Control
					type="number"
					name="quantity"
					max={100_000}
					min={0}
					step={0.0000001}
					value={transactionData.quantity}
					onChange={handleInputChange}
					required
				/>
			</Form.Group>
			<Form.Group className="formGroup">
				<Form.Label>Paid</Form.Label>
				<Form.Control
					type="number"
					name="paid"
					max={10_000}
					min={0.0}
					step={0.01}
					value={transactionData.paid}
					onChange={handleInputChange}
					required
				/>
			</Form.Group>
			<Form.Group className="formGroup">
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
			<Form.Group className="formGroup mt-5">
				<Button variant="primary" type="submit" disabled={!canSave}>
					Add
				</Button>
				<Button variant="secondary" onClick={() => dispatch(hideModal())} className="ms-2">
					Close
				</Button>
			</Form.Group>
		</Form>
	)
}
export default CryptoForm
