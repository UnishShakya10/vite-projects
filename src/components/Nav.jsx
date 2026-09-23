import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const getStoredUser = () => {
    try {
        return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
        localStorage.removeItem("user");
        return null;
    }
};

function Nav() {
    const navigate = useNavigate();
    const [user, setUser] = useState(getStoredUser);

    useEffect(() => {
        const updateUser = () => {
            setUser(getStoredUser());
        };

        window.addEventListener("auth-changed", updateUser);
        window.addEventListener("storage", updateUser);

        return () => {
            window.removeEventListener("auth-changed", updateUser);
            window.removeEventListener("storage", updateUser);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("auth-changed"));
        navigate("/login");
    };

    return (
        <nav className="flex w-full items-center justify-between bg-black/95 px-4 py-3 border-b border-yellow-700/20">

            <div className="text-xl font-bold text-amber-300">
                Logo
            </div>

            <ul className="flex gap-6 list-none">
                <li><Link to="/" className="text-white hover:text-amber-100 no-underline">Home</Link></li>
                <li><Link to="/contact" className="text-white hover:text-amber-100 no-underline">Contact</Link></li>
                <li><Link to="/about" className="text-white hover:text-amber-100 no-underline">About</Link></li>
                <li><Link to="/settings" className="text-white hover:text-amber-100 no-underline">Settings</Link></li>
                <li><Link to="/blogs" className="text-white hover:text-amber-100 no-underline">Blogs</Link></li>
            </ul>

            <div className="flex gap-2">
                {user ? (
                    <>
                        <div className="text-right text-white">
                            <p className="text-sm font-bold">{user.fullName || user.email}</p>
                            <p className="text-xs uppercase tracking-wider text-amber-300">{user.role || "User"}</p>
                        </div>
                        <button type="button" onClick={handleLogout} className="bg-yellow-400 px-3 py-1.5 text-black rounded-lg hover:bg-yellow-600">
                            Log out
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/signup" className="bg-yellow-400 text-black px-3 py-1.5 rounded-lg hover:bg-yellow-600">
                            Sign up
                        </Link>
                        <Link to="/login" className="bg-yellow-400 text-black px-3 py-1.5 rounded-lg hover:bg-yellow-600">
                            Log in
                        </Link>
                    </>
                )}
            </div>

        </nav>
    );
}

export default Nav;