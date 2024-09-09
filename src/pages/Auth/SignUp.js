import React, { useState } from "react";
import { useAuth } from "../../services/userContext";
import { useNavigate, Link } from "react-router-dom";
import Title from "./components/Title";
import { Button } from "../../components/ui/button";
import { addUserToFirestore } from "../../services/users.services";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState(""); // New field for the user's userName
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const userCredential = await signup(email, password);
      const user = userCredential.user;

      // Add user to Firestore
      await addUserToFirestore(user.uid, {
        userName,
        email: user.email,
      });

      navigate("/");
    } catch (error) {
      console.error("Failed to create an account", error.message);
      alert("Failed to create an account: " + error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4 py-8 md:px-6 lg:px-8">
      <div className="bg-orange-200 w-full max-w-lg p-8 rounded-lg shadow-lg">
        <Title>Sign Up</Title>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            className="p-3 border border-gray-300 rounded-md"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="username"
            required
          />
          <input
            className="p-3 border border-gray-300 rounded-md"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className="p-3 border border-gray-300 rounded-md"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <input
            className="p-3 border border-gray-300 rounded-md"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <Button
            type="submit"
            variant="sospet"
            className="bg-orange-500 text-white hover:bg-orange-600 w-full py-3"
          >
            Sign Up
          </Button>
        </form>
        <p className="mt-6 text-center text-gray-700">
          Already have an account?{" "}
          <Link to="/login">
            <Button
              variant="secondary"
              className="text-orange-900 hover:bg-orange-900 hover:text-white mt-2"
            >
              Login
            </Button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
