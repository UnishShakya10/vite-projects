import { Alert } from "@mantine/core";
import { Link } from "react-router";

function PrivateRoutes({ children }) {
  const token = localStorage.getItem("authToken") || localStorage.getItem("token");
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    localStorage.removeItem("user");
  }

  if (!token) {
    return (
      <main className="min-h-[calc(100vh-65px)] bg-[#f5f5f0] px-5 py-12">
        <Alert color="orange" title="Login required" className="mx-auto max-w-2xl">
          Please <Link to="/login" className="font-bold underline">log in</Link> with an administrator account to access this page.
        </Alert>
      </main>
    );
  }

  if (user?.role !== "ADMIN") {
    return (
      <main className="min-h-[calc(100vh-65px)] bg-[#f5f5f0] px-5 py-12">
        <Alert color="red" title="Admin access required" className="mx-auto max-w-2xl">
          Your account has user access. Only administrators can add blogs or open the admin dashboard.
        </Alert>
      </main>
    );
  }

  return children;
}

export default PrivateRoutes