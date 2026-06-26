
export type WordStatus = { word: string; ok: boolean };
export type DiffResult = {
  words: WordStatus[]; 
  total: number;
  correct: number;
  wrong: number;
  wrongWords: string[]; // алдаатай/орхисон үгс
  heard: string; // STT-ийн буулгасан текст
};

function normalize(w: string): string {
  return w.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
}

function tokenize(s: string): string[] {
  return s.split(/\s+/).map((w) => w.trim()).filter(Boolean);
}

// LCS — зорилтот үгсээс хэдийг нь буулгасан текстээс олж тааруулсныг тэмдэглэнэ.
function matchedTargetIndices(target: string[], heard: string[]): Set<number> {
  const a = target.map(normalize);
  const b = heard.map(normalize);
  const n = a.length;
  const m = b.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const matched = new Set<number>();
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      matched.add(i);
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      i++;
    } else {
      j++;
    }
  }
  return matched;
}

export function diffReading(target: string, heard: string): DiffResult {
  const targetWords = tokenize(target);
  const heardWords = tokenize(heard);
  const matched = matchedTargetIndices(targetWords, heardWords);

  const words: WordStatus[] = targetWords.map((word, idx) => ({
    word,
    ok: matched.has(idx),
  }));
  const wrongWords = words.filter((w) => !w.ok).map((w) => w.word);

  return {
    words,
    total: targetWords.length,
    correct: matched.size,
    wrong: targetWords.length - matched.size,
    wrongWords,
    heard: heard.trim(),
  };
}
