'use client';

import type { IconType } from 'react-icons';
import {
  IoStar,
  IoFlame,
  IoMedal,
  IoBook,
  IoGameController,
  IoLibrary,
  IoVolumeHigh,
  IoMic,
  IoShareSocial,
  IoSparkles,
  IoCloud,
  IoArrowForward,
  IoArrowBack,
  IoSettingsSharp,
  IoPlay,
  IoHeadset,
  IoRepeat,
  IoPerson,
  IoLogOutOutline,
  IoCash,
  IoCamera,
  IoImages,
  IoClose,
} from 'react-icons/io5';
import {
  FaBrain,
  FaRobot,
  FaPuzzlePiece,
  FaHandPointer,
  FaEarListen,
} from 'react-icons/fa6';
import { GiPartyPopper } from 'react-icons/gi';
import { MdRecordVoiceOver, MdDocumentScanner } from 'react-icons/md';

// Аппд ашиглагдах семантик нэрсийг react-icons дүрс рүү буулгана
// (Expo build-ийн @expo/vector-icons map-тай дүйцүүлсэн).
const MAP = {
  star: IoStar,
  coin: IoCash,
  flame: IoFlame,
  medal: IoMedal,
  book: IoBook,
  game: IoGameController,
  library: IoLibrary,
  brain: FaBrain,
  volume: IoVolumeHigh,
  mic: IoMic,
  share: IoShareSocial,
  robot: FaRobot,
  party: GiPartyPopper,
  sparkles: IoSparkles,
  cloud: IoCloud,
  arrowForward: IoArrowForward,
  arrowBack: IoArrowBack,
  settings: IoSettingsSharp,
  play: IoPlay,
  headset: IoHeadset,
  ear: FaEarListen,
  repeat: IoRepeat,
  puzzle: FaPuzzlePiece,
  drag: FaHandPointer,
  voice: MdRecordVoiceOver,
  person: IoPerson,
  logout: IoLogOutOutline,
  camera: IoCamera,
  images: IoImages,
  close: IoClose,
  scan: MdDocumentScanner,
} satisfies Record<string, IconType>;

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
  const Icon = MAP[name];
  return <Icon size={size} color={color} style={{ flexShrink: 0 }} />;
}
