import { Routes, Route } from 'react-router-dom';
import './App.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Login from './screens/Login';
import Register from './screens/Register';
import QuizList from './screens/QuizList';
import Quiz from './screens/Quiz';
import Home from './screens/Home';
import UserDetails from './screens/UserDetails';
import SkillList from './screens/SkillList';
import UserList from './screens/UserList';
import CreatePlacement from './screens/CreatePlacement';
import UserSearchResult from './screens/UserSearchResult';
import AddQuiz from './screens/AddQuiz';
import MyQuizzes from './screens/MyQuizzes';
import { checkLoginState } from './actions/authActions';
import PlacementDetails from './screens/PlacementDetails';
import EditPlacement from './screens/EditPlacement';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import RequestSkill from './screens/RequestSkill';
import ViewUser from './screens/ViewUser';
import RequestAuth from './screens/RequestAuth';
import TraineeSubmission from './screens/TraineeSubmission';
import TraineeSubmissions from './screens/TraineeSubmissions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLoginState());
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quizList" element={<QuizList />} />
        <Route path="/quizList/:id" element={<Quiz />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/userSearchResult" element={<UserSearchResult />} />
        <Route path="/skillList" element={<SkillList />} />
        <Route path="/userList" element={<UserList />} />
        <Route path="/createPlacement" element={<CreatePlacement />} />
        <Route path="/placement/:placementId" element={<PlacementDetails />} />
        <Route path="/add-quiz" element={<AddQuiz />} />
        <Route path="/requestSkill" element={<RequestSkill />} />
        <Route path="/requestAuth" element={<RequestAuth />} />
        <Route path="/placement/:placementId/edit" element={<EditPlacement />} />
        <Route path="/view-trainee/:id" element={<ViewUser />} />
        <Route path="/my-quizzes" element={<MyQuizzes />} />
        <Route path="/trainee-submissions" element={<TraineeSubmissions />} />
        <Route path="/trainee-submission/:resultId" element={<TraineeSubmission />} />
      </Routes>
    </div>
  );
}

export default App;
