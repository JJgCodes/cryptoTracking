import Form from 'react-bootstrap/Form'
import { useEffect, useState } from 'react'
import { COIN_URL } from '../config/config'
import Button from 'react-bootstrap/Button'

const CryptoForm = () => {
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
	const [isDropDownVisable, setDropDown] = useState(true)

	const handleDropDownClick = (symbol: string, name: string) => {
		setTransactionData((prevState) => ({
			...prevState,
			symbol: symbol,
			name: name,
		}))
		setDropDown(true)
	}

	const lookForMatch = (data: any[], checkAgainstThis: string) => {
		const value = checkAgainstThis
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
			!value && lookForMatch(cryptoList, value.toLowerCase())
				? setDropDown(true)
				: setDropDown(false)
		}

		setTransactionData((prevState) => ({ ...prevState, [name]: value }))
	}

	const handleSubmit = () => {
		
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
	}, [])

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group>
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
					className={`dropdown-menu ${!isDropDownVisable && 'show'}`}
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
