"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // For programmatic navigation
import toast from "react-hot-toast";

export function Navv() {
  const [query, setQuery] = useState("");
  const router = useRouter(); // To navigate programmatically

  const handleSearchQuery = async (event:React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && query.trim() !== "") {
      try {
        // You can choose to fetch data here or navigate to a search results page
        const response = await axios.get(`/api/search?name=${query}`);
        const customers = response.data.customers;

        if (customers?.length > 0) {
          // Pass search results via query params or redirect to a search results page
          router.push(`/search-results?name=${query}`);
        } else {
          alert("No customers found.");
        }
      } catch (err) {
        console.error("Search error:", err);
      }
    }
  };

  const logout = async()=>{
    try {
      const response = await axios.get('/api/logout');
      if(response.status===200){
        router.push('/auth/login');
        toast.success("Successfully logged out..")
      }
      if(response.status!==200){
        toast.error("Failed to logout");
      }
    } catch (err) {
      console.log("Failed to logout"+err);
    }
  }

  return (
    <nav className="flex justify-start gap-4 items-center flex-wrap bg-slate-600 p-3 m-4 rounded-lg mb-3 md:gap-12">
      <Link href="/home" className="text-2xl font-bold">
        Irrigation
      </Link>
      <input
        type="text"
        placeholder="Search customers..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearchQuery} // Triggers on Enter
        className="w-[250px] p-2 rounded-lg text-black"
      />
      <Link href="/addcustomer" className="hover:underline">
        Add Customer
      </Link>
      <Link href="/billpaid-customers" className="hover:underline">
        BillPaid Customers
      </Link>
      <Link href="/billremain-customers" className="hover:underline">
        BillRemaining Customers
      </Link>
      <span onClick={logout} className="hover:underline cursor-pointer">Logout</span>
    </nav>
  );
}
