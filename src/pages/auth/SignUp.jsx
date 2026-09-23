import { Alert, Button, PasswordInput, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { PostRequest } from "../services/http";

function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await PostRequest("users/create", {
        ...form,
        role: "USER",
      });

      if (typeof response.data === "string") {
        throw new Error(response.data);
      }

      navigate("/login", { state: { message: "Account created. You can log in now." } });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          requestError.response?.data ||
          requestError.message ||
          "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-65px)] bg-[#f5f5f0] px-5 py-12">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-[0.9fr_1.1fr]">
        <section className="bg-black px-8 py-12 text-white md:px-12">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-300">Welcome</p>
          <h1 className="mt-5 text-4xl font-black leading-tight">Build your workspace around your ideas.</h1>
          <p className="mt-5 text-sm leading-7 text-gray-300">Create an account to keep your work connected to the backend practice API.</p>
        </section>

        <section className="px-6 py-10 sm:px-12">
          <Title order={2} className="text-3xl! font-black! text-gray-900!">Create your account</Title>
          <p className="mt-2 text-sm text-gray-500">Start with your name, email, and a secure password.</p>

          {error && <Alert color="red" className="mt-6">{error}</Alert>}

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <TextInput label="Full name" name="fullName" value={form.fullName} onChange={updateField} required size="md" />
            <TextInput label="Email" name="email" type="email" value={form.email} onChange={updateField} required size="md" />
            <PasswordInput label="Password" name="password" value={form.password} onChange={updateField} required minLength={6} size="md" />
            <Button type="submit" fullWidth size="md" loading={loading} color="dark" className="mt-6!">Create account</Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">Already have an account? <Link to="/login" className="font-bold text-orange-600 hover:text-orange-700">Log in</Link></p>
        </section>
      </div>
    </main>
  );
}

export default SignUp;
