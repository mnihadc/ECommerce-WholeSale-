import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  signoutUserStart,
  signoutUserSuccess,
  signoutUserFailure,
} from "../Redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaSignOutAlt, FaTimes, FaCheck, FaList } from "react-icons/fa";
import { ClipLoader } from "react-spinners"; // Import a loading spinner

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    mobile: "",
    gender: "",
    age: "",
    createdAt: "",
    selectedAddress: {
      companyName: "",
      purchaseManagerName: "",
      phoneNumber: "",
      city: "",
      governorate: "",
      streetAddress: "",
      landmark: "",
      googleMapLocation: "",
      deliveryInstructions: "",
      preferredDeliveryTime: "Morning",
      paymentMethod: "Cash",
      adminVerified: false,
    },
  });

  const [prevUserData, setPrevUserData] = useState(null);
  const [prevAddressData, setPrevAddressData] = useState(null);
  const [editUserMode, setEditUserMode] = useState(false);
  const [editAddressMode, setEditAddressMode] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await fetch("/api/auth/profile", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        Swal.fire("Error", "Failed to fetch profile!", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to fetch profile!", "error", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      selectedAddress: {
        ...prevData.selectedAddress,
        [name]: value,
      },
    }));
  };

  const handleUserEdit = () => {
    setPrevUserData(userData);
    setEditUserMode(true);
  };

  const handleAddressEdit = () => {
    setPrevAddressData(userData.selectedAddress);
    setEditAddressMode(true);
  };

  const handleUserCancel = () => {
    setUserData(prevUserData);
    setEditUserMode(false);
  };

  const handleAddressCancel = () => {
    setUserData((prevData) => ({
      ...prevData,
      selectedAddress: prevAddressData,
    }));
    setEditAddressMode(false);
  };

  const handleUserSave = async (e) => {
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
        setUserData(updatedData); // Update state with the new data
        setEditUserMode(false);
        Swal.fire("Success", "Profile updated successfully!", "success");
      } else {
        Swal.fire("Error", "Failed to update profile!", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong!", "error", error);
    }
  };

  const handleAddressSave = async (e) => {
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
        setUserData(updatedData); // Update state with the new data
        setEditAddressMode(false);
        Swal.fire("Success", "Address updated successfully!", "success");
      } else {
        Swal.fire("Error", "Failed to update address!", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong!", "error", error);
    }
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
            localStorage.removeItem("token");
            Swal.fire("Logged Out", "You have been logged out.", "success");

            setTimeout(() => {
              navigate("/login");
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

  const handleViewAllAddresses = () => {
    // Navigate to a page or open a modal to display all addresses
    Swal.fire({
      title: "All Addresses",
      text: "This feature is under development.",
      icon: "info",
    });
  };

  // Display loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-800 flex justify-center items-center">
        <ClipLoader color="#ffffff" size={50} /> {/* Loading spinner */}
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-7 bg-gray-800 text-white p-2 md:p-8 flex justify-center items-center">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {/* Profile Card */}
        <div className="bg-gray-700 p-4 md:p-8 rounded-lg flex flex-col items-center shadow-lg">
          <img
            src={
              currentUser?.avatar ||
              "https://bootdey.com/img/Content/avatar/avatar7.png"
            }
            alt="User"
            className="rounded-full w-24 h-24 md:w-32 md:h-32 mb-4 border-4 border-gray-600"
          />
          <h4 className="text-xl md:text-2xl font-semibold">
            {userData.username}
          </h4>
          <p className="text-gray-400 text-sm md:text-base">{userData.email}</p>
        </div>

        {/* Profile Info */}
        <div className="md:col-span-2 bg-gray-700 p-4 md:p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl md:text-2xl font-semibold">
              Profile Information
            </h3>
            <button
              type="button"
              className="text-blue-500 hover:text-blue-400"
              onClick={handleUserEdit}
            >
              <FaEdit size={24} />
            </button>
          </div>
          <form onSubmit={handleUserSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  name="username"
                  className="w-full p-2 md:p-3 bg-gray-700 rounded-lg border border-gray-600"
                  value={userData.username}
                  onChange={handleChange}
                  disabled={!editUserMode}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-2 md:p-3 bg-gray-700 rounded-lg border border-gray-600"
                  value={userData.email}
                  onChange={handleChange}
                  disabled={!editUserMode}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  className="w-full p-2 md:p-3 bg-gray-700 rounded-lg border border-gray-600"
                  value={userData.mobile}
                  onChange={handleChange}
                  disabled={!editUserMode}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Created At</label>
                <input
                  type="text"
                  className="w-full p-2 md:p-3 bg-gray-700 rounded-lg border border-gray-600"
                  value={new Date(userData.createdAt).toLocaleDateString()}
                  disabled
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between gap-2">
              {!editUserMode ? (
                <button
                  type="button"
                  className="bg-blue-600 px-4 py-2 rounded-lg flex items-center gap-2"
                  onClick={handleUserEdit}
                >
                  <FaEdit size={18} />
                  Edit
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    className="bg-green-600 px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <FaCheck size={18} />
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 px-4 py-2 rounded-lg flex items-center gap-2"
                    onClick={handleUserCancel}
                  >
                    <FaTimes size={18} />
                    Cancel
                  </button>
                </>
              )}
              <button
                type="button"
                className="bg-red-600 px-4 py-2 rounded-lg flex items-center gap-2"
                onClick={handleLogout}
              >
                <FaSignOutAlt size={18} />
                Logout
              </button>
            </div>
          </form>
        </div>

        {/* Delivery Address */}
        <div className="md:col-span-3 bg-gray-700 p-4 md:p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl md:text-2xl font-semibold">
              Delivery Address
            </h3>
            <div className="flex gap-4">
              <button
                type="button"
                className="text-blue-500 hover:text-blue-400"
                onClick={handleAddressEdit}
              >
                <FaEdit size={24} />
              </button>
              <button
                type="button"
                className="text-blue-500 hover:text-blue-400"
                onClick={handleViewAllAddresses}
              >
                <FaList size={24} />
              </button>
            </div>
          </div>
          <form onSubmit={handleAddressSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {[
                { label: "Company Name", name: "companyName" },
                { label: "Manager Name", name: "purchaseManagerName" },
                { label: "Phone Number", name: "phoneNumber" },
                { label: "City", name: "city" },
                { label: "Governorate", name: "governorate" },
                { label: "Street Address", name: "streetAddress" },
                { label: "Landmark", name: "landmark" },
                { label: "Google Map Location", name: "googleMapLocation" },
                {
                  label: "Delivery Instructions",
                  name: "deliveryInstructions",
                },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    className="w-full p-2 md:p-3 bg-gray-700 rounded-lg border border-gray-600"
                    value={userData.selectedAddress[field.name] || ""}
                    onChange={handleAddressChange}
                    disabled={!editAddressMode}
                  />
                </div>
              ))}

              {/* Preferred Delivery Time */}
              <div>
                <label className="block text-sm font-medium">
                  Preferred Delivery Time
                </label>
                <select
                  name="preferredDeliveryTime"
                  className="w-full p-2 md:p-3 bg-gray-700 rounded-lg border border-gray-600"
                  value={
                    userData.selectedAddress.preferredDeliveryTime || "Morning"
                  }
                  onChange={handleAddressChange}
                  disabled={!editAddressMode}
                >
                  {["Morning", "Afternoon", "Evening"].map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium">
                  Payment Method
                </label>
                <select
                  name="paymentMethod"
                  className="w-full p-2 md:p-3 bg-gray-700 rounded-lg border border-gray-600"
                  value={userData.selectedAddress.paymentMethod || "Cash"}
                  onChange={handleAddressChange}
                  disabled={!editAddressMode}
                >
                  {["Cash", "Bank Transfer", "Online Payment"].map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>

              {/* Admin Verified */}
              <div className="flex items-center gap-2">
                <label className="block text-sm font-medium">
                  Admin Verified
                </label>
                {userData.selectedAddress.adminVerified ? (
                  <FaCheck className="text-green-500" size={24} />
                ) : (
                  <FaTimes className="text-red-500" size={24} />
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-between gap-2">
              {!editAddressMode ? (
                <button
                  type="button"
                  className="bg-blue-600 px-4 py-2 rounded-lg flex items-center gap-2"
                  onClick={handleAddressEdit}
                >
                  <FaEdit size={18} />
                  Edit
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    className="bg-green-600 px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <FaCheck size={18} />
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 px-4 py-2 rounded-lg flex items-center gap-2"
                    onClick={handleAddressCancel}
                  >
                    <FaTimes size={18} />
                    Cancel
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
