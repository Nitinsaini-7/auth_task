import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AllUsers() {
  const { api } = useAuth();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await api.get("/users/all");
    setUsers(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await api.delete(`/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td className="p-2 border">{user.username}</td>
              <td className="p-2 border text-center">
                <button onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr><td colSpan="2" className="text-center p-4">Loading...</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}