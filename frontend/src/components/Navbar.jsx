import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuth = !!localStorage.getItem("token");

  const logout = () => {
    toast.success("Logout Successfully")
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-lg font-bold">Dashboard App</h1>
      <div className="space-x-4">
        {isAuth ? (
          <>
            <span className="font-semibold">{localStorage.getItem("username")}</span>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
