import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import CreateItem from "./pages/CreateItem";
import EditItem from "./pages/EditItem";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
                <Route path="/admin/create" element={<ProtectedRoute><CreateItem /></ProtectedRoute>} />
                <Route path="/admin/edit/:id" element={<ProtectedRoute><EditItem /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;