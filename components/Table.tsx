"use client";

import { useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaStop,
  FaTimes,
  FaClock,
  FaCoins,
} from "react-icons/fa";

interface TableProps {
  number: number;
  hourlyRate: number;
}

export default function Table({ number, hourlyRate }: TableProps) {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const startTimer = () => {
    setIsAnimating(true);
    setIsTimerRunning(true);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const togglePauseResume = () => setIsTimerRunning(!isTimerRunning);
  const stopTimer = () => {
    setIsTimerRunning(false);
    setShowPopup(true);
  };
  const closePopup = () => {
    setShowPopup(false);
    setTime(0);
  };
  const cancelPopup = () => {
    setShowPopup(false);
    setIsTimerRunning(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const calculatePrice = (seconds: number) => {
    const hours = seconds / 3600;
    const price = hours * hourlyRate;
    return price.toFixed(2);
  };

  return (
    <div
      className={`w-full h-full rounded-lg shadow-lg flex flex-col items-center justify-center p-6 transition-colors duration-300 ease-in-out
          ${isAnimating ? "animate-start-table" : ""}
          ${
            time === 0
              ? "bg-gray-800"
              : isTimerRunning
              ? "bg-green-700"
              : "bg-red-800"
          }
        `}
    >
      <h1 className="text-2xl font-bold mb-8">Table {number}</h1>
      {time === 0 && !isTimerRunning ? (
        <button className="play-button" onClick={startTimer}>
          <FaPlay style={{ fontSize: "24px", marginLeft: "3px" }} />
        </button>
      ) : (
        <>
          <div className="text-4xl font-bold mb-8">{formatTime(time)}</div>
          <div className="flex space-x-4">
            <button
              className={isTimerRunning ? "pause-button" : "resume-button"}
              onClick={togglePauseResume}
            >
              {isTimerRunning ? <FaPause /> : <FaPlay />}
              <span className="text-sm mt-1">
                {isTimerRunning ? "Pause" : "Resume"}
              </span>
            </button>
            <button className="stop-button" onClick={stopTimer}>
              <FaStop />
              <span className="text-sm mt-1">Stop</span>
            </button>
          </div>
        </>
      )}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg text-gray-800 w-full max-w-4xl aspect-[4/3] flex flex-col">
            <div className="p-8 flex-grow flex items-center justify-center">
              <div className="bg-gray-200 rounded-xl p-8 text-center">
                <h2 className="text-5xl font-bold mb-8">Table {number}</h2>
                <p className="text-3xl mb-6 flex items-center justify-center">
                  <FaClock className="mr-2" /> Temps de jeu: {formatTime(time)}
                </p>
                <p className="text-4xl bg-green-500 rounded-3xl text-white p-4 gap-3 font-semibold flex flex-col md:flex-row items-center justify-center">
                  <FaCoins className="mr-2" /> Prix: CHF {calculatePrice(time)}
                </p>
              </div>
            </div>
            <div className="p-8 border-t border-gray-200 flex justify-between">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg text-xl flex-1 mr-4"
                onClick={cancelPopup}
              >
                Annuler
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg text-xl flex-1"
                onClick={closePopup}
              >
                <FaTimes className="inline-block mr-2" />
                Fermer la table
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
