import React, { useState } from "react";
import { Camera, Pencil } from "lucide-react";
import { Button } from "../../../../components/ui/button";

const ProfileHeader = ({
  profile_pic,
  userName,
  onProfilePicChange,
  onUserNameChange,
  errors,
  onEditModeToggle,
  editMode,
  profileIcons,
}) => {
  const [toggleInput, setToggleInput] = useState(false);
  return (
    <div className="p-6 h-80 w-80 bg-orange-200 rounded-full shadow-md flex flex-col items-center relative group">
      <img
        src={profile_pic}
        alt="Profile Icon"
        className="w-24 h-24 rounded-full mb-4"
      />
      <Camera
        className="relative bottom-10 w-8 h-8 text-gray-600 p-2 bg-white rounded-full shadow-lg cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onEditModeToggle}
      />
      {editMode && (
        <div className="absolute top-16 flex flex-wrap gap-4 bg-white p-2 rounded-md shadow-lg">
          {Object.keys(profileIcons).map((key) => (
            <img
              key={key}
              src={profileIcons[key]}
              alt={key}
              className={`w-16 h-16 rounded-full cursor-pointer border-2 ${
                profile_pic === profileIcons[key]
                  ? "border-orange-500"
                  : "border-transparent"
              }`}
              onClick={() => {
                onProfilePicChange(profileIcons[key]);
                onEditModeToggle();
              }}
            />
          ))}
        </div>
      )}
      {toggleInput ? (
        <div className="flex justify-center items-center gap-3">
          <input
            className="p-3 border border-gray-300 rounded-full w-full focus:outline-none focus:border-orange-500"
            type="text"
            name="userName"
            value={userName}
            onChange={onUserNameChange}
            placeholder="Your username"
            size={10}
          />
          <Button
            variant="destructive"
            className="rounded-full"
            onClick={() => setToggleInput(false)}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 cursor-pointer">
          <h2 className="text-2xl font-bold text-gray-800 cursor-pointer">
            {userName}
          </h2>
          <Pencil
            className="text-gray-600 cursor-pointer"
            size={15}
            onClick={() => setToggleInput(true)}
          />
        </div>
      )}
      {errors.userName && (
        <p className="text-red-500 mt-2">{errors.userName}</p>
      )}
    </div>
  );
};

export default ProfileHeader;
