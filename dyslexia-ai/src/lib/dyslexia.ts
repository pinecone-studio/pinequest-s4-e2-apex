// Дислекси шалгалтын даалгаврын төрөл бүр нэг ур чадварыг хэмждэг.
// Энэ модуль нь төрөл → шошго/зөвлөмжийн харгалзааг нэг дор төвлөрүүлж,
// тестийн үр дүн болон дасгалын дэлгэц хоёулаа ашиглана (нэг эх сурвалж).

export type SkillArea =
  | 'sound-matching'
  | 'syllable-counting'
  | 'sound-blending'
  | 'sentence-repetition'
  | 'mirror-discrimination'
  | 'orientation';

export type SkillMeta = {
  /** Богино шошго (banner, chip) */
  label: string;
  emoji: string;
  /** Энэ ур чадвар сул байвал хичээлд тавих анхаарал */
  focus: string;
  /** Эцэг эх/хүүхдэд өгөх дасгалын зөвлөмж */
  tip: string;
};

export const SKILL_AREAS: Record<SkillArea, SkillMeta> = {
  'sound-matching': {
    emoji: '🔤',
    label: 'Авиа таних',
    focus: 'Үгийн эхний авиаг ялгах',
    tip: 'Үг бүрийн эхний авиаг хамт чанга хэлж, ижил авиагаар эхэлдэг үгсийг хайж тоглоорой.',
  },
  'syllable-counting': {
    emoji: '👏',
    label: 'Үе тоолох',
    focus: 'Үгийг үеэр тасдах',
    tip: 'Үгийг хэлэхдээ үе бүрд алга таших — «тэ-мээ» гэх мэт — дасгал хийгээрэй.',
  },
  'sound-blending': {
    emoji: '🧩',
    label: 'Авиа нийлүүлэх',
    focus: 'Тусдаа авиануудыг үг болгон нийлүүлэх',
    tip: 'Авиануудыг удаан хэлээд дараа нь хурдан нийлүүлж үг болгох тоглоом тоглоорой.',
  },
  'sentence-repetition': {
    emoji: '🗣️',
    label: 'Сонсголын ой',
    focus: 'Сонссон өгүүлбэрээ давтах',
    tip: 'Богино өгүүлбэр хэлээд хүүхдээр дагуулж давтуул, аажмаар уртасгаарай.',
  },
  'mirror-discrimination': {
    emoji: '🪞',
    label: 'Дүрс ялгах',
    focus: 'Толин адил дүрс/үсгийг ялгах',
    tip: 'б-д, э-е мэт төстэй үсгүүдийг хажуу хажууд нь тавьж ялгуулах дасгал хийгээрэй.',
  },
  orientation: {
    emoji: '🧭',
    label: 'Чиглэл таних',
    focus: 'Баруун/зүүн, дээш/доош чиглэл',
    tip: 'Өдөр тутам «баруун гар», «зүүн чих» гэх мэт чиглэлийн тоглоом тоглоорой.',
  },
};

export const SKILL_ORDER: SkillArea[] = [
  'sound-matching',
  'syllable-counting',
  'sound-blending',
  'sentence-repetition',
  'mirror-discrimination',
  'orientation',
];

/** Зөвхөн бидний мэддэг төрлүүдийг шүүж, дэс дарааллаар нь буцаана. */
export function normalizeWeakAreas(areas?: string[] | null): SkillArea[] {
  if (!areas?.length) return [];
  const set = new Set(areas);
  return SKILL_ORDER.filter((a) => set.has(a));
}
