import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { MainToasts } from "./features/Toasts.Service";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" Component={Dashboard} />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
          </Routes>
        </div>
      </Router>

      <MainToasts />
    </>
  );
}

export default App;
