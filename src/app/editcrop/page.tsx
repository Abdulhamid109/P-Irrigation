"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {  useRouter, useSearchParams } from "next/navigation";

interface Crop {
  CropName: string;
  FieldAmount: number;
  CropTime: string;
  BillPaid: number;
  _id?: string;
}
const EditCrop = ({ Crop }:{ Crop?: Crop }) => {
  const searchParams = useSearchParams();
  const cropId = searchParams.get("cropId"); // Get customerId from query params
  const router = useRouter();

  const [formData, setFormData] = useState({
    cropId: cropId || "",
    CropName: Crop?.CropName || "",
    FieldAmount: Crop?.FieldAmount || "",
    CropTime: Crop?.CropTime || "",
    BillPaid: Crop?.BillPaid || "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/editcrop/${cropId}`, {
        CropId: formData.cropId,
        CropName: formData.CropName,
        FieldAmount: Number(formData.FieldAmount), // Ensure it's a number
        CropTime: formData.CropTime,
        BillPaid: Number(formData.BillPaid), // Ensure it's a number
      });

      console.log(res.data.Crop)
      // const dataa = await res.data.Crop;
      setResponseMessage(`Crop Updated successfully! ID: ${res.data.Crop._id}`);
      router.push('/home/')
      // setFormData({
      //   cropId: dataa._id||"",
      //   CropName: "",
      //   FieldAmount: "",
      //   CropTime: "",
      //   BillPaid: "",
      // });

      
    } catch (error) {
      setResponseMessage("Failed to create crop."+error);
    }
  };

  useEffect(() => {
    // Fetch crop details if cropId is available and Crop is not provided
    if (cropId && !Crop) {
      const fetchCropData = async () => {
        try {
          const res = await axios.get(`/api/getCrops?CropId=${cropId}`);
          const data = res.data.data;
          setFormData({
            cropId: data.cropId,
            CropName: data.CropName,
            FieldAmount: data.FieldAmount.toString(),
            CropTime: data.CropTime,
            BillPaid: data.BillPaid.toString(),
          });
        } catch (error) {
          setResponseMessage("Failed to fetch crop data."+error);
        }
      };
      fetchCropData();
    }
  }, [cropId, Crop]);

  

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-2xl font-bold mb-4 text-white">Update Crop</h1>

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
            type="text"
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

export default EditCrop;
