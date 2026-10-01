import { Alert, Button, FileInput, NumberInput, Select, Switch, Textarea, TextInput } from "@mantine/core";
import { Images } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { APIURL, GetRequest, PostRequest } from "../services/http";

const initialForm = {
    title: "",
    body: "",
    category: "",
    likes: 0,
    status: true,
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
    const [imagePreview, setImagePreview] = useState("");
    const [users, setUsers] = useState([]);
    const [author, setAuthor] = useState(null);
    const [usersLoading, setUsersLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const updateField = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    useEffect(() => {
        let active = true;

        GetRequest("users/getAll")
            .then(({ data }) => {
                if (active) {
                    setUsers(Array.isArray(data) ? data : []);
                }
            })
            .catch((requestError) => {
                if (active) {
                    setError(getErrorMessage(requestError, "Unable to load authors."));
                }
            })
            .finally(() => {
                if (active) {
                    setUsersLoading(false);
                }
            });

        return () => {
            active = false;
        };
    }, []);

    useEffect(() => {
        if (!image) {
            setImagePreview("");
            return undefined;
        }

        const previewUrl = URL.createObjectURL(image);
        setImagePreview(previewUrl);
        return () => URL.revokeObjectURL(previewUrl);
    }, [image]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (!image) {
            setError("Choose a cover image before publishing.");
            return;
        }

        if (!author) {
            setError("Select an author before publishing.");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("title", form.title);
            formData.append("body", form.body);
            formData.append("category", form.category);
            formData.append("likes", String(form.likes));
            formData.append("status", String(form.status));
            formData.append("author", author);
            formData.append("image", image);

            await PostRequest("blogs/create", formData);
            setSuccess("Blog created successfully.");
            setForm(initialForm);
            setImage(null);
            setAuthor(null);
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
                {success && (
                    <Button component={Link} to="/blogs" color="dark" className="mt-4">
                        View blogs
                    </Button>
                )}

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
                    <Select
                        label="Author"
                        placeholder={usersLoading ? "Loading authors..." : "Select an author"}
                        searchable
                        clearable
                        value={author}
                        onChange={setAuthor}
                        data={users.map((user) => ({
                            label: user.fullName,
                            value: user._id,
                        }))}
                        disabled={usersLoading}
                        nothingFoundMessage="No users found"
                        required
                    />
                    <NumberInput
                        label="Likes"
                        value={form.likes}
                        onChange={(value) => setForm({ ...form, likes: Number(value) || 0 })}
                        min={0}
                        allowDecimal={false}
                    />
                    <Switch
                        label="Visible to readers"
                        checked={form.status}
                        onChange={(event) => setForm({ ...form, status: event.currentTarget.checked })}
                    />

                    <FileInput
                    label="Cover image"
                    placeholder="Choose an image file"
                    accept="image/*"
                    value={image}
                    onChange={setImage}
                    required
                    leftSection={<Images size={24} aria-hidden="true" />}
                    leftSectionPointerEvents="none"
                    leftSectionWidth={56}
                    className="w-full"
                    styles={{
                        input: {
                            height: "88px",
                            paddingLeft: "56px",
                        },
                    }}
                    />

                    {imagePreview && (
                        <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                            <p className="border-b border-gray-200 px-4 py-2 text-sm font-medium text-gray-600">
                                Image preview
                            </p>
                            <img
                                src={imagePreview}
                                alt="Selected blog cover preview"
                                className="h-64 w-full object-cover p-4"
                            />
                        </div>
                    )}

                    <Button type="submit" loading={loading} color="dark">
                        Add blog
                    </Button>
                </form>
            </section>
        </main>
    );
};

export default AddBlog