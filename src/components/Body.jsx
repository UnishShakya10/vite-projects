import React, { useState, useEffect } from "react";
import CardS from "./Cards";
import { Button } from '@mantine/core'; 

const Body = () => {
  const [showDialog, setShowDialog] = useState(false);

  // All courses
  const [courses, setCourses] = useState(()=>{
    const saved = localStorage.getItem("courses");
  return saved ? JSON.parse(saved): [
    {
      image: "/cricket.webp",
      level: "Beginners",
      title: "Cricket Training",
      description:
        "Learn the fundamentals of cricket, including batting, bowling, fielding, and the rules of the game.",
      duration: "3 months",
      lessons: "15+",
    },
    {
      image: "/football.webp",
      level: "Intermediate",
      title: "Football Training",
      description:
        "Build your football skills by learning passing, dribbling, shooting, teamwork, and game strategies.",
      duration: "1.5 Years",
      lessons: "30+",
    },
    {
      image: "/english.webp",
      level: "All",
      title: "Learn English",
      description:
        "Improve your English communication skills through grammar, vocabulary, speaking, reading, and writing practice.",
      duration: "4 months",
      lessons: "20+",
    },
  ];
});


useEffect(() => {
  localStorage.setItem("courses", JSON.stringify(courses));
}, [courses]);

  // New course
  const [course, setCourse] = useState({
    image: "",
    level: "",
    title: "",
    description: "",
    duration: "",
    lessons: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  // Add new course
  const handleAddCourse = () => {
    setCourses([...courses, course]);

    // Close dialog
    setShowDialog(false);

    // Clear inputs
    setCourse({
      image: "",
      level: "",
      title: "",
      description: "",
      duration: "",
      lessons: "",
    });
  };

  return (
    <div className="p-10">

      {/* Add Course Button */}
      <button
        onClick={() => setShowDialog(true)}
        className="bg-pink-600 text-white px-5 py-2 rounded-lg flex justify-end"
      >
        
        + Add Course
      </button>
      <Button variant="filled" size="md">Button</Button>;

      {/* Dialog Box */}
      {showDialog && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">

          <div className="relative z-50 bg-white w-[500px] p-6 rounded-xl shadow-lg">

            <h2 className="text-2xl font-bold mb-5">
              Add Course
            </h2>

            {/* Image */}
            <input
              type="text"
              name="image"
              value={course.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full border p-2 rounded mb-3"
            />

            {/* Level */}
            <input
              type="text"
              name="level"
              value={course.level}
              onChange={handleChange}
              placeholder="Level"
              className="w-full border p-2 rounded mb-3"
            />

            {/* Title */}
            <input
              type="text"
              name="title"
              value={course.title}
              onChange={handleChange}
              placeholder="Course Title"
              className="w-full border p-2 rounded mb-3"
            />

            {/* Description */}
            <textarea
              name="description"
              value={course.description}
              onChange={handleChange}
              placeholder="Course Description"
              className="w-full border p-2 rounded mb-3"
            />

            {/* Duration */}
            <input
              type="text"
              name="duration"
              value={course.duration}
              onChange={handleChange}
              placeholder="Duration"
              className="w-full border p-2 rounded mb-3"
            />

            {/* Lessons */}
            <input
              type="text"
              name="lessons"
              value={course.lessons}
              onChange={handleChange}
              placeholder="Number of Lessons"
              className="w-full border p-2 rounded mb-5"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowDialog(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleAddCourse}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add Course
              </button>

            </div>
          </div>
        </div>
      )}

      {/* Course Cards */}
      <div className="flex flex-wrap gap-8 px-16 py-12">

        {courses.map((item, index) => (
          <CardS
            key={index}
            image={item.image}
            level={item.level}
            title={item.title}
            description={item.description}
            duration={item.duration}
            lessons={item.lessons}
          />
        ))}

      </div>
    </div>
  );
};

export default Body;