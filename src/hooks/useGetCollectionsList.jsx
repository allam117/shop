import { useEffect, useState } from "react";
import { getCollections } from "../lib/shopify";

export const useGetCollectionsList = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    (async () => {
      setError(undefined);
      setIsLoading(true);

      try {
        const data = await getCollections();
        setCollections(data);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return {
    error,
    isLoading,
    collections,
  };
};
