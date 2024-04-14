import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePin } from '../axios/pinsAxios';
import queryKeys from '../constants/queryKeys';

function useDeletePin() {
  const queryClient = useQueryClient();
  const { mutate: handleDeletePin } = useMutation({
    mutationFn: deletePin,
    onSuccess: () => queryClient.invalidateQueries(queryKeys.pins),
  });

  return { handleDeletePin };
}

export default useDeletePin;
