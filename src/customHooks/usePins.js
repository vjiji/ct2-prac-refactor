import useAddPin from './useAddPin';
import useDeletePin from './useDeletePin';
import useGetPins from './useGetPins';
import { useUser } from './useUserContext';

function usePins(postId) {
  const { user } = useUser();

  const { pins } = useGetPins(user.userId);
  const { handleAddPin } = useAddPin();
  const { handleDeletePin } = useDeletePin();

  const pin = pins?.find(({ postId: selectedId }) => String(selectedId) === String(postId));
  const isContained = !!pin;
  const pinId = pin?.pinId ?? '';

  const handleSetPin = () => (isContained ? handleDeletePin(pinId) : handleAddPin(postId));

  return { handleSetPin, isContained };
}
export default usePins;
