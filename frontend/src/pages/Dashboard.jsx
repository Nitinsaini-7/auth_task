import { useState } from "react";
import Home from "./Home";
import AllUsers from "./AllUsers";
import EditProfile from "./EditProfile";
import Login from "./Login";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");

  const isAuth = !!localStorage.getItem("token");

  const renderContent = () => {
    if (activeTab === "home") return <Home />;
    if (activeTab === "allUsers") return <AllUsers />;
    if (activeTab === "edit") return <EditProfile />;
  };

  if (!isAuth) return <Login />;

  return (
    <div className="flex h-screen">
      <aside className="md:w-40 w-32 bg-gray-800 text-white flex flex-col p-5">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <button
          onClick={() => setActiveTab("home")}
          className="py-2 hover:bg-gray-700"
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab("allUsers")}
          className="py-2 hover:bg-gray-700"
        >
          All Users
        </button>
        <button
          onClick={() => setActiveTab("edit")}
          className="py-2 hover:bg-gray-700"
        >
          Edit Profile
        </button>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">{renderContent()}</main>
    </div>
  );
}
