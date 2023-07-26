import { Navigate } from 'react-router'

function Protected({ children }) {
const token = localStorage.getItem('usertoken')
// console.log(token);
    if (!token) {
        return <Navigate to='/signup' />
    }
    else {
        return children
    }
}
export default Protected