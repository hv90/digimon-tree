"use client";

import { TDigimon } from "@/types/digimon";
import { Autocomplete, TextField } from "@mui/material";
import digimonShortData from "@/assets/digimon_short_data.json";
import { useSearchParams, useRouter } from "next/navigation";
import { useDigimonContext } from "@/contexts/DigimonContext";
import { useEffect, useState } from "react";
import { router } from "@/utils/router";
import Query from "../Query";

const Search: React.FC<{
  onSuccess?: (result: TDigimon) => void;
  onError?: () => void;
}> = ({ onError, onSuccess }) => {
  const {
    setDigimonResults,
    digimonResults,
    digimonId,
    setDigimonId,
    currentDigimonName,
    setCurrentDigimonName,
    isLoading,
    setIsLoading,
  } = useDigimonContext();
  const id = useSearchParams()?.get("id");

  const [error, setError] = useState<Error | null>(null);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (id) {
  //       setDigimonId(id);
  //       const result = digimonShortData.find(
  //         (digimonData) => digimonData.id.toString() === id
  //       );
  //       if (result) setCurrentDigimonName(result.name);
  //     }
  //   }, 300);
  // }, []);

  return (
    <>
      <Autocomplete
        className="w-full h-1/4"
        options={digimonShortData.map((data) => data.name)}
        renderInput={(params) => {
          return <TextField {...params} label="Digimon" />;
        }}
        onChange={(_, value) => {
          const digimonId = digimonShortData.find(
            (digimon) => digimon.name === value
          )?.id;

          if (digimonId) {
            const url = new URL(window.location.origin);
            url.searchParams.append("id", digimonId.toString());
            router.push(url.toString());

            setDigimonId(digimonId.toString());
            setCurrentDigimonName(value ?? "");
          }
        }}
        value={currentDigimonName}
        sx={{
          ".MuiInputBase-root.MuiOutlinedInput-root": {
            background: "white",
          },
        }}
      />
      <Query
        id={digimonId}
        onSuccess={(digimon) => {
          setDigimonResults(digimon);
        }}
        onLoading={setIsLoading}
        onError={(e) => {
          if (e) {
            setError(e);
          }
        }}
      />
      {error && <p>Error: {error.message}</p>}
    </>
  );
};

export default Search;
