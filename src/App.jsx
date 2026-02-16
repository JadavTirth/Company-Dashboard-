import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import Event from './pages/Events';
import InternList from './pages/InternList';
import InternAdd from './pages/InternAdd';
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EventEdit';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/internList" element={<InternList />} />
        <Route path="/event" element={<Event />} />
        <Route path="/intern-add" element={<InternAdd/>} />
        <Route path="/create-event" element={<CreateEvent/>} />
        <Route path="/edit-event/:id" element={<EditEvent />} />
      </Routes>
    </div>
  );
}

export default App;
