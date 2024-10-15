import { useMemo } from 'react';
import { getRandomAvatarUrl } from '../utils/avatar';

export function useRandomAvatar(seed: string) {
  return useMemo(() => getRandomAvatarUrl(seed), [seed]);
}