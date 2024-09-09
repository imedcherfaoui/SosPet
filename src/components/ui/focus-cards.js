import React, { useState } from "react";
import { cn } from "../../utils/utils";
import { Navigation } from "lucide-react";

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

export const Card = React.memo(({ card, index, hovered, setHovered }) => (
  <div
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    className={cn(
      "rounded-lg relative bg-neutral-900 text-neutral-100 overflow-hidden transition-all duration-300 ease-out w-full",
      hovered !== null && hovered !== index && "blur-sm scale-[0.98]",
      "flex flex-col justify-between p-4 h-60 md:h-80 w-full"
    )}
  >
    <div className="flex justify-between items-start">
      <div className="flex flex-col justify-between">
        <h2 className="text-lg font-bold">{card.name}</h2>
        <p className="text-sm">{card.address}</p>
        <a
          href={`tel:${card.phone.replace(/\D/g, "")}`}
          className="text-orange-500 font-bold mt-2 block underline"
          style={{ minHeight: "30px" }}
        >
          {card.phone}
        </a>
      </div>
      <Navigation
        onClick={() =>
          window.open(
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              card.address
            )}`,
            "_blank"
          )
        }
        className="cursor-pointer"
        size={24}
      />
    </div>
    <p className="text-xs mt-2">{card.category}</p>
    <p className="text-xs">
      {card.hours ? formatHours(card.hours) : "Unknown Hours"}
    </p>
  </div>
));

Card.displayName = "Card";

export function FocusCards({ contacts, isOpenNow, showOnlyOpenNow }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {contacts
        .filter((contact) =>
          showOnlyOpenNow ? isOpenNow(contact.hours) : true
        )
        .map((contact, index) => (
          <Card
            key={contact.name + index}
            card={contact}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
          />
        ))}
    </div>
  );
}
