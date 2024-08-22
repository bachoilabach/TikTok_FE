import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import ForYou from "./pages/ForYou";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route index element={<ForYou/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}