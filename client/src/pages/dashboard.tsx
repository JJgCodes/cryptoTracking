import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllData } from '../apis/getAllData'
import CryptoTable from '../components/CryptoTable'
import { setData } from '../store/slices/allDataSlice'

const Dashboard = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		const fetchDataAndDispatch = async () => {
			const data = await getAllData()
			if (data) {
				dispatch(setData(data))
			} else {
				console.log('failed to get data')
			}
		}
		fetchDataAndDispatch()
	}, [])

	return (
		<div>
			<div className="text-center mt-5">
				<h1>Dashboard</h1>
			</div>
			<CryptoTable />
		</div>
	)
}

export default Dashboard
