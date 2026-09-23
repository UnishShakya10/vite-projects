function About() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">
                About To-Do List
            </h1>

            <p className="text-gray-700 mb-4">
                This is a simple React To-Do List application that allows
                users to add, edit, update, and delete tasks.
            </p>

            <h2 className="text-xl font-semibold mb-2">
                Features
            </h2>

            <ul className="list-disc ml-6 text-gray-700">
                <li>Add new tasks</li>
                <li>Edit existing tasks</li>
                <li>Update edited tasks</li>
                <li>Delete tasks</li>
            </ul>

            <p className="mt-4 text-gray-700">
                The application uses React's useState to store and manage
                the tasks.
            </p>
        </div>
    );
}

export default About;