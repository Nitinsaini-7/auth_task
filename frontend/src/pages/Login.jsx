import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const { login, api } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/users/login", form);
      toast.success(data.msg)
      login(data.token, data.username);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          required
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 py-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
