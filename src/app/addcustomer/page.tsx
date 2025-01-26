"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddCustomerForm() {
  const [customerName, setCustomerName] = useState("");
  const [ghatNo, setGhatNo] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // Fixed: `loading` to manage button state
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !ghatNo || !year) {
      setError("All fields are required.");
      setSuccess("");
      return;
    }

    setLoading(true); // Start loading state immediately after form submission

    try {
      const response = await axios.post("/api/addcustomer", {
        customerName,
        GhatNo: ghatNo,
        Year: year,
      });

      if (response.status === 200) {
        setSuccess("Customer added successfully!");
        setError("");
        setCustomerName("");
        setGhatNo("");
        setYear("");
        router.push("/home"); // Navigate after success
      }
    } catch (error) {
      setError("Failed to add customer. Try again later."+error);
      setSuccess("");
    } finally {
      setLoading(false); // Stop loading regardless of success or error
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white text-black shadow rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Add New Customer</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="customerName" className="block text-gray-700 font-semibold mb-2">
            Customer Name:
          </label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter customer name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="ghatNo" className="block text-gray-700 font-semibold mb-2">
            Ghat Number:
          </label>
          <input
            type="text"
            id="ghatNo"
            value={ghatNo}
            onChange={(e) => setGhatNo(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter Ghat Number"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="year" className="block text-gray-700 font-semibold mb-2">
            Year:
          </label>
          <input
            type="text"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter year eg:2025"
          />
        </div>

        <button
          type="submit"
          disabled={loading} // Disable button when loading
          className={`w-full font-semibold p-3 rounded-lg transition ${
            loading ? "bg-gray-400 text-gray-800" : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {loading ? "Loading..." : "Add Customer"}
        </button>
      </form>
    </div>
  );
}
