"use client";

import { useState } from "react";
import Table from "../../components/Table";
import LoginForm from "../../components/LoginForm";

import HourlyRateModal from "../../components/HourlyRateModal";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hourlyRate, setHourlyRate] = useState(35);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <LoginForm onLogin={() => setIsAuthenticated(true)} />
        <div className="text-black bg-orange-500">
          {process.env.NEXT_PUBLIC_TEST_VARIABLE}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col md:flex-row justify-center items-center p-4 md:p-8 relative">
      <button
        onClick={() => setIsRateModalOpen(true)}
        className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Hourly Rate
      </button>
      <div className="flex flex-col md:flex-row w-full h-full md:h-2/3 max-w-7xl justify-between space-y-8 md:space-y-0 md:space-x-8">
        {[1, 2, 3].map((num) => (
          <div key={num} className="w-full md:w-1/3 h-full">
            <Table number={num} hourlyRate={hourlyRate} />
          </div>
        ))}
      </div>
      <HourlyRateModal
        isOpen={isRateModalOpen}
        onClose={() => setIsRateModalOpen(false)}
        currentRate={hourlyRate}
        onSave={(newRate) => {
          setHourlyRate(newRate);
          setIsRateModalOpen(false);
        }}
      />
    </main>
  );
}
