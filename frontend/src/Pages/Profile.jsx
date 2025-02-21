import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  signoutUserStart,
  signoutUserSuccess,
  signoutUserFailure,
} from "../Redux/user/userSlice";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    mobile: "",
    gender: "",
    age: "",
    createdAt: "",
  });

  const [prevUserData, setPrevUserData] = useState(null); // Store previous data
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetch("/api/auth/profile", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch(() => Swal.fire("Error", "Failed to fetch profile!", "error"));
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData);
        setEditMode(false);
        Swal.fire("Success", "Profile updated successfully!", "success");
      } else {
        Swal.fire("Error", "Failed to update profile!", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong!", "error", error);
    }
  };

  const handleEdit = () => {
    setPrevUserData(userData); // Store current data before editing
    setEditMode(true);
    Swal.fire("Info", "You can now edit your profile.", "info");
  };

  const handleCancel = () => {
    setUserData(prevUserData); // Restore previous data
    setEditMode(false);
  };

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log out!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          dispatch(signoutUserStart());

          const response = await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
          });

          if (response.ok) {
            dispatch(signoutUserSuccess());
            localStorage.removeItem("token"); // Clear stored token
            Swal.fire("Logged Out", "You have been logged out.", "success");

            setTimeout(() => {
              window.location.href = "/login"; // Redirect after 1.5 seconds
            }, 1500);
          } else {
            dispatch(signoutUserFailure("Logout failed!"));
            Swal.fire("Error", "Logout failed!", "error");
          }
        } catch (error) {
          dispatch(signoutUserFailure(error.message));
          Swal.fire("Error", "Something went wrong!", "error");
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-8 flex justify-center items-center pt-13">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="bg-gray-700 p-8 rounded-lg flex flex-col items-center shadow-lg">
          <img
            src={
              currentUser?.avatar ||
              "https://bootdey.com/img/Content/avatar/avatar7.png"
            }
            alt="User"
            className="rounded-full w-32 h-32 mb-4 border-4 border-gray-600"
          />
          <h4 className="text-2xl font-semibold">{userData.username}</h4>
          <p className="text-gray-400">{userData.email}</p>
        </div>

        {/* Edit Profile Form */}
        <div className="md:col-span-2 bg-gray-700 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">
            Profile Information
          </h3>
          <form onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  name="username"
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600"
                  value={userData.username}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600"
                  value={userData.email}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600"
                  value={userData.mobile}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Created At</label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600"
                  value={new Date(userData.createdAt).toLocaleDateString()}
                  disabled
                />
              </div>
            </div>
            <div className="mt-6 flex justify-between gap-2">
              {!editMode ? (
                <button
                  type="button"
                  className="bg-blue-600 px-6 py-2 rounded-lg shadow-md hover:bg-blue-500"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    className="bg-green-600 px-6 py-2 rounded-lg shadow-md hover:bg-green-500"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 px-6 py-2 rounded-lg shadow-md hover:bg-gray-400"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </>
              )}
              <button
                type="button"
                className="bg-red-600 px-4 py-2 rounded-lg shadow-md hover:bg-red-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
