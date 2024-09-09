import React, { useState } from "react";
import PetCard from "./PetCard";
import { Button } from "../../../../components/ui/button";
import { useSnackbar } from "notistack";

const PetSection = ({
  pets,
  onPetChange,
  onAddPet,
  onRemovePet,
  petImages,
  errors,
}) => {
  const [editingPetIndex, setEditingPetIndex] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const handlePetChange = (index, e) => {
    onPetChange(index, e);
  };

  const handleSavePet = () => {
    setEditingPetIndex(null);
    enqueueSnackbar(
      `
      Pet info saved successfully! Please don't forget to save your profile changes.
      `,
      {
        variant: "success",
        anchorOrigin: { vertical: "bottom", horizontal: "center" },
        autoHideDuration: 3000,
        style: { fontSize: "1.6rem" },
      }
    );
  };

  const handleEditPet = (index) => {
    setEditingPetIndex(index);
  };

  return (
    <div className="p-6 bg-orange-50 rounded-md shadow-md w-full">
      <label className="text-2xl font-semibold text-gray-700">Your Pets:</label>
      {pets.map((pet, index) => (
        <PetCard
          key={index}
          pet={pet}
          index={index}
          isEditing={editingPetIndex === index}
          onChange={handlePetChange}
          onSave={handleSavePet}
          onEdit={() => handleEditPet(index)}
          onRemove={() => onRemovePet(index)}
          petImages={petImages}
          errors={errors}
        />
      ))}
      {pets.length < 3 && (
        <Button
          variant="sospet"
          className="w-full py-2 mt-4"
          onClick={onAddPet}
        >
          Add New Pet
        </Button>
      )}
    </div>
  );
};

export default PetSection;
