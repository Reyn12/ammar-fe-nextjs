const GRID_SIZE = 25;
const FINDER_SIZE = 7;

function isFinderCell(row: number, col: number) {
  const inTop = row < FINDER_SIZE;
  const inBottom = row >= GRID_SIZE - FINDER_SIZE;
  const inLeft = col < FINDER_SIZE;
  const inRight = col >= GRID_SIZE - FINDER_SIZE;
  return (inTop && inLeft) || (inTop && inRight) || (inBottom && inLeft);
}

function isFinderDark(row: number, col: number) {
  const r = row % (GRID_SIZE - FINDER_SIZE) < FINDER_SIZE ? row % 18 : row - 18;
  const c = col >= GRID_SIZE - FINDER_SIZE ? col - 18 : col;
  const edge = r === 0 || r === 6 || c === 0 || c === 6;
  const core = r >= 2 && r <= 4 && c >= 2 && c <= 4;
  return edge || core;
}

function seedFrom(text: string) {
  let hash = 0;
  for (const char of text) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return hash;
}

/** QR placeholder (dummy). Nanti diganti QR asli dari payment gateway */
export function PaymentQrCode({ value }: { value: string }) {
  let seed = seedFrom(value) || 1;
  const nextBit = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return (seed >>> 16) % 2 === 0;
  };

  const cells: React.ReactNode[] = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const finder = isFinderCell(row, col);
      const dark = finder ? isFinderDark(row, col) : nextBit();
      if (dark) {
        cells.push(
          <rect key={`${row}-${col}`} x={col} y={row} width={1} height={1} />,
        );
      }
    }
  }

  return (
    <svg
      viewBox={`-1 -1 ${GRID_SIZE + 2} ${GRID_SIZE + 2}`}
      className="h-48 w-48 rounded-lg bg-white"
      role="img"
      aria-label="Kode QRIS"
      fill="#18181b"
    >
      {cells}
    </svg>
  );
}
