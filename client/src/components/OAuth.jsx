import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" }); // This make that always when you try to login ask for your account

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      // Saving the information to the backend

      const res = await fetch("/api/auth/google", {
        // Making the res
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName, // Name
          email: resultsFromGoogle.user.displayEmail,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data)); // This data will be upload in the payload for been used in the entire app
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
}
