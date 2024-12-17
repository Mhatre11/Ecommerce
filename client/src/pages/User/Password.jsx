import React, { useState } from 'react';

const Password = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Implement password change logic
    console.log('Password change submitted');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <form onSubmit={handlePasswordChange} className="max-w-md">
        <div className="mb-4">
          <label className="block mb-2">Current Password</label>
          <input 
            type="password" 
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">New Password</label>
          <input 
            type="password" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Confirm New Password</label>
          <input 
            type="password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required 
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Password;