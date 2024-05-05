import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInSuccess,
  signInStart,
  signInFailure,
} from "../redux/user/userSlice"; // From Redux and work with global state
import { useDispatch, useSelector } from "react-redux";

export default function SignIn() {
  const [formData, setFormData] = useState({});

  const { loading, error: errorMessage } = useSelector((state) => state.user); // Handling the error from redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //1: Get the data
  //2: Submit the data

  const handleChange = (e) => {
    // In base of their ID the values will change and storage
    // Spread operator to save the old values
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    try {
      dispatch(signInStart()); // Using Redux
      const res = await fetch("/api/auth/signin", {
        method: "POST", // The method that we choose before for this req
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Sending the data
      });

      const data = await res.json(); // Convert the data to json for use in the application
      if (data.success === false) {
        // Working with errors
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data)); // This data will be upload in the payload for been used in the entire app
        navigate("/");
      }
    } catch (error) {
      //Error in the client side
      dispatch(signInFailure(data.message));
    }
  };
  return (
    <div className="min-h-screen mt-20 ">
      <div className=" flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1 mx-auto text-center ">
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/sign-up-8044864-6430773.png?f=webp" />
        </div>
        {/* right */}

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="**********"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
