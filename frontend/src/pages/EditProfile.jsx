import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const [form, setForm] = useState({ username: "", password: "" });
  const { api, login } = useAuth();
  const navigate = useNavigate()

  const logout = () => {
     
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/login");
    };

  const updateProfile = async (e) => {

    e.preventDefault();
    try {
      const { data } = await api.put("/users/update", form);
      login(data.token, data.username);
      toast.success("Profile updated successfully!");
      logout()
    } catch (err) {
      toast.error(err.response?.data?.msg || "Username already exists");
    }
  };

  return (
    <div className="max-w-md">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={updateProfile} className="space-y-4">
        <input type="text" placeholder="New Username" value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full px-4 py-2 border rounded" />
        <input type="password" placeholder="New Password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 py-2 border rounded" />
        <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
      
    </div>
  );
}