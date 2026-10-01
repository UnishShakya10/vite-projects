import { useState } from "react";

function Settings() {
    const [name, setName] = useState("unish");
    const [show, setShow] = useState(true);
    const [color, setColor] = useState("bg-gray-500");
    const [isCircle, setIsCircle] = useState(true);

    const changeName = () => setName("unish");
    const Surname = () => setName("shakya");

    const [isPassword, setIsPassword] = useState(true);
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white w- x`[700px] p-8 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-8">Settings</h1>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Name Settings</h2>
                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                        <p className="text-lg">The name is: <span className="font-bold">{name}</span></p>
                        <div className="flex gap-2">
                            <button onClick={changeName} className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl">Name</button>
                            <button onClick={Surname} className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl">Surname</button>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Message</h2>
                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                        {show ? <p className="font-semibold">This message is showing</p> : <p className="text-gray-400"></p>}
                        <button onClick={() => setShow(!show)} className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl">
                            {show ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-2">Traffic Light</h2>
                    <div className="bg-gray-50 p-5 rounded-xl">
                        <div className="flex justify-center mb-4">
                            <div className={`h-20 w-20 ${color} ${isCircle ? "rounded-full" : "rounded-none"}`}></div>
                        </div>
                        <div className="flex justify-center gap-2">
                            <button onClick={() => setColor("bg-red-500")} className="bg-red-500 text-white px-4 py-2 rounded-xl">Red</button>
                            <button onClick={() => setColor("bg-yellow-500")} className="bg-yellow-500 text-white px-4 py-2 rounded-xl">Yellow</button>
                            <button onClick={() => setColor("bg-green-500")} className="bg-green-500 text-white px-4 py-2 rounded-xl">Green</button>
                            <button onClick={() => setIsCircle(!isCircle)} className="bg-purple-500 text-white px-4 py-2 rounded-xl">
                                {isCircle ? "Square" : "Circle"}
                            </button>
                        </div>
                    </div>
                </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Is Text or Password</h2>
                <div className="bg-gray-50 p-3 rounded-xl">
                    <div className="flex items-center">
                        <input type={isPassword ? "password" : "text"} placeholder="Enter password" className="border border-gray-400 p-2 rounded-l-xl outline-none" />
                        <button onClick={() => setIsPassword(!isPassword)} className="bg-blue-500 text-white p-2 rounded-r-xl">
                              {isPassword ? "Show" : "Hide"}
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Settings;