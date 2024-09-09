"use client";
import React, { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { FocusCards } from "../../components/ui/focus-cards";
import { motion } from "framer-motion";
import { AuroraBackground } from "../../components/ui/aurora-background";
import moment from "moment";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";

// Function to check and request geolocation permissions
const checkAndRequestGeolocationPermission = () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "granted") {
            resolve(true);
          } else if (permissionStatus.state === "prompt") {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                resolve(true);
              },
              (error) => {
                reject("Geolocation access denied by user or browser.");
              }
            );
          } else {
            reject("Geolocation access denied.");
          }
        })
        .catch((error) => {
          reject(`Permission query error: ${error.message}`);
        });
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
};

function EmergencyContacts() {
  const [location, setLocation] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [showOnlyOpenNow, setShowOnlyOpenNow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLocationInput = (e) => {
    setLocation(e.target.value);
  };

  const handleLocationDetection = async () => {
    try {
      await checkAndRequestGeolocationPermission();
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation(`${lat},${lng}`);
          fetchEmergencyContacts(lat, lng);
        },
        (error) => {
          alert(`Unable to detect location: ${error.message}`);
          console.error("Geolocation error:", error);
        }
      );
    } catch (error) {
      alert(`Unable to detect location: ${error}`);
      console.error("Geolocation permission error:", error);
    }
  };

  const handleSearch = () => {
    if (!location) {
      handleLocationDetection();
    } else {
      const [lat, lng] = location.split(",");
      fetchEmergencyContacts(lat, lng);
    }
  };

  const handleFilter = () => {
    setShowOnlyOpenNow(!showOnlyOpenNow);
  };

  const fetchEmergencyContacts = async (lat, lng) => {
    setLoading(true);

    const url = `https://overpass-api.de/api/interpreter?data=[out:json];(node(around:10000,${lat},${lng})[amenity=veterinary];node(around:10000,${lat},${lng})[emergency=yes][veterinary=yes];node(around:10000,${lat},${lng})[animal_boarding=yes];node(around:10000,${lat},${lng})[amenity=animal_shelter];);out;`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const contacts = data.elements
        .filter(
          (element) => element.tags["addr:street"] && element.tags["addr:city"]
        )
        .map((element) => {
          const houseNumber = element.tags["addr:housenumber"] || "";
          const street = element.tags["addr:street"];
          const city = element.tags["addr:city"];
          const address = houseNumber
            ? `${houseNumber} ${street}, ${city}`
            : `${street}, ${city}`;

          const openingHours = element.tags["opening_hours"] || "Unknown Hours";

          // Determine the category based on tags
          let category = "Unknown Category";
          if (element.tags.amenity === "veterinary") {
            category = "Veterinary Clinic";
          } else if (element.tags.amenity === "animal_shelter") {
            category = "Animal Shelter";
          } else if (
            element.tags.emergency === "yes" &&
            element.tags.veterinary === "yes"
          ) {
            category = "Emergency Veterinary Service";
          } else if (element.tags.animal_boarding === "yes") {
            category = "Animal Boarding";
          }

          return {
            name: element.tags.name || "Unknown Clinic",
            address: address,
            phone: element.tags.phone || "Unknown Phone",
            hours: openingHours,
            category: category, // Add the category here
          };
        });

      setContacts(contacts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vet clinics:", error);
      setContacts([]);
    }
  };

  const isOpenNow = (hours) => {
    if (!hours || hours === "Unknown Hours") return false;

    const now = moment();
    const hoursArray = hours.split(";");

    for (let entry of hoursArray) {
      const [days, times] = entry.trim().split(" ");
      if (!times) continue;

      const [openTime, closeTime] = times.split("-");
      if (!openTime || !closeTime) continue;

      const openMoment = moment(openTime, "HH:mm");
      const closeMoment = moment(closeTime, "HH:mm");

      // Check if the current day falls within the listed days
      const daysArray = days.split(/[-,]/); // Handle ranges like Mo-Fr and individual days

      const currentDay = now.format("dd"); // Get current day in Mo, Tu, We format

      if (daysArray.includes(currentDay)) {
        if (now.isBetween(openMoment, closeMoment)) {
          return true;
        }
      }
    }

    return false;
  };

  console.log("loading", loading);

  return (
    <div
      className="min-h-screen bg-zinc-900 flex flex-col items-center"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          <div className="text-3xl md:text-7xl font-bold text-white text-center mt-10">
            Emergency Contacts
          </div>
          <div className="font-extralight md:text-4xl text-neutral-200 py-4 px-4">
            Enter your location or let us detect it automatically to find
            emergency vets and clinics near you.
          </div>
          <button
            className="inline-flex h-12 animate-shimmer items-center justify-center rounded-[22px] border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            onClick={handleLocationDetection}
          >
            <MapPin className="inline-block mr-2" />
            Detect My Location
          </button>
          <div className="w-full max-w-md flex flex-col items-center gap-4 mb-8">
            <p className="font-extralight md:text-4xl text-neutral-200 text-center">
              OR
            </p>
            <input
              type="text"
              value={location}
              onChange={handleLocationInput}
              placeholder="Enter your location (latitude, longitude)"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              className="bg-white rounded-full w-fit text-black px-4 py-2"
              onClick={handleSearch}
            >
              <Search className="inline-block mr-2" />
              Find Veterinary Clinics Around Me
            </button>
            <button
              onClick={handleFilter}
              className="px-8 py-2 rounded-full relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600"
            >
              <div className="absolute inset-x-0 h-px w-full mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
              <span className="relative z-20">
                {showOnlyOpenNow ? "Show All" : "Show Only Open Now"}
              </span>
            </button>
            {loading && <LoadingCircle />}
          </div>
        </motion.div>
      </AuroraBackground>

      <p className="text-gray-600 mb-4">
        {
          contacts.filter((contact) =>
            showOnlyOpenNow ? isOpenNow(contact.hours) : true
          ).length
        }{" "}
        contacts found
      </p>
      <div className="w-full max-w-5xl">
        {contacts.length > 0 ? (
          <div>
            <FocusCards
              contacts={contacts}
              isOpenNow={isOpenNow}
              showOnlyOpenNow={showOnlyOpenNow}
            />
          </div>
        ) : (
          <p className="text-gray-600 text-center">
            No contacts found. Please enter a valid location or try detecting
            your location again.
          </p>
        )}
      </div>
    </div>
  );
}

export default EmergencyContacts;
