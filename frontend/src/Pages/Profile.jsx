import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
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
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetch("/api/auth/profile", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch(() => toast.error("Failed to fetch profile!"));
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
        toast.success("Profile updated successfully!");
        setEditMode(false);
      } else {
        toast.error("Failed to update profile!");
      }
    } catch (error) {
      toast.error("Something went wrong!", error);
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(signoutUserStart());

      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        dispatch(signoutUserSuccess());
        localStorage.removeItem("token");
        toast.success("Logged out successfully!");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        dispatch(signoutUserFailure("Logout failed!"));
        toast.error("Logout failed!");
      }
    } catch (error) {
      dispatch(signoutUserFailure(error.message));
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-8 flex justify-center items-center pt-13">
      <Toaster position="top-right" />
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
                  onClick={() => {
                    toast.info("You can now edit your profile.");
                    setEditMode(true);
                  }}
                >
                  Edit
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-600 px-6 py-2 rounded-lg shadow-md hover:bg-green-500"
                >
                  Save Changes
                </button>
              )}
              <button
                type="button"
                className="bg-amber-500 px-4 py-2 rounded"
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
