import { useQuery } from '@tanstack/react-query';
import queryKeys from '../constants/queryKeys';
import { getPins } from '../axios/pinsAxios';

function useGetPins(userId) {
  const { data } = useQuery({ queryKey: queryKeys.pins(userId), queryFn: () => getPins(userId) });
  return { pins: data ?? [] };
}

export default useGetPins;
