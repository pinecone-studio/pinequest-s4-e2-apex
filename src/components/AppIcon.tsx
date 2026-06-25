import React from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Аппд ашиглагдах emoji-нуудыг нэг семантик нэрээр vector icon руу буулгана.
// (Тест дэлгэцийн emoji-г санаатайгаар хөндөөгүй.)
const MAP = {
  star: { lib: 'ion', name: 'star' },
  coin: { lib: 'mci', name: 'hand-coin' },
  flame: { lib: 'ion', name: 'flame' },
  medal: { lib: 'ion', name: 'medal' },
  book: { lib: 'ion', name: 'book' },
  game: { lib: 'ion', name: 'game-controller' },
  library: { lib: 'ion', name: 'library' },
  brain: { lib: 'mci', name: 'brain' },
  volume: { lib: 'ion', name: 'volume-high' },
  mic: { lib: 'ion', name: 'mic' },
  share: { lib: 'ion', name: 'share-social' },
  robot: { lib: 'mci', name: 'robot-happy-outline' },
  party: { lib: 'mci', name: 'party-popper' },
  sparkles: { lib: 'ion', name: 'sparkles' },
  cloud: { lib: 'ion', name: 'cloud' },
  arrowForward: { lib: 'ion', name: 'arrow-forward' },
  arrowBack: { lib: 'ion', name: 'arrow-back' },
  settings: { lib: 'ion', name: 'settings-sharp' },
  play: { lib: 'ion', name: 'play' },
  headset: { lib: 'ion', name: 'headset' },
  ear: { lib: 'mci', name: 'ear-hearing' },
  repeat: { lib: 'ion', name: 'repeat' },
  puzzle: { lib: 'mci', name: 'puzzle' },
  drag: { lib: 'mci', name: 'gesture-tap-hold' },
  voice: { lib: 'mci', name: 'account-voice' },
  person: { lib: 'ion', name: 'person' },
  logout: { lib: 'ion', name: 'log-out-outline' },
} as const;

export type AppIconName = keyof typeof MAP;

export default function AppIcon({
  name,
  size = 22,
  color,
}: {
  name: AppIconName;
  size?: number;
  color?: string;
}) {
  const m = MAP[name];
  if (m.lib === 'mci') {
    return <MaterialCommunityIcons name={m.name as any} size={size} color={color} />;
  }
  return <Ionicons name={m.name as any} size={size} color={color} />;
}
