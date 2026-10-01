const CardS = ({
    image,
    level,
    title,
    description,
    duration,
    lessons,
}) => {
    return (
        <div className="bg-white w-96 rounded-2xl shadow-lg overflow-hidden  ">

            {/* Image Section */}
            <div className="relative">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover"
                />

                <span className="absolute top-4 right-4 bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm">
                    {level}
                </span>
            </div>

            {/* Content */}
            <div className="p-5">

                <h2 className="text-xl font-semibold mb-4">
                    {title}
                </h2>

                <p className="text-gray-500 leading-6 mb-5">
                    {description}
                </p>

                {/* Duration and Lessons */}
                <div className="flex justify-between text-gray-500 text-sm mb-5">

                    <span>
                        🕐 {duration}
                    </span>

                    <span>
                        📖 {lessons} lessons
                    </span>

                </div>

                {/* Button */}
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold">
                    Start Course
                </button>

            </div>
        </div>
    );
};

export default CardS