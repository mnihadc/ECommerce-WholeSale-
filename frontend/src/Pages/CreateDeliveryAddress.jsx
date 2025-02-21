import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

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
  const [autocomplete, setAutocomplete] = useState(null);
  const [location, setLocation] = useState("");
  const [mapUrl, setMapUrl] = useState("");

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
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post("/api/delivery-address", values);
        alert("Delivery Address Created Successfully!");
        resetForm();
      } catch (error) {
        console.error("Error creating delivery address", error);
      }
    },
  });

  const handlePlaceSelect = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const formattedAddress = place.formatted_address;
        setLocation(formattedAddress);
        setMapUrl(`https://www.google.com/maps?q=${lat},${lng}`);
        formik.setFieldValue("googleMapLocation", formattedAddress);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-900 text-white shadow-lg rounded-lg p-8 mt-5 ">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Create Delivery Address
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {[
          { name: "companyName", placeholder: "Company Name" },
          { name: "purchaseManagerName", placeholder: "Purchase Manager Name" },
          { name: "phoneNumber", placeholder: "Phone Number" },
          { name: "city", placeholder: "City" },
          { name: "streetAddress", placeholder: "Street Address" },
          { name: "landmark", placeholder: "Landmark (Optional)" },
        ].map((field) => (
          <input
            key={field.name}
            {...formik.getFieldProps(field.name)}
            placeholder={field.placeholder}
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
        <select
          {...formik.getFieldProps("governorate")}
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Governorate</option>
          {governorates.map((gov) => (
            <option key={gov} value={gov}>
              {gov}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={mapUrl}
          onChange={(e) => setMapUrl(e.target.value)}
          placeholder="Paste Google Maps URL here"
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          {...formik.getFieldProps("deliveryInstructions")}
          placeholder="Delivery Instructions"
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          {...formik.getFieldProps("preferredDeliveryTime")}
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>
        <select
          {...formik.getFieldProps("paymentMethod")}
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Payment Method</option>
          <option value="Cash">Cash</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Online Payment">Online Payment</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md font-semibold text-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateDeliveryAddress;
