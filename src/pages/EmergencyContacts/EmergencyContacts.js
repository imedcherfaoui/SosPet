import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { MapPin, Search, Navigation } from "lucide-react";
import moment from "moment";
import petsBG2 from "../../images/petsBG2.png";

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


function formatHours(hoursString) {
  if (!hoursString) return "Unknown Hours";

  // Split by semicolon to separate different day ranges
  const hoursArray = hoursString.split(";").map((item) => item.trim());

  // Map through each part to add a new line and a more readable format
  return hoursArray.map((item, index) => {
    const [days, time] = item.split(" ");
    return (
      <div key={index}>
        <span className="font-semibold italic me-3">{days}</span> {time}
      </div>
    );
  });
}

function EmergencyContacts() {
  const [location, setLocation] = useState("");
  const [contacts, setContacts] = useState([]);
  const [showOnlyOpenNow, setShowOnlyOpenNow] = useState(false);

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
    const [lat, lng] = location.split(",");
    fetchEmergencyContacts(lat, lng);
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

  const handleFilter = () => {
    setShowOnlyOpenNow(!showOnlyOpenNow);
  };

  const fetchEmergencyContacts = async (lat, lng) => {
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
    } catch (error) {
      console.error("Error fetching vet clinics:", error);
      setContacts([]);
    }
  };

  const openInGoogleMaps = (address) => {
    const query = encodeURIComponent(address);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
      "_blank"
    );
  };

  return (
    <div
      className="min-h-screen bg-orange-100/70 flex flex-col items-center pb-16 px-4 pt-36"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          backgroundImage: `url(${petsBG2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 1,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      ></div>
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
        Emergency Contacts
      </h2>
      <p className="text-lg sm:text-xl text-gray-700 mb-6 max-w-2xl text-center">
        Enter your location or let us detect it automatically to find emergency
        vets and clinics near you.
      </p>

      <div className="w-full max-w-md flex flex-col items-center gap-4 mb-8">
        <input
          type="text"
          value={location}
          onChange={handleLocationInput}
          placeholder="Enter your location (latitude, longitude)"
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <p className="font-normal text-gray-600 text-center">OR</p>
        <Button
          onClick={handleLocationDetection}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300 w-full"
        >
          <MapPin className="inline-block mr-2" />
          Detect My Location
        </Button>
        <Button
          onClick={handleSearch}
          className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition duration-300 w-full"
        >
          <Search className="inline-block mr-2" />
          Find Veterinary Clinics Around Me
        </Button>
        <Button
          onClick={handleFilter}
          className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition duration-300 w-full"
        >
          {showOnlyOpenNow ? "Show All" : "Show Only Open Now"}
        </Button>
      </div>

      <p className="text-gray-600 mb-4">{contacts.length} contacts found</p>
      <div className="w-full max-w-2xl">
        {contacts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contacts
              .filter((contact) =>
                showOnlyOpenNow ? isOpenNow(contact.hours) : true
              )
              .map((contact, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg p-6 text-center flex flex-col justify-between"
                  style={{ minHeight: "300px" }}
                >
                  <div className="flex justify-end mb-4">
                    <Navigation
                      onClick={() => openInGoogleMaps(contact.address)}
                      className="bg-orange-200 text-orange-500 p-2 rounded-md hover:bg-orange-400 hover:text-white transition duration-300"
                      size={35}
                    />
                  </div>
                  <h3
                    className="text-xl sm:text-2xl font-semibold mb-2"
                    style={{ minHeight: "70px" }}
                  >
                    {contact.name}
                  </h3>
                  <p className="text-gray-600" style={{ minHeight: "70px" }}>
                    {contact.address}
                  </p>
                  <p className="text-gray-500 font-semibold italic mb-2">
                    *{contact.category}*
                  </p>
                  <a
                    href={`tel:${contact.phone.replace(/\D/g, "")}`}
                    className="text-orange-500 font-bold mt-2 block underline"
                    style={{ minHeight: "30px" }}
                  >
                    {contact.phone}
                  </a>
                  <div
                    className="text-gray-600 mt-4 flex-grow"
                    style={{ minHeight: "30px" }}
                  >
                    {contact.hours !== "Unknown Hours" ? (
                      <>
                        <p className="font-semibold mb-2">Opening hours:</p>
                        {formatHours(contact.hours)}
                      </>
                    ) : (
                      "Information not available"
                    )}
                  </div>
                </div>
              ))}
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
