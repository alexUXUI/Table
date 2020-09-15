import * as React from "react";
import { Restaurant } from "./app.types";

interface UseRestaurant {
  restaurants: Restaurant[];
  loading: boolean;
  error: RestaurantApiError;
}

export type RestaurantApiError = { message: string } | undefined;

export const useRestaurantApi = (): UseRestaurant => {
  const [restaurants, setRestaurants] = React.useState<
    Restaurant[]
  >([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<RestaurantApiError>(undefined);

  React.useEffect(() => {
    if (!restaurants || !restaurants.length) {
      setError(undefined);
      setLoading(true);
      process.env.REACT_APP_ENV === "dev" 
        ? getDevData(setRestaurants, setLoading, setError)
        : getTestData(setRestaurants, setLoading, setError)
    }
  }, [restaurants]);

  return {
    restaurants,
    loading,
    error,
  };
};

type GetData = (
  setRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<RestaurantApiError>>
) => void;

const getTestData: GetData = (setRestaurants, setLoading, setError) => {
  return fetch(`${process.env.REACT_APP_API_URL_CHARTER}/api/restaurants`, {
    headers: {
      Authorization: `Api-Key ${process.env.REACT_APP_API_KEY}`,
    },
  })
    .then((response: Response) => response.json())
    .then((data) => {
      setRestaurants(data);
      setLoading(false);
    })
    .catch((e: Error) => {
      setError({
        message: "could not import data",
      });
    });
};

const getDevData: GetData = (setRestaurants, setLoading, setError) => {
  return import("./data.json")
    .then((data: { default: Restaurant[] }) => {

      // This set timeout is only to simulate network latency so that
      // I can handle the loading + failed use cases more easily during development
      setTimeout(() => {
        setRestaurants(data.default);
        setLoading(false);
      }, 1000); // can config behavior loading here
    })
    .catch((e: Error) => {
      setError({
        message: "could not import data",
      });
    });
};
