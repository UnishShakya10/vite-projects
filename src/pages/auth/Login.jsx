import { Alert, Button, PasswordInput, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { PostRequest } from "../services/http";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
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
      const response = await PostRequest("users/login", form);

      if (typeof response.data === "string") {
        throw new Error(response.data);
      }

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify({
        id: response.data.id,
        email: response.data.email,
        fullName: response.data.fullName,
        role: response.data.role,
      }));
      navigate("/", { replace: true });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          requestError.response?.data ||
          requestError.message ||
          "Unable to log in."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-65px)] bg-[#f5f5f0] px-5 py-12">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-[1.1fr_0.9fr]">
        <section className="order-2 px-6 py-10 sm:px-12 md:order-1">
          <Title order={2} className="text-3xl font-black text-gray-900">Welcome back</Title>
          <p className="mt-2 text-sm text-gray-500">Log in to continue to your workspace.</p>

          {location.state?.message && <Alert color="green" className="mt-6">{location.state.message}</Alert>}
          {error && <Alert color="red" className="mt-6">{error}</Alert>}

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <TextInput label="Email" name="email" type="email" value={form.email} onChange={updateField} required size="md" />
            <PasswordInput label="Password" name="password" value={form.password} onChange={updateField} required size="md" />
            <Button type="submit" fullWidth size="md" loading={loading} color="dark" className="mt-6">Log in</Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">New here? <Link to="/signup" className="font-bold text-orange-600 hover:text-orange-700">Create an account</Link></p>
        </section>

        <section className="order-1 bg-orange-500 px-8 py-12 text-white md:order-2 md:px-12">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-100">Your workspace</p>
          <h1 className="mt-5 text-4xl font-black leading-tight">Pick up exactly where you left off.</h1>
          <p className="mt-5 text-sm leading-7 text-orange-50">Your session token is saved after a successful login so the app can recognize your account.</p>
        </section>
      </div>
    </main>
  );
}

export default Login;
