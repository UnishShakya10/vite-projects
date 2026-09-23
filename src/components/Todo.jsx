import { useState } from "react";

function Todo() {
    const [message, setMessage] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const handleSubmit = () => {
        if (message.trim() === "") return;

        if (editIndex !== null) {
            const updatedTasks = tasks.map((task, index) =>
                index === editIndex ? message : task
            );

            setTasks(updatedTasks);
            setEditIndex(null);
        } else {
            setTasks([...tasks, message]);
        }

        setMessage("");
    };

    const handleEdit = (index) => {
        setMessage(tasks[index]);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const newTasks = tasks.filter((task, i) => i !== index);
        setTasks(newTasks);
    };

    return (
        <div className="flex flex-col items-center gap-4">

            <h1 className="text-3xl font-bold">
                To-Do List
            </h1>

            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border p-2 rounded"
            />

            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white p-2 rounded"
            >
                {editIndex !== null ? "Update Task" : "Add Task"}
            </button>

            <div>
                {tasks.map((task, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 bg-gray-200 p-2 mb-2 rounded"
                    >
                        <span>{task}</span>

                        <button
                            onClick={() => handleEdit(index)}
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => handleDelete(index)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Todo;