import './App.css';
import Header from './components/Header/Header';
import Edit from './pages/Edit/Edit';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Portal, PortalContent } from './portal';
function App() {
  return (
    <>
      {/* <Portal >
        <PortalContent></PortalContent>
      </Portal> */}
      <Header />

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/userprofile/:id' element={<Profile />} />





      </Routes>

    </>
  );
}

export default App;
