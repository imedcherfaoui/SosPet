import React from "react";
import { ParallaxScroll } from "../../components/ui/parallax-scroll";

function SearchResult({ animal }) {

  return (
      <ParallaxScroll animals={animal} className="h-[40rem]" />
    );
  }

export default SearchResult;
