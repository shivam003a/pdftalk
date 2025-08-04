import { useSelector } from 'react-redux'
import Loading from './Loading'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth)

    if (loading) {
        return <Loading />
    }

    return !isAuthenticated ? children : <Navigate to="/chat" replace={true} />
}

export default PublicRoute;