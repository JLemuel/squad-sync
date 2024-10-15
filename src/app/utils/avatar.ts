export function getRandomAvatarUrl() {
  const randomSeed = Math.random().toString(36).substring(7);
  return `https://api.dicebear.com/9.x/avataaars/svg?seed=${randomSeed}`;
}
