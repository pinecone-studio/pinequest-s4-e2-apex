// 'use client';

// import { useState, useRef, useEffect, Suspense } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { Volume2, RotateCcw, X } from 'lucide-react';

// const ROMANIZATION_MAP: Record<string, string> = {
//   'А': 'a', 'Б': 'b', 'В': 'v', 'Г': 'g', 'Д': 'd', 'Е': 'ye', 'Ё': 'yo',
//   'Ж': 'j', 'З': 'z', 'И': 'i', 'Й': 'y', 'К': 'k', 'Л': 'l', 'М': 'm',
//   'Н': 'n', 'О': 'o', 'Ө': 'ö', 'П': 'p', 'Р': 'r', 'С': 's', 'Т': 't',
//   'У': 'u', 'Ү': 'ü', 'Х': 'kh', 'Ц': 'ts', 'Ч': 'ch', 'Ш': 'sh',
//   'Щ': 'shch', 'Ъ': '"', 'Ы': 'y', 'Ь': "'", 'Э': 'e', 'Ю': 'yu', 'Я': 'ya',
// };

// function TraceLetterContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const letter = searchParams.get('letter') || 'А';

//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [speed, setSpeed] = useState(45);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const romanization = ROMANIZATION_MAP[letter] || '?';
//   const speedMultiplier = speed / 45;

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     // Set canvas size
//     canvas.width = 400;
//     canvas.height = 400;

//     // Draw guidelines
//     ctx.strokeStyle = '#E5E5E5';
//     ctx.setLineDash([5, 5]);
//     ctx.lineWidth = 1;

//     // Horizontal line
//     ctx.beginPath();
//     ctx.moveTo(0, 200);
//     ctx.lineTo(400, 200);
//     ctx.stroke();

//     // Vertical line
//     ctx.beginPath();
//     ctx.moveTo(200, 0);
//     ctx.lineTo(200, 400);
//     ctx.stroke();

//     ctx.setLineDash([]);

//     // Draw background letter
//     ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
//     ctx.font = 'bold 280px "Fredoka", sans-serif';
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'middle';
//     ctx.fillText(letter.toLowerCase(), 200, 220);
//   }, [letter]);

//   const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     setIsDrawing(true);
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     ctx.beginPath();
//     ctx.moveTo(x, y);
//   };

//   const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!isDrawing) return;

//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     ctx.strokeStyle = '#29B6F6';
//     ctx.lineWidth = 8;
//     ctx.lineCap = 'round';
//     ctx.lineJoin = 'round';
//     ctx.lineTo(x, y);
//     ctx.stroke();
//   };

//   const stopDrawing = () => {
//     setIsDrawing(false);
//   };

//   const handleReset = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // Redraw guidelines and background
//     ctx.strokeStyle = '#E5E5E5';
//     ctx.setLineDash([5, 5]);
//     ctx.lineWidth = 1;

//     ctx.beginPath();
//     ctx.moveTo(0, 200);
//     ctx.lineTo(400, 200);
//     ctx.stroke();

//     ctx.beginPath();
//     ctx.moveTo(200, 0);
//     ctx.lineTo(200, 400);
//     ctx.stroke();

//     ctx.setLineDash([]);

//     ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
//     ctx.font = 'bold 280px "Fredoka", sans-serif';
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'middle';
//     ctx.fillText(letter.toLowerCase(), 200, 220);
//   };

//   const playSound = async () => {
//     setIsPlaying(true);
//     // TODO: Integrate Chimege TTS API
//     console.log('Playing sound for:', letter, 'at speed:', speedMultiplier);

//     setTimeout(() => {
//       setIsPlaying(false);
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen bg-[#FFF9F0] p-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <button
//             onClick={() => router.back()}
//             className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Title */}
//         <h1 className="text-3xl font-bold text-center mb-6">Үсэг зур</h1>

//         {/* Letter Info */}
//         <div className="flex items-center justify-center gap-4 mb-6">
//           <button
//             onClick={playSound}
//             disabled={isPlaying}
//             className="w-14 h-14 rounded-xl bg-[#1CB0F6] flex items-center justify-center hover:bg-[#0D9FDB] transition-colors disabled:opacity-50"
//           >
//             <Volume2 size={28} className="text-white" />
//           </button>

//           <div className="flex flex-col items-start">
//             <div className="text-5xl font-bold">
//               {letter}
//               <span className="text-4xl text-gray-600">{letter.toLowerCase()}</span>
//             </div>
//             <div className="text-base text-gray-500">{romanization}</div>
//           </div>
//         </div>

//         {/* Speed Control */}
//         <div className="bg-white rounded-2xl p-5 mb-6 shadow-md">
//           <div className="flex items-center gap-4">
//             <label className="text-sm text-gray-600 w-12">Хурд</label>
//             <input
//               type="range"
//               min="20"
//               max="100"
//               value={speed}
//               onChange={(e) => setSpeed(Number(e.target.value))}
//               className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#29B6F6]"
//             />
//             <span className="text-base font-semibold text-[#29B6F6] w-12 text-right">
//               {speedMultiplier.toFixed(1)}×
//             </span>
//           </div>
//         </div>

//         {/* Canvas */}
//         <div className="flex justify-center mb-6">
//           <div className="relative bg-white rounded-2xl p-2 shadow-lg">
//             <canvas
//               ref={canvasRef}
//               width={400}
//               height={400}
//               onMouseDown={startDrawing}
//               onMouseMove={draw}
//               onMouseUp={stopDrawing}
//               onMouseLeave={stopDrawing}
//               className="border-2 border-gray-200 rounded-xl cursor-crosshair"
//               style={{ touchAction: 'none' }}
//             />
//           </div>
//         </div>

//         {/* Bottom Buttons */}
//         <div className="flex gap-3">
//           <button
//             onClick={handleReset}
//             className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-2xl"
//           >
//             <RotateCcw size={24} />
//           </button>

//           <button
//             onClick={() => router.back()}
//             className="flex-1 h-14 rounded-full bg-[#58CC02] text-white font-bold text-lg hover:bg-[#4CAF00] transition-colors"
//           >
//             ДУУСГАХ
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function TraceLetterPage() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <TraceLetterContent />
//     </Suspense>
//   );
// }
