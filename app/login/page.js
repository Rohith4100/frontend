"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 4) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    return newErrors;
  };

  const handleLogin = async () => {
    setLoginError("");
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setLoginError(errorData.message || "Invalid email or password.");
        return;
      }

      const data = await response.json();

      const roleRoutes = {
        Receptionist: "/receptionist",
        "Lab Technician": "/lab-technician",
        Pathologist: "/pathologist",
        Physician: "/physician",
        Admin: "/admin",
      };

      if (roleRoutes[data.role]) {
        router.push(roleRoutes[data.role]);
      } else {
        setLoginError("Unrecognized role. Please contact support.");
      }
    } catch (error) {
      setLoginError("Unable to connect to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="loginPage">
      <div className="backgroundCircle"></div>
      <div className="backgroundCircle2"></div>

      <div className="loginCard">
        <img
          src="/CrenueLab.png"
          alt="CrenueLab Logo"
          className="logo"
          height="350px"
          width="500px"
        />

        <h1>Welcome Back</h1>
        <p className="subtitle">Sign in to access CrenueLab</p>

        {loginError && (
          <div className="errorBanner">
            {loginError}
          </div>
        )}

        <div className="field">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
            }}
            className={errors.email ? "inputError" : ""}
          />
          {errors.email && <span className="errorText">{errors.email}</span>}
        </div>

        <div className="field">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
            }}
            className={errors.password ? "inputError" : ""}
          />
          {errors.password && <span className="errorText">{errors.password}</span>}
        </div>

        <button onClick={handleLogin} disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}