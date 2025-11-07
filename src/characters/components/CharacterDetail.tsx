import { useParams } from "react-router-dom";
import { useApi } from "../../shared/hooks";
import type { Character } from "../models";
import { GetCharacterById } from "../services";
import type { AxiosError } from "axios";
import { useEffect } from "react";

export const CharacterDetail = () => {
  const { id } = useParams();

  const { loading, error, data, fetch } = useApi<Character>(() =>
    GetCharacterById(Number(id))
  );

  useEffect(() => {
    fetch();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 404) {
      return <div>Character with id: {id} not found</div>;
    }

    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>{data?.name}</h2>
      <img src={data?.image} alt={data?.name} />
      <p>Status: {data?.status}</p>
      <p>Species: {data?.species}</p>
      <p>Gender: {data?.gender}</p>
    </div>
  );
};
