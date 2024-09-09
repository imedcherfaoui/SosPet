import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

// Function to add a user to the Firestore "Users" collection
export const addUserToFirestore = async (uid, userData) => {
  try {
    await setDoc(doc(db, "Users", uid), userData);
    console.log("User added to Firestore:", userData);
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
  }
};

// Function to retrieve a user's data from Firestore
export const getUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "Users", uid));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.error("No such user!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data from Firestore:", error);
    return null;
  }
};

export const updateUserProfile = async (uid, updatedData) => {
  try {
    const userRef = doc(db, "Users", uid);
    await updateDoc(userRef, updatedData);
    console.log("User profile updated:", updatedData);
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
};