import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//context
import { AuthProvider } from './contexts/AuthContext';

//components
import NavBar from './components/NavBar/NavBar';

//pages
import Home from './pages/Home/Home';
import Login from './modals/Login/Login';
import Register from './modals/Register/Register';
import Profile from './pages/Profile/Profile';
import MyPets from './pages/MyPets/MyPets';
import AddPet from './pages/AddPet/AddPet';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="container">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/pet/mypets" element={<MyPets />} />
            <Route path="/pet/add" element={<AddPet />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
