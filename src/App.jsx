import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Today from './pages/Today';
import AllTasks from './pages/AllTasks';
import Logout from './pages/Logout';
import VerifyEmail from './pages/VerifyEmail';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './routes/ProtectedRoute';

import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <Router>
            <Toaster position="top-right" />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/" element={
                    <ProtectedRoute>
                        <Today />
                    </ProtectedRoute>
                } />
                <Route path="/all-tasks" element={
                    <ProtectedRoute>
                        <AllTasks />
                    </ProtectedRoute>
                } />
                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;