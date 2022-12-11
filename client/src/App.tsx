import './App.css'
import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="*" element={<Dashboard />} />
			</Routes>
		</Router>
	)
}

export default App
