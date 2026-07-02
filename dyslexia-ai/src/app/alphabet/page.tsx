'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

type LetterData = {
  upper: string;
  lower: string;
};

const MONGOLIAN_ALPHABET: LetterData[] = [
  { upper: 'А', lower: 'а' },
  { upper: 'Б', lower: 'б' },
  { upper: 'В', lower: 'в' },
  { upper: 'Г', lower: 'г' },
  { upper: 'Д', lower: 'д' },
  { upper: 'Е', lower: 'е' },
  { upper: 'Ё', lower: 'ё' },
  { upper: 'Ж', lower: 'ж' },
  { upper: 'З', lower: 'з' },
  { upper: 'И', lower: 'и' },
  { upper: 'Й', lower: 'й' },
  { upper: 'К', lower: 'к' },
  { upper: 'Л', lower: 'л' },
  { upper: 'М', lower: 'м' },
  { upper: 'Н', lower: 'н' },
  { upper: 'О', lower: 'о' },
  { upper: 'Ө', lower: 'ө' },
  { upper: 'П', lower: 'п' },
  { upper: 'Р', lower: 'р' },
  { upper: 'С', lower: 'с' },
  { upper: 'Т', lower: 'т' },
  { upper: 'У', lower: 'у' },
  { upper: 'Ү', lower: 'ү' },
  { upper: 'Х', lower: 'х' },
  { upper: 'Ц', lower: 'ц' },
  { upper: 'Ч', lower: 'ч' },
  { upper: 'Ш', lower: 'ш' },
  { upper: 'Щ', lower: 'щ' },
  { upper: 'Ъ', lower: 'ъ' },
  { upper: 'Ы', lower: 'ы' },
  { upper: 'Ь', lower: 'ь' },
  { upper: 'Э', lower: 'э' },
  { upper: 'Ю', lower: 'ю' },
  { upper: 'Я', lower: 'я' },
];

const VOWELS: LetterData[] = [
  { upper: 'А', lower: 'а' },
  { upper: 'Э', lower: 'э' },
  { upper: 'И', lower: 'и' },
  { upper: 'О', lower: 'о' },
  { upper: 'У', lower: 'у' },
  { upper: 'Ү', lower: 'ү' },
  { upper: 'Е', lower: 'е' },
  { upper: 'Ё', lower: 'ё' },
  { upper: 'Ю', lower: 'ю' },
  { upper: 'Я', lower: 'я' },
];

export default function AlphabetPage() {
  const router = useRouter();
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    // Load progress from localStorage
    const stored = localStorage.getItem('alphabet_progress');
    if (stored) {
      setProgress(JSON.parse(stored));
    }
  }, []);

  const getLetterProgress = (letter: string): number => {
    return progress[letter] || 0;
  };

  const getProgressPercentage = (letter: string): number => {
    const level = getLetterProgress(letter);
    return (level / 3) * 100;
  };

  const handleLetterPress = (letter: LetterData) => {
    setSelectedLetter(letter.upper);
    router.push(`/alphabet/trace?letter=${letter.upper}`);
  };

  const renderLetterCard = (letter: LetterData, index: number) => {
    const level = getLetterProgress(letter.upper);
    const progressPercent = getProgressPercentage(letter.upper);
    const isStarted = level > 0;
    const isSelected = selectedLetter === letter.upper;

    return (
      <button
        key={index}
        onClick={() => handleLetterPress(letter)}
        className={`
          relative flex flex-col items-center justify-between
          bg-white rounded-xl p-3
          border-2 transition-all
          min-h-[100px]
          hover:shadow-lg hover:scale-105
          ${isStarted ? 'border-[#D8C4B0]' : 'border-gray-200'}
          ${isSelected ? 'bg-[#F5EAD8] border-[#C4A08C]' : ''}
        `}
      >
        <div className="text-4xl font-bold text-gray-800 mt-1">
          {letter.upper}
          <span className="text-3xl text-gray-500">{letter.lower}</span>
        </div>

        <div className="w-full mt-2">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D8C4B0] rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="bg-[#5A6C7D] text-white px-8 py-3 rounded-full shadow-md font-bold text-lg tracking-wider">
            ҮСЭГ СУРАХ
          </div>

          <div className="w-10" />
        </div>

        {/* Main Alphabet Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 mb-8">
          {MONGOLIAN_ALPHABET.map((letter, index) =>
            renderLetterCard(letter, index)
          )}
        </div>

        {/* Vowels Section */}
        <div className="mt-8">
          <div className="flex items-center mb-5">
            <div className="flex-1 h-px bg-gray-300" />
            <h2 className="px-4 text-lg font-semibold text-gray-800">
              Эгшиг үсгүүд
            </h2>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-3">
            {VOWELS.map((letter, index) => renderLetterCard(letter, index))}
          </div>
        </div>
      </div>
    </div>
  );
}
