import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import NavBar from "./components/navbar/NavBar"

const Router = () => {
  return (
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
  </BrowserRouter>  
  )
}

export default Router
