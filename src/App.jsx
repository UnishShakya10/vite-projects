import "./App.css";
import { Outlet, Route, Routes } from "react-router";
import About from "./components/About";
import Api from "./components/Api/Api";
import ApiDetail from "./components/Api/ApiDetail";
import { ProductList } from "./components/Api/ProductList";
import Contact from "./components/Contact";
import MantineUi from "./components/MantineUi";
import Nav from "./components/Nav";
import { NewsList } from "./components/news/NewsList";
import Settings from "./components/Settings";
import Todo from "./components/Todo";
import Body from "./components/Body";
import AddBlogs from "./pages/blogs/AddBlogs";
import BlogLists from "./pages/blogs/BlogLists";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/admin/Dashboard";
import PrivateRoutes from "./pages/routes/PrivateRoutes";
import UserRoutes from "./pages/routes/UserRoutes";
import UserProfile from "./pages/user/UserProfile";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Nav />
            <Outlet />
          </>
        }
      >
        <Route index element={<Body />} />
        <Route path="about" element={<About />} />
        <Route path="mantine" element={<MantineUi />} />
        <Route path="todo" element={<Todo />} />
        <Route path="addproduct" element={<ProductList />} />
        <Route path="api" element={<Api />} />
        <Route path="product/:id" element={<ApiDetail />} />
        <Route path="news" element={<NewsList />} />
        <Route path="contact" element={<Contact />} />
        <Route path="settings" element={<Settings />} />
        <Route path="blogs" element={<BlogLists />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>

      <Route path="user/dashboard" element={<UserRoutes><UserProfile /></UserRoutes>} />
      <Route path="admin" element={<PrivateRoutes />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="blogs/add" element={<AddBlogs />} />
      </Route>
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  );
}

export default App;