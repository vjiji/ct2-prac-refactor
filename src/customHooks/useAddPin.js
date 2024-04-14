import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPin } from '../axios/pinsAxios';
import queryKeys from '../constants/queryKeys';

function useAddPin() {
  const queryClient = useQueryClient();

  const { mutate: handleAddPin } = useMutation({
    mutationFn: addPin,
    onSuccess: () => queryClient.invalidateQueries(queryKeys.pins),
  });

  return { handleAddPin };
}

export default useAddPin;
