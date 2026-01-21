import { TrendingUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface BookingCounterProps {
  initialCount?: number;
  incrementAmount?: number;
  intervalSeconds?: number;
}

// interface RollingDigitProps {
//   digit: string;
//   isAnimating: boolean;
// }

// const RollingDigit: React.FC<RollingDigitProps> = ({ digit, isAnimating }) => {
//   return (
//     <span className="inline-block relative overflow-hidden h-[1.2em] align-middle">
//       <span
//         className={`inline-block transition-transform duration-500 ease-out ${
//           isAnimating ? '-translate-y-full' : 'translate-y-0'
//         }`}
//       >
//         <span className="block">{digit}</span>
//         <span className="block">{digit}</span>
//       </span>
//     </span>
//   );
// };

export const BookingCounter: React.FC<BookingCounterProps> = ({
  initialCount = 592,
  incrementAmount = 1,
  intervalSeconds = 10,
}) => {
  const [count, setCount] = useState(initialCount);
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevCount, setPrevCount] = useState(initialCount);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevCount(count);
      setIsAnimating(true);

      // Small delay before incrementing to show the animation
      setTimeout(() => {
        setCount((prevCount) => prevCount + incrementAmount);
      }, 50);

      // Remove animation class after animation completes
      setTimeout(() => {
        setIsAnimating(false);
      }, 600);
    }, intervalSeconds * 1000);

    return () => clearInterval(interval);
  }, [count, incrementAmount, intervalSeconds]);

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  const formattedCount = formatNumber(count);
  const formattedPrevCount = formatNumber(prevCount);

  // Split the number into individual characters (digits and commas)
  const chars = formattedCount.split('');
  const prevChars = formattedPrevCount.split('');

  return (
    <div className="flex items-center justify-center gap-2 text-white">
      <TrendingUp className="w-5 h-5 text-[#07c6e8] bg-white rounded-full p-1 shrink-0" />
      <p className="flex items-center text-sm sm:text-base font-medium whitespace-nowrap">
        {chars.map((char, index) => {
          const prevChar = prevChars[index] || char;
          const shouldAnimate = isAnimating && char !== prevChar;

          if (char === ',') {
            return (
              <span key={`comma-${index}`} className="inline-block">
                ,
              </span>
            );
          }

          return (
            <span
              key={index}
              className="inline-block relative overflow-hidden"
              style={{
                width: '0.6em',
                height: '1em',
                verticalAlign: 'baseline',
              }}
            >
              <span
                className={`inline-block transition-transform duration-500 ease-out ${
                  shouldAnimate ? '-translate-y-full' : 'translate-y-0'
                }`}
              >
                <span
                  className="block"
                  style={{ height: '1em', lineHeight: '1' }}
                >
                  {prevChar}
                </span>
                <span
                  className="block"
                  style={{ height: '1em', lineHeight: '1' }}
                >
                  {char}
                </span>
              </span>
            </span>
          );
        })}
        <span className="inline-block ml-1">appointments booked this week</span>
      </p>
    </div>
  );
};
