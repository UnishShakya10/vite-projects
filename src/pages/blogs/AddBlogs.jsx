import { Alert, Button, FileInput, Textarea, TextInput } from "@mantine/core";
import { useState } from "react";
import { APIURL, PostRequest } from "../services/http";

const initialForm = {
    title: "",
    body: "",
    category: "",
    image: "",
};

const getErrorMessage = (requestError, fallback) => {
    const responseMessage = requestError.response?.data?.message;

    if (requestError.code === "ERR_NETWORK") {
        return `Cannot connect to ${APIURL}. Start the backend or set VITE_API_URL to its address.`;
    }

    return typeof responseMessage === "string"
        ? responseMessage
        : requestError.message || fallback;
};

const AddBlog = () => {
    const [form, setForm] = useState(initialForm);
    const [image, setImage] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const updateField = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (!image) {
            setError("Choose a cover image before publishing.");
            return;
        }

        setLoading(true);

        try {
            const payload = new FormData();
            payload.append("title", form.title);
            payload.append("body", form.body);
            payload.append("category", form.category);
            payload.append("image", image);

            await PostRequest("blogs/create", payload);
            setSuccess("Blog created successfully.");
            setForm(initialForm);
            setImage(null);
        } catch (requestError) {
            setError(getErrorMessage(requestError, "Unable to create the blog."));
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-[calc(100vh-65px)] bg-[#f5f5f0] px-4 py-10 sm:px-6 lg:px-8">
            <section className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-600">
                    Writer's desk
                </p>
                <h1 className="mt-3 text-3xl font-black text-gray-950">
                    Create a blog
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    Add the details that appear on the blog listing.
                </p>

                {error && <Alert color="red" className="mt-6">{error}</Alert>}
                {success && <Alert color="green" className="mt-6">{success}</Alert>}

                <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                    <TextInput
                        label="Title"
                        name="title"
                        value={form.title}
                        onChange={updateField}
                        required
                    />
                    <Textarea
                        label="Content"
                        name="body"
                        value={form.body}
                        onChange={updateField}
                        minRows={8}
                        required
                    />
                    <TextInput
                        label="Category"
                        name="category"
                        value={form.category}
                        onChange={updateField}
                        required
                    />

                    <FileInput
                    label="Cover image"
                    placeholder="Choose an image file"
                    accept="image/*"
                    value={image}
                    onChange={setImage}
                    required
                    leftSection={<Image size={22} />}
                    leftSectionWidth={45}
                    className="w-full"
                    styles={{
                        input: {
                        height: "100px",
                        paddingLeft: "50px",
                        },
                    }}
                    />

                    <Button type="submit" loading={loading} color="dark">
                        Publish blog
                    </Button>
                </form>
            </section>
        </main>
    );
};

export default AddBlog