

const UsersList = ({ users, selectUser, deleteUser }) => {

    return (
        <div className="card-section">
            {users.map(user => (
                <div key={user.id} className='card'>
                    <div>
                        <strong><p>First Name:</p></strong>
                        <p>{user.first_name}</p>
                        <strong><p>Last Name:</p></strong>
                        <p>{user.last_name}</p>
                        <strong><p>Email:</p></strong>
                        <p>{user.email}</p>
                        <strong><p>Birthday:</p></strong>
                        <p>{user.birthday}</p>
                        <div className="btn-cont">
                            <button type="button" className="update btn" onClick={()=>selectUser(user)}><i className="fa-solid fa-arrows-rotate"></i> Update</button>
                            <button type="button" className="delete btn" onClick={() => deleteUser(user.id)}><i className="fa-solid fa-trash-can"></i> Delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UsersList;