import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { useAuth } from "../../../services/userContext";
import Title from "../../Auth/components/Title";
import {
  getUserData,
  updateUserProfile,
} from "../../../services/users.services";
import ProfileHeader from "./components/ProfileHeader";
import ProfileDetails from "./components/ProfileDetails";
import PetSection from "./components/PetSection";
import dog from "../../../images/dog.png";
import cat from "../../../images/cat.png";
import bird from "../../../images/bird.png";
import rabbit from "../../../images/rabbit.png";
import fish from "../../../images/fish.png";
import profile1dog from "../../../images/profile1dog.png";
import profile2cat from "../../../images/profile2cat.png";
import profile3bird from "../../../images/profile3bird.png";
import profile4rabbit from "../../../images/profile4rabbit.png";
import profile5fish from "../../../images/profile5fish.png";
import { useSnackbar } from "notistack";

const Profile = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    userName: "",
    birthday: "",
    pets: [{ name: "", kind: "", age: "", weight: "" }],
    profile_pic: dog,
  });
  const [errors, setErrors] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const profileIcons = {
    dog: profile1dog,
    cat: profile2cat,
    bird: profile3bird,
    rabbit: profile4rabbit,
    fish: profile5fish,
  };
  const petImages = {
    dog,
    cat,
    bird,
    rabbit,
    fish,
  };
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (currentUser) {
      getUserData(currentUser.uid).then((data) => {
        setUserData(data);
        setFormData({
          userName: data?.userName || "",
          birthday: data?.birthday || "",
          pets:
            data?.pets?.length > 0
              ? data.pets
              : [{ name: "", kind: "", age: "", weight: "" }],
          profile_pic: data?.profile_pic || "path_to_default_profile_pic",
        });
        setIsChanged(false);
      });
    }
  }, [currentUser]);

  const validateInput = (name, value) => {
    let error = "";
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    switch (name) {
      case "userName":
        if (!value) {
          error = "Username cannot be empty";
        } else if (specialCharRegex.test(value)) {
          error = "Username must not contain special characters";
        }
        break;
      case "name":
        if (!value) {
          error = "pet name cannot be empty";
        } else if (specialCharRegex.test(value)) {
          error = "pet name must not contain special characters";
        }
        break;
      case "kind":
        if (!value) {
          error = "pet kind cannot be empty";
        } else if (specialCharRegex.test(value)) {
          error = "pet kind must not contain special characters";
        }
        break;
      case "age":
      case "weight":
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const error = validateInput(name, value);
    setErrors({ ...errors, [name]: error });
    setFormData({ ...formData, [name]: value });
    setIsChanged(true);
  };

  const handlePetChange = (index, e) => {
    const { name, value } = e.target;
    const newPets = [...formData.pets];
    const error = validateInput(name, value);
    newPets[index][name] = value;
    setErrors({ ...errors, [index]: error });
    setFormData({ ...formData, pets: newPets });
    setIsChanged(true);
  };

  const addPet = () => {
    if (formData.pets.length < 3) {
      setFormData({
        ...formData,
        pets: [...formData.pets, { name: "", kind: "", age: "", weight: "" }],
      });
      setIsChanged(true);
      enqueueSnackbar(
        `
        Pet added successfully! Please remember to save changes.
       `,
        {
          variant: "success",
          anchorOrigin: { vertical: "bottom", horizontal: "center" },
          autoHideDuration: 3000,
          style: { fontSize: "1.6rem" },
        }
      );
    }
  };

  const removePet = (index) => {
    const newPets = formData.pets.filter((_, i) => i !== index);
    setFormData({ ...formData, pets: newPets });
    setIsChanged(true);
    enqueueSnackbar(
      `
        Pet removed successfully! Please remember to save changes.
       `,
      {
        variant: "success",
        anchorOrigin: { vertical: "bottom", horizontal: "center" },
        autoHideDuration: 3000,
        style: { fontSize: "1.6rem" },
      }
    );
  };

  const handleProfileIconChange = (icon) => {
    setFormData({ ...formData, profile_pic: icon });
    setIsChanged(true);
    enqueueSnackbar(
      `
       Profile icon updated successfully! Please remember to save changes.
       `,
      {
        variant: "success",
        anchorOrigin: { vertical: "bottom", horizontal: "center" },
        autoHideDuration: 3000,
        style: { fontSize: "1.6rem" },
      }
    );
  };

  const handleSubmit = async () => {
    let valid = true;

    const userNameError = validateInput("userName", formData.userName);
    if (userNameError) {
      valid = false;
      setErrors({ ...errors, userName: userNameError });
    }

    const validatedPets = formData.pets.map((pet) => {
      const petErrors = {
        name: validateInput("name", pet.name),
        kind: validateInput("kind", pet.kind),
        age: validateInput("age", pet.age),
        weight: validateInput("weight", pet.weight),
      };

      if (
        petErrors.name ||
        petErrors.kind ||
        petErrors.age ||
        petErrors.weight
      ) {
        valid = false;
      }

      return {
        name: pet.name.trim(),
        kind: pet.kind.trim(),
        age: pet.age.trim(),
        weight: pet.weight.trim(),
      };
    });

    setFormData({ ...formData, pets: validatedPets });

    if (!valid) {
      return alert("Please correct the errors before saving.");
    }

    const filteredPets = validatedPets.filter(
      (pet) => pet.name && pet.kind && pet.age && pet.weight
    );

    try {
      await updateUserProfile(currentUser.uid, {
        ...formData,
        pets: filteredPets,
        profile_pic: formData.profile_pic,
      });
      setIsChanged(false);
    } catch (error) {
      console.error("Failed to update profile", error.message);
      alert("Failed to update profile: " + error.message);
    }
    enqueueSnackbar(
      `
        Profile updated successfully!
       `,
      {
        variant: "success",
        anchorOrigin: { vertical: "bottom", horizontal: "center" },
        autoHideDuration: 3000,
        style: { fontSize: "1.6rem" },
      }
    );
    window.location.reload();
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-orange-700 to-yellow-600 px-4 pt-12 pb-8 md:px-6 lg:px-8">
      <div className="bg-white/80 w-full max-w-6xl p-8 rounded-lg shadow-lg relative">
        <Title className="text-4xl font-bold text-gray-800 mb-6 text-center">
          {userData.userName}'s Profile
        </Title>
        <div className="flex flex-col gap-6 items-center">
          <ProfileHeader
            profile_pic={formData.profile_pic}
            userName={formData.userName}
            onProfilePicChange={handleProfileIconChange}
            onUserNameChange={handleInputChange}
            errors={errors}
            onEditModeToggle={() => setEditMode(!editMode)}
            editMode={editMode}
            profileIcons={profileIcons}
          />
          <ProfileDetails
            email={userData.email}
            birthday={formData.birthday}
            onBirthdayChange={handleInputChange}
          />
          <PetSection
            pets={formData.pets}
            onPetChange={handlePetChange}
            onAddPet={addPet}
            onRemovePet={removePet}
            petImages={petImages}
            errors={errors}
          />
          <Button
            variant="sospet"
            className="w-full py-3 mt-6"
            onClick={handleSubmit}
            disabled={!isChanged}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
