import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { api, login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/users/register", form);
      toast.success(data.msg);
      login(data.token, data.username);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          required
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full px-4 py-2 border rounded"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2 border rounded pr-10"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-sm text-gray-600"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </span>
        </div>
        <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
