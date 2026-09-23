import { Alert, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { GetRequest } from "../services/http";

function BlogLists() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadBlogs = async () => {
      try {
        const response = await GetRequest("blogs/public");
        if (active) {
          setBlogs(response.data);
        }
      } catch (requestError) {
        if (active) {
          setError(
            requestError.response?.data?.message ||
              requestError.message ||
              "Unable to load blogs."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadBlogs();

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f5f0] px-5 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-600">Community stories</p>
            <h1 className="mt-3 text-4xl font-black text-gray-900">Latest blogs</h1>
            <p className="mt-2 text-gray-500">Read the stories and ideas shared by your workspace.</p>
          </div>
          <Link to="/add-blog" className="inline-flex w-fit rounded-xl bg-black px-5 py-3 font-bold text-white transition hover:bg-orange-500">
            Add a blog
          </Link>
        </div>

        {error && <Alert color="red" className="mb-8">{error}</Alert>}

        {loading && (
          <div className="flex justify-center py-20">
            <Loader color="orange" />
          </div>
        )}

        {!loading && !error && blogs.length === 0 && (
          <div className="rounded-3xl bg-white px-6 py-20 text-center shadow-sm">
            <h2 className="text-2xl font-black text-gray-900">No blogs yet</h2>
            <p className="mt-2 text-gray-500">Be the first person to share a story.</p>
          </div>
        )}

        {!loading && blogs.length > 0 && (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <article key={blog._id} className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                {blog.image ? (
                  <img src={blog.image} alt={blog.title} className="h-52 w-full object-cover" />
                ) : (
                  <div className="flex h-52 items-center justify-center bg-orange-100 text-5xl font-black text-orange-500">B</div>
                )}
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">{blog.category || "General"}</p>
                  <h2 className="mt-3 text-2xl font-black leading-tight text-gray-900">{blog.title}</h2>
                  <p className="mt-4 line-clamp-4 whitespace-pre-line text-sm leading-6 text-gray-600">{blog.body}</p>
                  <div className="mt-6 flex items-center justify-between text-xs text-gray-400">
                    <span>{blog.author?.fullName || "Workspace author"}</span>
                    <span>{blog.likes || 0} likes</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default BlogLists;
