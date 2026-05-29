import {Routes, Route} from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import HomePage from '../../pages/HomePage';
import LoginForm from '../../forms/LoginForm';
import SignupForm from '../../forms/SignupForm';
import PageNotFound from '../../pages/PageNotFound';
import Profile from '../../pages/Profile';
import './App.css'
import searchBusinesses from '../../util/yelp';
import ProtectedRoute from '../ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Navigation />
      <h1>PlateScout</h1>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<LoginForm/>} />
        <Route path='/signup' element={<SignupForm/>} />
        <Route element={<ProtectedRoute/>}>
          <Route path='/profile' element={<Profile/>} />
        </Route>
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </div>
  )
}

export default App
