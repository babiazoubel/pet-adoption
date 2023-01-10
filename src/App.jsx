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
import EditPet from './pages/EditPet/EditPet';
import PetDetails from './pages/PetDetails/PetDetails';
import MyAdoptions from './pages/MyAdoptions/MyAdoptions';

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
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/pet/mypets" element={<MyPets />} />
            <Route path="/pet/add" element={<AddPet />} />
            <Route path="/pet/edit/:id" element={<EditPet />} />
            <Route path="/pet/:id" element={<PetDetails />} />
            <Route path="/pet/myadoptions/" element={<MyAdoptions />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
