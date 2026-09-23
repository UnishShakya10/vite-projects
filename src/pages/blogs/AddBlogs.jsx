import { Alert, Button, Select, Textarea, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router";
import { PostRequest } from "../services/http";

const initialForm = {
  title: "",
  body: "",
  category: "",
  image: "",
};

function AddBlogs() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const updateCategory = (category) => {
    setForm({ ...form, category: category || "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user") || "null");

    try {
      await PostRequest("blogs/create", {
        ...form,
        likes: 0,
        ...(user?.id ? { author: user.id } : {}),
      });

      setForm(initialForm);
      setSuccess("Your blog was published successfully.");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          requestError.response?.data ||
          requestError.message ||
          "Unable to publish your blog."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-65px)] bg-[#f5f5f0] px-5 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-3xl bg-black px-8 py-12 text-white shadow-xl md:px-12">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-300">Writer's desk</p>
          <h1 className="mt-5 text-4xl font-black leading-tight">Give your next idea somewhere to live.</h1>
          <p className="mt-5 text-sm leading-7 text-gray-300">Share a story, lesson, or useful discovery with the rest of your workspace.</p>
          <Link to="/" className="mt-8 inline-block text-sm font-bold text-amber-300 hover:text-amber-200">Back to home</Link>
        </section>

        <section className="rounded-3xl bg-white px-6 py-10 shadow-xl sm:px-12">
          <Title order={2} className="text-3xl font-black text-gray-900">Add a blog</Title>
          <p className="mt-2 text-sm text-gray-500">Write and publish a new post through the backend API.</p>

          {error && <Alert color="red" className="mt-6">{error}</Alert>}
          {success && <Alert color="green" className="mt-6">{success}</Alert>}

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <TextInput label="Title" name="title" value={form.title} onChange={updateField} required size="md" />
            <Select
              label="Category"
              placeholder="Choose a category"
              data={["Technology", "Education", "Travel", "Lifestyle", "Business", "Other"]}
              value={form.category || null}
              onChange={updateCategory}
              required
              size="md"
            />
            <Textarea label="Body" name="body" value={form.body} onChange={updateField} minRows={8} required size="md" />
            <TextInput label="Cover image URL" name="image" value={form.image} onChange={updateField} placeholder="https://example.com/image.jpg" size="md" />
            <Button type="submit" fullWidth size="md" loading={loading} color="dark" className="mt-6">Publish blog</Button>
          </form>
        </section>
      </div>
    </main>
  );
}

export default AddBlogs;
