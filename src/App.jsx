import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Event from "./pages/Events";
import InternList from "./pages/InternList";
import InternAdd from "./pages/InternAdd";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EventEdit";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <div>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/internList"
          element={
            <ProtectedRoute>
              <InternList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/event"
          element={
            <ProtectedRoute>
              <Event />
            </ProtectedRoute>
          }
        />

        <Route
          path="/intern-add"
          element={
            <ProtectedRoute>
              <InternAdd />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-event"
          element={
            <ProtectedRoute>
              <CreateEvent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-event/:id"
          element={
            <ProtectedRoute>
              <EditEvent />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
