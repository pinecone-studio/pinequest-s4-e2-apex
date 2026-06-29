export const expToReach = (level: number) => 50 * level * (level - 1);

export const levelForExp = (exp: number) => {
  let level = 1;
  while ((exp || 0) >= expToReach(level + 1)) level++;
  return level;
};

export function expProgress(exp: number) {
  const safe = Math.max(0, exp || 0);
  const level = levelForExp(safe);
  const base = expToReach(level);
  return {
    level,
    current: safe - base,
    needed: expToReach(level + 1) - base,
  };
}

const TIERS = [
  { min: 20, name: 'Алмаз', color: '#5AA9E6', glyph: '💎' },
  { min: 15, name: 'Алт', color: '#E6B84F', glyph: '🥇' },
  { min: 10, name: 'Мөнгө', color: '#9AA7B4', glyph: '🥈' },
  { min: 5, name: 'Хүрэл', color: '#C08457', glyph: '🥉' },
  { min: 1, name: 'Шинэхэн', color: '#8FB487', glyph: '🌱' },
];
export const levelBadge = (level: number) => TIERS.find((t) => level >= t.min) ?? TIERS[TIERS.length - 1];
