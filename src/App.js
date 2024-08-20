import { Route, Routes } from "react-router";
import Login from "./screens/login";
import Home from "./screens/home";
import SignUp from "../src/screens/signUp";
import PageNotFound from "./screens/404PageNotFound";
import EventDetailsPage from "./screens/EventDetailsPage";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path='/EventDetails/:id' element={<EventDetailsPage />} />
    </Routes>
  );
}

export default App;
