"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Customer {
  _id: string;
  customerName: string;
  customerId: string;
  GhatNo: string;
}

export default function BillPaidPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // Fetch the list of paid customers
        const response = await axios.get("/api/paidbill");
        const customerData = response.data.success; // Assuming your backend sends { success: [...] }
        
        // Fetch the customer details for each customerId
        const customersWithDetails = await Promise.all(
          customerData.map(async (customer: { customerId: string }) => {
            const customerDetailsResponse = await axios.get(
              `/api/customer/${customer.customerId}` // Make sure your backend supports this route
            );
            console.log(customerDetailsResponse.data.data.customer.customerName);
            return {
              ...customer,
              customerName: customerDetailsResponse.data.data.customer.customerName,
              GhatNo: customerDetailsResponse.data.data.customer.GhatNo,
            };
          })
        );
        if (customersWithDetails.length === 0) {
          setError("No customers found.");
        } else {
          setCustomers(customersWithDetails);
        }
        setCustomers(customersWithDetails);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setError("No Customers");
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Full bill paid customers</h1>
      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {customers.map((customer) => (
            <div key={customer._id} className="border p-4 rounded shadow">
              <h2 className="font-semibold text-lg">{customer.customerName}</h2>
              <p className="text-sm text-gray-600">GhatNo: {customer.GhatNo}</p>
              <div className="mt-4 flex justify-between">
                <Link href={`/customer/${customer.customerId}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    View Details
                  </button>
                </Link>
                <Link href={`/addcrop?customerId=${customer.customerId}`}>
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Add Crop
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
