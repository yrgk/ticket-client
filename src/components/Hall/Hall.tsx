import React, { useState } from "react";

type Seat = {
  row: number;
  col: number;
  zone: string | null;
};

type Props = {
  initialRows: number;
  initialCols: number;
  aisles: number[];
  onSave: (seats: Seat[]) => void;
};

const ZONES = {
  vip: { name: "VIP", color: "#FFD700" },
  standard: { name: "Standard", color: "#87CEEB" },
  disabled: { name: "Disabled", color: "#D3D3D3" },
};

export const HallEditor: React.FC<Props> = ({ initialRows, initialCols, aisles, onSave }) => {
  const [selectedZone, setSelectedZone] = useState<keyof typeof ZONES | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);

  const toggleSeat = (row: number, col: number) => {
    if (!selectedZone) return;
    const index = seats.findIndex(s => s.row === row && s.col === col);
    if (index >= 0) {
      const updated = [...seats];
      updated[index].zone = selectedZone;
      setSeats(updated);
    } else {
      setSeats([...seats, { row, col, zone: selectedZone }]);
    }
  };

  const getSeatColor = (row: number, col: number) => {
    const seat = seats.find(s => s.row === row && s.col === col);
    if (seat?.zone) return ZONES[seat.zone as keyof typeof ZONES].color;
    return "#eee";
  };

  const isAisle = (col: number) => aisles.includes(col);

  return (
    <>

    <div className="p-4">
      <h2 className="mb-2 text-xl font-semibold">Редактор схемы</h2>

      <div className="flex gap-2 mb-4">
        {Object.entries(ZONES).map(([key]) => (
          <button
            key={key}
            className={`px-3 py-1 rounded ${selectedZone === key}` ? "ring-2 ring-black" : ""}}
            style={{ backgroundColor: value.color }}
            onClick={() => setSelectedZone(key as keyof typeof ZONES)}
          >
            {value.name}
          </button>
        ))}
      </div>

      <div className="inline-block border border-gray-300 p-2 bg-white">
        {Array.from({ length: initialRows }).map((_, rowIdx) => (
          <div key={rowIdx} className="flex">
            {Array.from({ length: initialCols }).map((_, colIdx) => (
              <div
                key={colIdx}
                onClick={() => toggleSeat(rowIdx + 1, colIdx + 1)}
                className={w-6 h-6 m-0.5 border rounded cursor-pointer}
                style={{
                  backgroundColor: getSeatColor(rowIdx + 1, colIdx + 1),
                  marginRight: isAisle(colIdx + 1) ? 8 : 2,
                }}
                title={Ряд ${rowIdx + 1}, Место ${colIdx + 1}}
              />
            ))}
          </div>
        ))}
      </div>

      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => onSave(seats)}
      >
        Сохранить схему
      </button>

    </div>
    </>
  );
};