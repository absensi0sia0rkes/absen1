// Generate 108 siswa
const tbody = document.querySelector("#absensi tbody");
for (let i = 1; i <= 108; i++) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${i}</td>
    <td>Siswa ${i}</td>
    <td>
      <select>
        <option value="Hadir">Hadir</option>
        <option value="Sakit">Sakit</option>
        <option value="Izin">Izin</option>
        <option value="Alpa">Alpa</option>
        <option value="Telat">Telat</option>
      </select>
    </td>
  `;
  tbody.appendChild(row);
}

// Export ke Excel
function exportExcel() {
  const rows = document.querySelectorAll("#absensi tbody tr");
  let hadirData = [];
  let konsekuensiData = [];

  rows.forEach(row => {
    const nama = row.cells[1].innerText;
    const status = row.cells[2].querySelector("select").value;

    hadirData.push({Nama: nama, Status: status});

    if (status === "Telat") {
      konsekuensiData.push({Nama: nama, Hukuman: "2x Putaran"});
    } else if (status === "Alpa") {
      konsekuensiData.push({Nama: nama, Hukuman: "5x Putaran"});
    }
  });

  // Gunakan library SheetJS untuk export Excel
  const wb = XLSX.utils.book_new();
  const wsHadir = XLSX.utils.json_to_sheet(hadirData);
  const wsKonsekuensi = XLSX.utils.json_to_sheet(konsekuensiData);

  XLSX.utils.book_append_sheet(wb, wsHadir, "Daftar Hadir");
  XLSX.utils.book_append_sheet(wb, wsKonsekuensi, "Konsekuensi");

  XLSX.writeFile(wb, "Absensi.xlsx");
}
