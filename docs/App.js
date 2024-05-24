import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './HomePage';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import PersonalCabinet from './PersonalCabinet';
import UserInfo from './UserInfo';
import UserEvents from './UserEvents';
import CreateEventForm from './CreateEventForm';
import EditPage from "./EditPage";
import DeleteEvent from "./DeleteEvent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} /> {/* Додано шлях для SignInPage */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/personalcabinet" element={<PersonalCabinet />} />
        <Route path="/userevents" element={<UserEvents />} />
        <Route path="/createevent" element={<CreateEventForm />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/editprofile" element={<EditPage/>} />
        <Route path="/deleteevent" element={<DeleteEvent/>} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;
