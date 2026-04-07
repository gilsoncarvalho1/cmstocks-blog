import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BlogHome from "./pages/BlogHome";
import BlogPost from "./pages/BlogPost";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <main className="max-w-[1100px] mx-auto px-5 pt-10">
          <Routes>
            <Route path="/" element={<BlogHome />} />
            <Route path="/post/:slug" element={<BlogPost />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;