import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import from react-router-dom
import { BackgroundGradient } from "../../components/ui/background-gradient";
import { BackgroundLines } from "../../components/ui/background-lines";
import { HoverEffect } from "../../components/ui/card-hover-effect";
import { TextGenerateEffect } from "../../components/ui/text-generate-effect";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";
import { useAuth } from "../../services/userContext";
import { Button } from "../../components/ui/button";

const projects = [
  {
    title: "Dog",
    description:
      "Dogs are domesticated mammals, not natural wild animals. They were originally bred from wolves. They have been bred by humans for a long time...",
  },
  {
    title: "Cat",
    description:
      "The cat is a domestic species of small carnivorous mammal. It is the only domesticated species in the family Felidae and is often referred to as...",
  },
  {
    title: "Axolotl",
    description:
      "The axolotl, Ambystoma mexicanum, is a neotenic salamander, closely related to the tiger salamander. Although the axolotl is colloquially known...",
  },
];

function AnimalPedia() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnimal = async (searchQuery) => {
    if (!currentUser) {
      setError("Please log in to search for animal information.");
      return; // Stop execution if there is no logged-in user
    }
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);

    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    if (!apiKey) {
      console.error("OpenAI API key is not set");
      setError("API key is not set.");
      setLoading(false);
      return;
    }

    const url = "https://api.openai.com/v1/chat/completions";
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Give me interesting information about ${searchQuery} with every detail about its faculties and what differentiates it from other animals or others of the same species.`,
          },
        ],
      }),
    };

    try {
      const response = await fetch(url, options);
      const responseData = await response.json();
      if (!response.ok) {
        console.error("HTTP Error Response:", response.status, responseData);
        throw new Error(
          `HTTP Error ${response.status}: ${JSON.stringify(responseData)}`
        );
      }
      setAnimal(responseData.choices[0].message.content);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleItemClick = (title) => {
    fetchAnimal(title);
  };

  return (
    <BackgroundLines className="flex items-center justify-center h-full w-full flex-col px-4">
      <div className="h-full w-full relative flex flex-col items-center justify-center antialiased mt-28 lg:mt-[10rem]">
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="relative z-10 text-5xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-orange-300 to-orange-700 text-center font-sans font-bold">
            AnimalPedia
          </h1>
          <p className="text-orange-700 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
            A place to learn about animals and their habitats.
            <br />
            Search for an animal to learn more about it.
          </p>
          <BackgroundGradient className="flex rounded-[22px]">
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search for an animal..."
              className="rounded-l-[22px] border border-none focus:ring-2 focus:ring-orange-200 outline-none w-full relative z-10 p-2 pl-3 bg-neutral-700/30 placeholder:text-slate-100 text-slate-100"
            />
            <button
              className="inline-flex h-12 animate-shimmer items-center justify-center rounded-r-[22px] border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              onClick={() => fetchAnimal(search)}
            >
              Search
            </button>
          </BackgroundGradient>
        </div>
        {loading && <LoadingCircle />}
        {error && (
          <h1 className="relative z-10 text-lg md:text-2xl bg-clip-text text-transparent bg-gradient-to-b from-red-300 to-red-700 text-center font-sans font-bold mb-3">
            Error: {error}
          </h1>
        )}
        {error === "Please log in to search for animal information." && (
          <button
            className="relative inline-flex h-16 overflow-hidden rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 p-1"
            onClick={() => navigate("/login")}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-10 py-1 text-lg font-bold font-sans text-white backdrop-blur-3xl">
              Login
            </span>
          </button>
        )}
        {!animal && (
          <div className="max-w-5xl mx-auto px-8">
            <HoverEffect items={projects} onItemSelect={handleItemClick} />
          </div>
        )}
        {animal && (
          <BackgroundGradient className="flex rounded-[22px]">
            <TextGenerateEffect words={animal} />
          </BackgroundGradient>
        )}
      </div>
    </BackgroundLines>
  );
}

export default AnimalPedia;
