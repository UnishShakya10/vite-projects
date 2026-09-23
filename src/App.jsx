import { Route, Routes } from "react-router"
import Body from "./components/Body"
import Nav from "./components/Nav"
import About from "./components/About"
import Contact from "./components/Contact"
import Settings from "./components/Settings"
import Todo from "./components/Todo"
import { Tasks } from "./components/Tasks"
import { ProductList } from "./components/Api/ProductList"
import NewsList from "./components/news/NewsList"
import Api from "./components/Api/Api"
import ApiDetail from "./components/Api/ApiDetail"
import MantineUi from "./components/MantineUi"
import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"
import AddBlogs from "./pages/blogs/AddBlogs"
import BlogLists from "./pages/blogs/BlogLists"
import Dashboard from "./pages/admin/Dashboard"
import PrivateRoutes from "./pages/routes/PrivateRoutes"



function App(){
return(
  <>
 
    <Nav/>
    
      <Routes>
          <Route path="/" element={<Body/>}/>

          <Route path="/ui" element={<MantineUi/>}/>

          <Route path ="/contact" element={<Contact/>}/>

          <Route path ="/about" element={<About/>}/>

          <Route path ="/settings" element={<Settings/>}/>
        
          <Route path="/todo" element={<Todo/>}/>

          <Route path="/tasks" element={<Tasks/>}/>

          <Route path="/products" element={<ProductList/>}/>

          <Route path="/news" element={<NewsList/>}/>

          <Route path="/api" element={<Api/>}/>

         <Route path="/product/:id" element={<ApiDetail/>}/>

          <Route path="/login" element={<Login/>}/>

          <Route path="/signup" element={<SignUp/>}/>

           <Route path="/add-blog" element={<PrivateRoutes><AddBlogs /></PrivateRoutes>} />

           <Route path="/admin/blogs/add" element={<PrivateRoutes><AddBlogs /></PrivateRoutes>} />

           <Route path="/blogs" element={<BlogLists />} />

           <Route path="/admin/dashboard" element={<PrivateRoutes><Dashboard /></PrivateRoutes>} />

      </Routes>
   
  </>
)
}
export default App