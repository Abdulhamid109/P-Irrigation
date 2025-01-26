"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";


interface Customer {
  _id: string;
  customerName: string;
  GhatNo: string;
}


export default function SearchResults() {
    const searchParams = useSearchParams();
  const query = searchParams.get("name");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState("");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`/api/search?name=${query}`);
        setCustomers(response.data.customers || []);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
        setError("Failed to fetch customers.");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      
      <h1 className="text-2xl font-bold mb-6">Customer List</h1>
      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {customers.map((customer) => (
            <div key={customer._id} className="border p-4 rounded shadow">
              <h2 className="font-semibold text-lg">{customer.customerName}</h2>
              <p className="text-sm text-gray-600">GhatNo: {customer.GhatNo}</p>
              <div className="mt-4 flex justify-between">
                <Link href={`/customer/${customer._id}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    View Details
                  </button>
                </Link>
                <Link href={`/addcrop?customerId=${customer._id}`}>
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Add Crop
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )
      
      }
    </div>
  );
}
