import React, { useState } from "react";
import { useAuth } from "../../services/userContext";
import { Link, useNavigate } from "react-router-dom";
import Title from "./components/Title";
import { Button } from "../../components/ui/button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error("Failed to log in", error.message);
      alert("Failed to log in: " + error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      alert("Please enter your email address first.");
      return;
    }

    try {
      await resetPassword(email);
      alert("Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.error("Failed to send password reset email", error.message);
      alert("Failed to send password reset email: " + error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4 py-8 md:px-6 lg:px-8">
      <div className="bg-orange-200 w-full max-w-lg p-8 rounded-lg shadow-lg">
        <Title>Login</Title>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <Button
            type="submit"
            variant="sospet"
            className="bg-orange-500 text-white hover:bg-orange-600 w-full py-3"
          >
            Login
          </Button>
        </form>
        <p className="mt-6 text-center text-gray-700">
          <Button
            onClick={handleResetPassword}
            variant="link"
            className="text-blue-600 hover:text-blue-800"
          >
            Forgot Password?
          </Button>
        </p>
        <p className="mt-6 text-center text-gray-700">
          Don't have an account?{" "}
          <Link to="/signup">
            <Button
              variant="secondary"
              className="text-orange-900 hover:bg-orange-900 hover:text-white mt-2"
            >
              Sign Up
            </Button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
