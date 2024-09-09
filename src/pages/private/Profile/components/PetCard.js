import React from "react";
import { Button } from "../../../../components/ui/button";

const PetCard = ({
  pet,
  index,
  isEditing,
  onEdit,
  onChange,
  onSave,
  onRemove,
  petImages,
  errors,
}) => {
  return (
    <div className="mt-4 border p-4 rounded-md shadow-sm bg-white flex flex-col md:flex-row gap-4 items-start">
      <img
        src={petImages[pet.kind.toLowerCase()] || petImages["dog"]}
        alt="Pet"
        className="w-24 h-24 rounded-full mb-4"
      />
      <div className="flex flex-col w-full">
        {isEditing ? (
          <>
            <input
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:border-orange-500 mb-2"
              type="text"
              name="name"
              value={pet.name}
              onChange={(e) => onChange(index, e)}
              placeholder="Pet Name"
            />
            <input
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:border-orange-500 mb-2"
              type="text"
              name="kind"
              value={pet.kind}
              onChange={(e) => onChange(index, e)}
              placeholder="Animal Kind (e.g., Dog, Cat)"
            />
            <input
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:border-orange-500 mb-2"
              type="number"
              name="age"
              value={pet.age}
              onChange={(e) => onChange(index, e)}
              placeholder="Pet Age"
            />
            <input
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:border-orange-500 mb-2"
              type="number"
              name="weight"
              value={pet.weight}
              onChange={(e) => onChange(index, e)}
              placeholder="Weight (kg)"
            />
            <Button variant="sospet" className="mt-2" onClick={() => onSave()}>
              Save Pet Info
            </Button>
          </>
        ) : (
          <>
            <p className="text-lg font-medium">{pet.name}</p>
            <p className="text-gray-600">{pet.kind}</p>
            <p className="text-gray-600">Age: {pet.age}</p>
            <p className="text-gray-600">Weight: {pet.weight} kg</p>
            <Button variant="sospet" className="mt-2" onClick={() => onEdit()}>
              Edit Pet Info
            </Button>
          </>
        )}
        {errors && errors[index] && (
          <p className="text-red-500 mt-2">{errors[index]}</p>
        )}
        {onRemove && (
          <Button
            variant="destructive"
            className="mt-2"
            onClick={() => onRemove()}
          >
            Remove Pet
          </Button>
        )}
      </div>
    </div>
  );
};

export default PetCard;
