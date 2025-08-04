import { useEffect, Suspense, lazy } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import { checkAuth } from './redux/slices/auth.slices.js'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/common/ProtectedRoute.jsx'
import PublicRoute from './components/common/PublicRoute.jsx'
import Loading from './components/common/Loading.jsx'
import NotFound from './components/common/NotFound.jsx'

const Landing = lazy(() => import('./pages/Landing'))
const SignUp = lazy(() => import('./pages/Signup'))
const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path='/'
            element={<Landing />}
          />
          <Route
            path='/signup'
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>}
          />
          <Route
            path='/login'
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>}
          />
          <Route
            path='/chat'
            element={
              <ProtectedRoute>
                <Dashboard layout="upload" />
              </ProtectedRoute>}
          />

          <Route
            path='/chat/:chatId'
            element={
              <ProtectedRoute>
                <Dashboard layout="chat" />
              </ProtectedRoute>
            }
          />

          {/* catch all route */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
