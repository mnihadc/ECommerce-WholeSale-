import mongoose from "mongoose";

const deliveryAddressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    purchaseManagerName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    governorate: {
      type: String,
      required: true,
      enum: [
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
      ],
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    streetAddress: {
      type: String,
      required: true,
      trim: true,
    },
    landmark: {
      type: String,
      trim: true,
    },
    googleMapLocation: {
      type: String, // Store Google Maps URL or latitude/longitude
      trim: true,
    },
    deliveryInstructions: {
      type: String,
      trim: true,
    },
    preferredDeliveryTime: {
      type: String,
      enum: ["Morning", "Afternoon", "Evening"],
      default: "Morning",
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Bank Transfer", "Online Payment"],
      required: true,
    },
    adminVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const DeliveryAddress = mongoose.model(
  "DeliveryAddress",
  deliveryAddressSchema
);

export default DeliveryAddress;
