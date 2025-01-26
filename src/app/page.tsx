"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function GetStartedPage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-50 p-4">
      {/* Hero Section */}
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-6">
          Welcome to Patel Irrigation Services
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Revolutionizing agriculture with efficient, sustainable, and smart irrigation solutions. Let us help you grow more with less water.
        </p>
      </div>

      {/* Image Section */}
      <div className="relative w-full max-w-3xl h-64 md:h-96 rounded-lg overflow-hidden shadow-lg mb-10">
        <Image
          src="https://imgs.search.brave.com/poBEhBM0CVtzmiTEG8EUifVRoxjdSittBlFjmz5cuII/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi8zLzNkL0Nl/bnRlci1waXZvdF9p/cnJpZ2F0aW9uLmpw/Zy81MTJweC1DZW50/ZXItcGl2b3RfaXJy/aWdhdGlvbi5qcGc"
          alt="Irrigation System"
          fill
          className="object-cover"
        />
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <button
          onClick={() => router.push("/auth/login")}
          className="px-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-lg shadow hover:bg-green-600 transition">
          Get Started
        </button>
        <p className="mt-4 text-gray-500 text-sm">
          Ready to transform your fields? Start now to explore our services.
        </p>
      </div>
    </main>
  );
}
