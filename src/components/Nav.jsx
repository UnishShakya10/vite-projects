import { Link } from "react-router";

function Nav() {
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
                <li><Link to="/add-blog" className="text-white hover:text-amber-100 no-underline">Add blog</Link></li>
            </ul>

            <div className="flex gap-2">
                <Link to="/signup" className="bg-yellow-400 text-black px-3 py-1.5 rounded-lg hover:bg-yellow-600">
                    Sign up
                </Link>

                <Link to="/login" className="bg-yellow-400 text-black px-3 py-1.5 rounded-lg hover:bg-yellow-600">
                    Log in
                </Link>
            </div>

        </nav>
    );
}

export default Nav;