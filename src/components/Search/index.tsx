"use client";

import { TDigimon } from "@/types/digimon";
import { Autocomplete, TextField } from "@mui/material";
import digimonShortData from "@/assets/digimon_short_data.json";
// import { useSearchParams } from "next/navigation";
import { useDigimonContext } from "@/contexts/DigimonContext";
import { useState } from "react";
import { router } from "@/utils/router";
import Query from "../Query";

const Search: React.FC<{
  onSuccess?: (result: TDigimon) => void;
  onError?: () => void;
}> = ({}) => {
  const {
    setDigimonResults,
    digimonId,
    setDigimonId,
    currentDigimonName,
    setCurrentDigimonName,
    setIsLoading,
  } = useDigimonContext();
  // const id = useSearchParams()?.get("id");

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
        className="w-full h-full flex items-center"
        options={digimonShortData.map((data) => data.name)}
        renderInput={(params) => {
          return (
            <TextField
              className="h-[clamp(36px,41px,46px)] md:h-[clamp(60px,calc(60%-8px),90px)]"
              {...params}
              label="Digimon"
            />
          );
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
            height: "100%",
            fontSize: {
              xl: "1.5rem",
            },
          },
          label: {
            color: "hsl(var(--green-foreground))",
            fontSize: {
              xl: "1.2rem",
            },
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
