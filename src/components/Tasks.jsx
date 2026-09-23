import { useEffect, useState } from "react";

export const Tasks = () => {
    const [message, setMessage] = useState("");
    const [editIndex, setEditIndex] = useState(null);


    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("task"))||[]);

    useEffect(()=>{
            
    },[tasks]) 




    const user={
        name:"unish",
        age:23
    };

    localStorage.setItem(
        "userData",JSON.stringify(user)    )

    const fromlocal= JSON.parse(localStorage.getItem("userData"))
        console.log(tasks,"task")





    // Add / Update Task
    const handleSubmit = () => {
        if (message.trim() === "") return;

        if (editIndex !== null) {
            const updatedTasks = tasks.map((task, index) => {
                if (index === editIndex) {
                    return {
                        ...task,
                        text: message
                    };
                }

                return task;
            });

            setTasks(updatedTasks);
            setEditIndex(null);
        } else {
            const newTask = {
                text: message,
                completed: false
            };

            setTasks([...tasks, newTask]);
        }

        setMessage("");
    };

    // Edit
    const handleEdit = (index) => {
        setMessage(tasks[index].text);
        setEditIndex(index);
    };

    // Delete
    const handleDelete = (index) => {
        const newTasks = tasks.filter((task, i) => i !== index);
        setTasks(newTasks);
    };

    // Complete / Incomplete
    const handleComplete = (index) => {
        const updatedTasks = tasks.map((task, i) => {
            if (i === index) {
                return {
                    ...task,
                    completed: !task.completed
                };
            }

            return task;
        });

        setTasks(updatedTasks);
    };

    return (
        {fromlocal},
        
        <div className=" bg-gray-300 p-6 rounded-2xl shadow-lg w-96 flex flex-col items-center gap-4 m-4">

            <h1 className="text-3xl font-bold">
                To-Do List
            </h1>

            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter task"
                className="border border-gray-800 p-2 rounded-xl"
            />

            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl"
            >
                {editIndex !== null ? "Update Task" : "+ Add Task"}
            </button>

            <div className="flex flex-col gap-2 w-80">

                {tasks.map((task, index) => (

                    <div
                        key={index}
                        className={`p-3 rounded-xl flex items-center justify-between ${
                            task.completed ? "text-green-400" : "text-red-400"
                        }`}
                    >

                        <span
                            className={
                                task.completed ? "line-through" : "" }
                        >
                            {task.completed && "✓ "}
                            {task.text}
                        </span>

                        <div className="flex gap-2">

                            <button
                                onClick={() => handleComplete(index)}
                                className="bg-white px-2 py-1 rounded-lg"
                            >
                                ✓
                            </button>

                           {!task.completed && (
                                <button
                                    className="bg-blue-600 text-white px-2 py-1 rounded-lg"
                                    onClick={() => handleEdit(index)}
                                >
                                    Edit
                                </button>
                            )}

                            <button
                                onClick={() => handleDelete(index)}
                                className="bg-purple-600 text-white px-2 py-1 rounded-lg" >
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};