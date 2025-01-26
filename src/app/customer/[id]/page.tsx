"use client";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Customer {
  _id: string;
  customerName: string;
  GhatNo: string;
  Year: string;
  CropId: string;
}

interface Crop {
  _id: string;
  CropName: string;
  CropTime: string;
  FieldAmount: number;
  TotalBill: number;
  BillPaid: number;
  RemainingBill: number;
}

export default function Details() {
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer>();
  const [crop, setCrop] = useState<Crop[]>([]);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`/api/customer/${id}`);
        if (response.status === 200) {
          console.log(response.data.data.customer);
          console.log(response.data.data.crop);
          setCustomer(response.data.data.customer);
          setCrop(response.data.data.crop);
        }
        if (response.status === 404) {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.log("Failed to fetch the details" + error);
      }
    };

    fetchCustomer();
  }, [id]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Customer Details</h1>

      <div className="text-lg font-semibold mb-4">
        <p><span className="font-bold">Customer Name:</span> {customer?.customerName}</p>
        <p><span className="font-bold">Ghat No:</span> {customer?.GhatNo}</p>
        <p><span className="font-bold">Year:</span> {customer?.Year}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Crop Details</h2>

      {crop.length === 0 ? (
        <p>No crops found.</p>
      ) : (
        <div className="overflow-x-auto shadow-xl rounded-lg bg-white text-black">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-4 border-b text-left">Crop Name</th>
                <th className="p-4 border-b text-left">Crop Time</th>
                <th className="p-4 border-b text-left">Field Amount</th>
                <th className="p-4 border-b text-left">Total Bill</th>
                <th className="p-4 border-b text-left">Bill Paid</th>
                <th className="p-4 border-b text-left">Remaining Bill</th>
                <th className="p-4 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {crop.map((crops) => (
                <tr key={crops._id} className="hover:bg-gray-100">
                  <td className="p-4 border-b">{crops.CropName}</td>
                  <td className="p-4 border-b">{crops.CropTime}</td>
                  <td className="p-4 border-b">{crops.FieldAmount} गुंठे</td>
                  <td className="p-4 border-b">{crops.TotalBill} रुपये</td>
                  <td className="p-4 border-b">{crops.BillPaid} रुपये</td>
                  <td className="p-4 border-b">{crops.RemainingBill} रुपये</td>
                  <td className="p-4 border-b">
                    <Link href={`/editcrop?cropId=${crops._id}`}>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
