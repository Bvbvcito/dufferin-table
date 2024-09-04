"use client";
import { useState } from "react";

interface HourlyRateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRate: number;
  onSave: (rate: number) => void;
}

export default function HourlyRateModal({
  isOpen,
  onClose,
  currentRate,
  onSave,
}: HourlyRateModalProps) {
  const [rate, setRate] = useState(currentRate.toString());

  const handleSave = () => {
    const newRate = parseFloat(rate);
    if (!isNaN(newRate) && newRate > 0) {
      onSave(newRate);
      onClose();
    } else {
      alert("Please enter a valid positive number");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center tailwind-test">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Set Hourly Rate
        </h2>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="border text-gray-800 text-2xl p-2 mb-4 w-full"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
