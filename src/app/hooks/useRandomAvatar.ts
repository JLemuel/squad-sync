import { useMemo } from 'react';
import { getRandomAvatarUrl } from '../utils/avatar';

export function useRandomAvatar() {
  return useMemo(() => getRandomAvatarUrl(), []);
}