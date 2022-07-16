import './App.css'
import UsersForm from './Components/UsersForm'
import UsersList from './Components/UsersList'
import axios from "axios"
import React, { useEffect, useState } from 'react';

function App() {

  const [users, setUsers] = useState([]);
  const [ userSelected, setUserSelected ] = useState(null);

    useEffect(() => {
        axios.get(`https://users-crud1.herokuapp.com/users/`)
            .then(res => setUsers(res.data))
            .catch(error => console.log(error.response))
    }, []);

  const getUsers = () => {
    axios.get(`https://users-crud1.herokuapp.com/users/`)
      .then(res => setUsers(res.data))
      .catch(error => console.log(error.response))
  }

  const selectUser = (user) => {
    setUserSelected(user);
  }

  const desSelect = () => {
    setUserSelected(null);
  }

  const deleteUser = (id) => {
    axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
      .then(()=>{
        getUsers()
      })
      .catch(error => console.log(error.response));
  }


  return (
    <section>
      <UsersForm getUsers={getUsers} userSelected={userSelected} desSelect={desSelect}/>
      <UsersList users={users} selectUser={selectUser} deleteUser={deleteUser}/>
    </section>
  )
}

export default App
