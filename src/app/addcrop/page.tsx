"use client";

import { useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const AddCrop = () => {
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customerId"); // Get customerId from query params

  const [formData, setFormData] = useState({
    customerId: customerId || "", // Pre-fill customerId if available
    CropName: "",
    FieldAmount: "",
    CropTime: "",
    BillPaid: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/newcrop", {
        customerId: formData.customerId,
        CropName: formData.CropName,
        FieldAmount: Number(formData.FieldAmount), // Ensure it's a number
        CropTime: formData.CropTime,
        BillPaid: Number(formData.BillPaid), // Ensure it's a number
      });

      setResponseMessage(`Crop created successfully! ID: ${res.data.success._id}`);
      setFormData({
        customerId: "",
        CropName: "",
        FieldAmount: "",
        CropTime: "",
        BillPaid: "",
      });
    } catch (error) {
      setResponseMessage("Failed to create crop."+error);
    }
  };

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-2xl font-bold mb-4 text-white">Add New Crop</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* <div>
          <label className="block font-medium mb-1">Customer ID</label>
          <input
            type="text"
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter Customer ID"
          />
        </div> */}

        <div>
          <label className="block font-medium mb-1 text-white">Crop Name</label>
          <input
            type="text"
            name="CropName"
            value={formData.CropName}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter Crop Name"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-white">Field Amount</label>
          <input
            type="number"
            name="FieldAmount"
            value={formData.FieldAmount}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter Field Amount (e.g., 10)"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-white">Crop Time</label>
          <input
            type="String"
            name="CropTime"
            value={formData.CropTime}
            onChange={handleChange}
            required
            placeholder="Enter the time in months"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-white">Bill Paid</label>
          <input
            type="number"
            name="BillPaid"
            value={formData.BillPaid}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter Bill Paid"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {responseMessage && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          {responseMessage}
        </div>
      )}
    </div>
  );
};

export default AddCrop;
