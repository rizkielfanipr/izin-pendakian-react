import React, { useState } from 'react';

const Checklist = ({ checklist, onChange }) => {
  // State untuk menyimpan jumlah alat
  const [jumlahAlat, setJumlahAlat] = useState({});

  const handleAlatChange = (item, value) => {
    // Cek jika value bukan angka
    if (!value) {
      // Jika kosong, simpan sebagai kosong
      setJumlahAlat((prev) => ({
        ...prev,
        [item]: '',
      }));
    } else {
      const numberValue = Math.max(parseInt(value), 0); // Pastikan tidak ada angka negatif
      setJumlahAlat((prev) => ({
        ...prev,
        [item]: numberValue,
      }));
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-md font-semibold mb-2">List Peralatan Kelompok</h2>
      <div className="flex">
        {/* Kolom Kiri */}
        <div className="flex-1 border-r border-gray-300 pr-4">
          {Object.keys(checklist)
            .slice(0, Math.ceil(Object.keys(checklist).length / 2))
            .map((item) => (
              <div key={item} className="flex items-center justify-between border-b border-gray-300 p-2">
                <input
                  type="checkbox"
                  name={item}
                  checked={checklist[item]}
                  onChange={onChange}
                  className="mr-2"
                />
                <span className="flex-1 text-sm">
                  {item.charAt(0).toUpperCase() + item.slice(1).replace(/([A-Z])/g, ' $1')}
                </span>
                <input
                  type="number"
                  value={jumlahAlat[item] === undefined ? 0 : jumlahAlat[item]} // Tampilkan 0 jika tidak ada value
                  onChange={(e) => handleAlatChange(item, e.target.value)} // Ambil value dari input
                  className="w-16 text-center border border-gray-300 rounded-lg p-1"
                />
              </div>
            ))}
        </div>

        {/* Kolom Kanan */}
        <div className="flex-1 pl-4">
          {Object.keys(checklist)
            .slice(Math.ceil(Object.keys(checklist).length / 2))
            .map((item) => (
              <div key={item} className="flex items-center justify-between border-b border-gray-300 p-2">
                <input
                  type="checkbox"
                  name={item}
                  checked={checklist[item]}
                  onChange={onChange}
                  className="mr-2"
                />
                <span className="flex-1 text-sm">
                  {item.charAt(0).toUpperCase() + item.slice(1).replace(/([A-Z])/g, ' $1')}
                </span>
                <input
                  type="number"
                  value={jumlahAlat[item] === undefined ? 0 : jumlahAlat[item]} // Tampilkan 0 jika tidak ada value
                  onChange={(e) => handleAlatChange(item, e.target.value)} // Ambil value dari input
                  className="w-16 text-center border border-gray-300 rounded-lg p-1"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Checklist;
