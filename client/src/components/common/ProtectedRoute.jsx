import { useSelector } from 'react-redux'
import Loading from './Loading'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth)

    if (loading) {
        return <Loading />
    }

    return isAuthenticated ? children : <Navigate to="/login" replace={true} />
}

export default ProtectedRoute;