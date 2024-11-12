import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import Checklist from './Checklist';
import DateInput from './DateInput';
import ChecklistRisiko from './ChecklistRisiko';

const PerizinanForm = () => {
  const [formData, setFormData] = useState({
    namaLengkap: '',
    namaLapangan: '',
    nomerHandphone: '',
    kontakDarurat: '',
    jenisKegiatan: '',
    lokasiKegiatan: '',
    jumlahKelompok: '',
    checklistPeralatanKelompok: {
      tenda: false,
      nesting: false,
      kompor: false,
      flysheet: false,
      bahanBakar: false,
      pisauDapur: false,
      parang: false,
      petaKontur: false,
      kompas: false,
      lampuTenda: false,
      webbing: false,
      p3KKelompok: false,
      emergencyBlanket: false,
      avenzaMaps: false,
      handrail: false,
      footprint: false,
      tali: false,
      altimeter: false,
    },
    checklistPeralatanPribadi: {
      carrier: false,
      sleepingBag: false,
      survivalKit: false,
      p3KPribadi: false,
      trashBag: false,
      sepatuHiking: false,
      jasHujan: false,
      pakaianTidur: false,
      pakaianTracking: false,
      jaket: false,
      kaosKaki: false,
      sarungTangan: false,
      trackingPole: false,
      matras: false,
      tumblerMinum: false,
      penutupKepala: false,
      masker: false,
      tissueKering: false,
      sandalJepit: false,
      gaiter: false,
      kacamata: false,
      topi: false,
      bantalTiup: false,
      senterHeadlamp: false,
      powerbank: false,
      jamTangan: false,
    },
    checklistResiko: false,
    tanggalMulai: '',
    tanggalBerakhir: '',
  });

  const [jumlahPeralatanKelompok, setJumlahPeralatanKelompok] = useState(0);
  const [jumlahPeralatanPribadi, setJumlahPeralatanPribadi] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, type, checked } = e.target;

    if (name in formData.checklistPeralatanKelompok) {
      setFormData((prevData) => ({
        ...prevData,
        checklistPeralatanKelompok: {
          ...prevData.checklistPeralatanKelompok,
          [name]: checked,
        },
      }));
    } else if (name in formData.checklistPeralatanPribadi) {
      setFormData((prevData) => ({
        ...prevData,
        checklistPeralatanPribadi: {
          ...prevData.checklistPeralatanPribadi,
          [name]: checked,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : e.target.value,
      });
    }
  };

  useEffect(() => {
    const totalKelompok = Object.values(formData.checklistPeralatanKelompok).filter(Boolean).length;
    setJumlahPeralatanKelompok(totalKelompok);

    const totalPribadi = Object.values(formData.checklistPeralatanPribadi).filter(Boolean).length;
    setJumlahPeralatanPribadi(totalPribadi);
  }, [formData.checklistPeralatanKelompok, formData.checklistPeralatanPribadi]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Cetak PDF setelah delay (simulasi loading)
    setTimeout(() => {
      cetakPDF();
      setLoading(false);
    }, 2000); // Ubah delay sesuai kebutuhan
  };
const cetakPDF = () => {
    const doc = new jsPDF();
    
    // Mengatur font menjadi Times New Roman
    doc.setFont("times");

    // Judul
    doc.setFontSize(14);
    doc.text('SURAT PERNYATAAN', 105, 10, { align: 'center' }); // Center text
    doc.text('KESANGGUPAN MEMENUHI PERATURAN', 105, 15, { align: 'center' }); // Center text
    doc.text('PENDAKIAN & EKSPLORASI GUNUNG HUTAN', 105, 20, { align: 'center' }); // Center text

    // Deskripsi
    doc.setFontSize(10);
    const description = `Mengingat mendaki adalah kegiatan yang beresiko tinggi maka setiap anggota ALPALA Cendrawasih 
yang akan melakukan Pendakian Gunung mengatasnamakan Organisasi maupun tidak
mengatasnamakan organisasi wajib membaca, memahami, dan memenuhi SOP Pendakian Gunung ALPALA Cendrawasih`;
    const descriptionLines = doc.splitTextToSize(description, 190);
    
    // Mengatur posisi deskripsi
    let currentY = 30;
    descriptionLines.forEach(line => {
        doc.text(line, 10, currentY);
        currentY += 6; // Mengurangi jarak antar baris
    });

    // Identitas
    doc.setFontSize(10);
    doc.text(`Nama Lengkap: ${formData.namaLengkap}`, 10, currentY);
    currentY += 6; // Mengurangi jarak antar baris
    doc.text(`Nama Lapangan: ${formData.namaLapangan}`, 10, currentY);
    currentY += 6; // Mengurangi jarak antar baris
    doc.text(`Nomer Handphone: ${formData.nomerHandphone}`, 10, currentY);
    currentY += 6; // Mengurangi jarak antar baris
    doc.text(`Kontak Darurat: ${formData.kontakDarurat}`, 10, currentY);
    currentY += 6; // Mengurangi jarak antar baris
    doc.text(`Jenis Kegiatan: ${formData.jenisKegiatan}`, 10, currentY);
    currentY += 6; // Mengurangi jarak antar baris
    doc.text(`Lokasi Kegiatan: ${formData.lokasiKegiatan}`, 10, currentY);
    currentY += 6; // Mengurangi jarak antar baris
    doc.text(`Jumlah Kelompok: ${formData.jumlahKelompok}`, 10, currentY);
    currentY += 10; // Memberikan sedikit jarak sebelum checklist

    // Tabel Checklist Peralatan Kelompok
    const startY = currentY + 5;
    const columnWidths = [42, 42]; // Lebar kolom total 84 mm
    const columns = ['Nama Alat', 'Status'];

    // Header Tabel
    doc.setFontSize(8);
    doc.autoTable(columns, Object.entries(formData.checklistPeralatanKelompok).map(([key, value]) => [key, value ? '✓' : '✗']), {
        startY: startY,
        theme: 'grid',
        styles: {
            fontSize: 8,
            cellWidth: 'auto', // Membuat sel menyesuaikan ukuran isi
            lineWidth: 0.5,
            lineColor: [0, 0, 0],
            fontStyle: 'normal',
            overflow: 'linebreak',
            halign: 'left',
            valign: 'middle'
        },
        headStyles: {
            fontStyle: 'bold'
        },
        margin: { top: 0, bottom: 0, left: 10, right: 10 },
        columnWidth: columnWidths // Mengatur lebar kolom
    });

    // Pindahkan posisi untuk checklist peralatan pribadi
    const startYPribadi = startY + doc.autoTable.previous.finalY + 10; // Jarak setelah tabel pertama
    const startX = 105; // Posisi horizontal tabel kedua, agar di sebelah kanan

    // Tabel Checklist Peralatan Pribadi
    doc.text(`Checklist Peralatan Pribadi:`, startX, startY);
    
    // Header Tabel
    doc.autoTable(columns, Object.entries(formData.checklistPeralatanPribadi).map(([key, value]) => [key, value ? '✓' : '✗']), {
        startY: startYPribadi,
        startX: startX,
        theme: 'grid',
        styles: {
            fontSize: 8,
            cellWidth: 'auto', // Membuat sel menyesuaikan ukuran isi
            lineWidth: 0.5,
            lineColor: [0, 0, 0],
            fontStyle: 'normal',
            overflow: 'linebreak',
            halign: 'left',
            valign: 'middle'
        },
        headStyles: {
            fontStyle: 'bold'
        },
        margin: { top: 0, bottom: 0, left: 10, right: 10 },
        columnWidth: columnWidths // Mengatur lebar kolom
    });

    // Simpan PDF
    doc.save('form-perizinan.pdf');
};





  const jenisKegiatanOptions = [
    { value: 'Pendakian Bermalam', label: 'Pendakian Bermalam' },
    { value: 'Pendakian Tektok', label: 'Pendakian Tektok' },
    { value: 'Eksplorasi GH', label: 'Eksplorasi GH' },
  ];

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Sistem Perizinan Pendakian & Eksplorasi Gunung Hutan
      </h1>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-lg">Tunggu yaaa...</p>
          <div className="loader mt-4"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <FormInput label="Nama Lengkap" name="namaLengkap" value={formData.namaLengkap} onChange={handleChange} required />
          <FormInput label="Nama Lapangan" name="namaLapangan" value={formData.namaLapangan} onChange={handleChange} required />
          <FormInput label="Nomer Anggota" name="nomerIdentitas" value={formData.nomerAnggota} onChange={handleChange} required />
          <FormInput label="Nomer Handphone" name="nomerHandphone" value={formData.nomerHandphone} onChange={handleChange} required />
          <FormInput label="Kontak Darurat" name="kontakDarurat" value={formData.kontakDarurat} onChange={handleChange} required />
          <FormSelect label="Jenis Kegiatan" name="jenisKegiatan" value={formData.jenisKegiatan} onChange={handleChange} options={jenisKegiatanOptions} required />

          <div className="flex space-x-4">
            <DateInput label="Tanggal Mulai" name="tanggalMulai" value={formData.tanggalMulai} onChange={handleChange} required />
            <DateInput label="Tanggal Berakhir" name="tanggalBerakhir" value={formData.tanggalBerakhir} onChange={handleChange} required />
          </div>

          <FormInput label="Lokasi Kegiatan" name="lokasiKegiatan" value={formData.lokasiKegiatan} onChange={handleChange} required />
          <FormInput label="Jumlah Kelompok" name="jumlahKelompok" value={formData.jumlahKelompok} onChange={handleChange} type="number" required />

          <Checklist 
            checklist={formData.checklistPeralatanKelompok} 
            onChange={handleChange} 
            title={`Checklist Peralatan Kelompok (${jumlahPeralatanKelompok} terpilih)`} 
          />
          <Checklist 
            checklist={formData.checklistPeralatanPribadi} 
            onChange={handleChange} 
            title={`Checklist Peralatan Pribadi (${jumlahPeralatanPribadi} terpilih)`} 
          />
          <ChecklistRisiko 
            checklist={formData.checklistResiko} 
            onChange={handleChange} 
          />
          
          <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default PerizinanForm;
