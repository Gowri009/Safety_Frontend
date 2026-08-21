import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Login } from './pages/login/Login';
import { Signup } from './pages/login/Signup';
import { Dashboard } from './pages/login/Dashboard';
import { ForgotPassword } from './pages/login/ForgotPassword';
import { ResetPassword } from './pages/login/ResetPassword';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login Page */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* Signup Page */}
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Forgot Password Page */}
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* Reset Password Page */}
        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        {/* Dashboard Page */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}