import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api'; 
import { useNavigate } from 'react-router-dom';


const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', role: '', status: 'Active' });
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const canAdd = userRole === "Admin" || userRole === "Editor";
  const canEdit = userRole === "Admin" || userRole === "Editor";
  const canDelete = userRole === "Admin";


  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleLogout =()=>{
    localStorage.removeItem('userRole');
    sessionStorage.clear();
    navigate('/')
  };


  const handleAddUser = async () => {
    if (!newUser.name || !newUser.role) {
      alert('Name and Role are required!');
      return;
    }

    const addedUser = await createUser(newUser);
    if (addedUser) {
      setUsers([...users, addedUser]);
      setNewUser({ name: '', role: '', status: '' });
    }
  };


  const handleUpdateUser = async (id) => {
    const updatedUser = await updateUser(id, editingUser);
    if (updatedUser) {
      setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
      setEditingUser(null);
    }
  };


  const handleDeleteUser = async (id) => {
    const deletedId = await deleteUser(id);
    if (deletedId) {
      setUsers(users.filter((user) => user.id !== deletedId));
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mt-2">
        <h1 className="mx-auto mt-4 text-warning">Employee Management</h1>
        <button className='btn btn-warning' onClick={handleLogout}>Logout</button>
      </div>


      {canAdd && (
      <div className="card mt-4">
        <div className="card-header">Add New User</div>
        <div className="card-body">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="form-control mb-2"
          />
          <input
            type="text"
            placeholder="Role"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="form-control mb-2"
          />
          <select
            value={newUser.status}
            onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
            className="form-control mb-2"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button className="btn btn-primary" onClick={handleAddUser} disabled={!canAdd}>
            Add User
          </button>
        </div>
      </div>
      )}


      <h2 className="mt-4 text-warning">Employee List</h2>
      <table className="table table-bordered mt-2">
        <thead>
          <tr>
            <th className='text-warning'>Name</th>
            <th className='text-warning'>Role</th>
            <th className='text-warning'>Status</th>
            {userRole !== "Viewer" && <th className='text-warning'>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {editingUser && editingUser.id === user.id ? (
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                    className="form-control"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingUser && editingUser.id === user.id ? (
                  <input
                    type="text"
                    value={editingUser.role}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, role: e.target.value })
                    }
                    className="form-control"
                  />
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editingUser && editingUser.id === user.id ? (
                  <select
                    value={editingUser.status}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, status: e.target.value })
                    }
                    className="form-control"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                ) : (
                  user.status
                )}
              </td>
              {userRole !== "Viewer" && (
              <td>
                {editingUser && editingUser.id === user.id ? (
                  <>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleUpdateUser(user.id)} disabled={!canEdit}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm ms-2"
                      onClick={() => setEditingUser(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                  {canEdit && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => setEditingUser(user)}
                    >
                    <i class="fa-solid fa-pen-to-square fa-xl" style={{color: "#f8f9fc"}}></i>
                    </button>
                  )}
                  {canDelete && (
                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                     <i class="fa-solid fa-trash fa-xl" style={{color: "#f8f9fc"}}></i>
                    </button>
                  )}
                  </>
                )}
              </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;