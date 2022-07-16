import React, { useEffect, useState } from 'react';
import axios from "axios";

const UsersForm = ({ getUsers, userSelected, desSelect }) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (userSelected !== null) {
            setFirstName(userSelected.first_name);
            setLastName(userSelected.last_name);
            setEmail(userSelected.email);
            setBirthday(userSelected.birthday);
            setPassword("**********");
        }
    }, [userSelected]);

    const submit = e => {

        e.preventDefault();

        const newUser = {
            first_name: firstName,
            last_name: lastName,
            email,
            birthday,
            password
        }

        if (userSelected !== null) {
            axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, newUser)
                .then(() => {
                    getUsers()
                    reset();
                    desSelect();
                })
                .catch(error => console.log(error.response));

        } else {
            axios.post("https://users-crud1.herokuapp.com/users/", newUser)
                .then(() => {
                    getUsers();
                    reset();
                })
                .catch(error => console.log(error.response));
        }

    }

    const reset = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setBirthday("");
        setPassword("");
    }

    return (
        <div className='form-container'>
            <form onSubmit={submit}>
                <div>
                    <div>
                        <label htmlFor="first">First Name:</label>
                    </div>
                    <div>
                        <input type="text" id='first' value={firstName} onChange={e => setFirstName(e.target.value)} />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="last">Last Name:</label>
                    </div>
                    <div>
                        <input type="text" id='last' value={lastName} onChange={e => setLastName(e.target.value)} />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="email">Email:</label>
                    </div>
                    <div>
                        <input type="email" id='email' value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="birthday">Birthday:</label>
                    </div>
                    <div>
                        <input type="date" id='birthday' value={birthday} onChange={e => setBirthday(e.target.value)} />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="password">Password:</label>
                    </div>
                    <div className='pass-container'>
                        <div>
                            <input type={isVisible? "text": "password"} id='password' value={password} onChange={e => setPassword(e.target.value)} className="password-input" />
                        </div>
                        <div>
                            <button type='button' className='eye-btn' onClick={() => setIsVisible(!isVisible)}><i className="fa-regular fa-eye"></i></button>
                        </div>
                    </div>
                </div>
                <button className='create btn'><i className="fa-regular fa-square-plus"></i> {userSelected !== null ? "Update" : "Create"}</button>
            </form>
        </div>
    );
};

export default UsersForm;