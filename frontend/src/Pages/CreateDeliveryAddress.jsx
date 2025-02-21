import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const governorates = [
  "Muscat",
  "Dhofar",
  "Musandam",
  "Al Buraimi",
  "Ad Dakhiliyah",
  "Adh Dhahirah",
  "Al Batinah North",
  "Al Batinah South",
  "Al Sharqiyah North",
  "Al Sharqiyah South",
  "Al Wusta",
];

const CreateDeliveryAddress = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const formik = useFormik({
    initialValues: {
      companyName: "",
      purchaseManagerName: "",
      phoneNumber: "",
      governorate: "",
      city: "",
      streetAddress: "",
      landmark: "",
      googleMapLocation: "",
      deliveryInstructions: "",
      preferredDeliveryTime: "Morning",
      paymentMethod: "",
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required("Company Name is required"),
      purchaseManagerName: Yup.string().required(
        "Purchase Manager Name is required"
      ),
      phoneNumber: Yup.string().required("Phone Number is required"),
      governorate: Yup.string().required("Governorate is required"),
      city: Yup.string().required("City is required"),
      streetAddress: Yup.string().required("Street Address is required"),
      paymentMethod: Yup.string().required("Payment Method is required"),
      googleMapLocation: Yup.string().url("Enter a valid Google Maps URL"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      setMessage({ type: "", text: "" });

      try {
        const response = await axios.post("/api/auth/delivery-address", values);
        setMessage({
          type: "success",
          text: "Delivery Address Created Successfully!",
        });
        resetForm();
      } catch (error) {
        setMessage({
          type: "error",
          text: "Failed to create delivery address. Please try again.",
        });
        console.error("Error creating delivery address", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="max-w-3xl mx-auto bg-gray-900 text-white shadow-lg rounded-lg p-8 mt-5">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Create Delivery Address
      </h2>

      {message.text && (
        <div
          className={`mb-4 p-3 text-center rounded ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {[
          { name: "companyName", placeholder: "Company Name" },
          { name: "purchaseManagerName", placeholder: "Purchase Manager Name" },
          { name: "phoneNumber", placeholder: "Phone Number" },
          { name: "city", placeholder: "City" },
          { name: "streetAddress", placeholder: "Street Address" },
          { name: "landmark", placeholder: "Landmark (Optional)" },
          { name: "googleMapLocation", placeholder: "Google Maps URL" },
        ].map((field) => (
          <div key={field.name}>
            <input
              {...formik.getFieldProps(field.name)}
              placeholder={field.placeholder}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched[field.name] && formik.errors[field.name] && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors[field.name]}
              </p>
            )}
          </div>
        ))}

        <div>
          <select
            {...formik.getFieldProps("governorate")}
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-md"
          >
            <option value="">Select Governorate</option>
            {governorates.map((gov) => (
              <option key={gov} value={gov}>
                {gov}
              </option>
            ))}
          </select>
        </div>

        <textarea
          {...formik.getFieldProps("deliveryInstructions")}
          placeholder="Delivery Instructions"
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-md"
        />

        <div>
          <select
            {...formik.getFieldProps("preferredDeliveryTime")}
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-md"
          >
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
        </div>

        <div>
          <select
            {...formik.getFieldProps("paymentMethod")}
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-md"
          >
            <option value="">Select Payment Method</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Online Payment">Online Payment</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md font-semibold text-lg ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateDeliveryAddress;
