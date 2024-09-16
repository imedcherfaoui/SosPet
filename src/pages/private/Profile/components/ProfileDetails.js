import React from "react";

const ProfileDetails = ({ email, birthday, onBirthdayChange }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="p-6 bg-orange-50 rounded-md shadow-md">
        <label className="text-2xl font-semibold text-gray-700">Email:</label>
        <p className="text-gray-600">{email}</p>
      </div>
      <div className="p-6 bg-orange-50 rounded-md shadow-md">
        <label className="text-2xl font-semibold text-gray-700">
          Birthday:
        </label>
        <input
          className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:border-orange-500"
          type="date"
          name="birthday"
          value={birthday}
          onChange={onBirthdayChange}
        />
      </div>
    </div>
  );
};

export default ProfileDetails;
