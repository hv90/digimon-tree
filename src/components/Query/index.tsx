import { apiService } from "@/services/api";
import { TDigimon } from "@/types/digimon";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";

const Query: React.FC<{
  id: string;
  onSuccess: (result: TDigimon) => void;
  onError?: (e?: Error | null) => void;
  onLoading?: (isLoading: boolean) => void;
}> = ({ id, onSuccess, onError, onLoading }) => {
  const fetchSearchResults = async () => {
    if (id && !isNaN(parseInt(id)) && parseInt(id) > 0) {
      return apiService
        .getItem(id)
        .then((value) => {
          onSuccess(value);
          return value;
        })
        .catch(() => {
          if (onError) {
            onError();
          }
          throw new Error("Error on search data");
        });
    }
    throw new Error("Error on search data");
  };

  const { error, isLoading } = useQuery({
    queryKey: ["searchResults", id],
    queryFn: fetchSearchResults,
    enabled: !!id,
  });

  const fn = useCallback(() => {
    if (error && onError) {
      onError(error);
    }

    if (onLoading) {
      onLoading(isLoading);
    }
  }, [id, isLoading, error]);

  useEffect(() => {
    fn();
  }, [fn]);

  return <></>;
};

export default Query;
