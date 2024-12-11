const kandidatOsis = [
  {
    id: "osis1",
    nama: "Abdul XI Sija & Rosyid X Tp II",
    visi: "Sekolah Kreatif dan Inovatif",
    foto: "https://via.placeholder.com/150",
  },
  {
    id: "osis2",
    nama: "Araechpaet XI Rpl & Tasya X Dkv",
    visi: "Prestasi dan Karakter Unggul",
    foto: "https://via.placeholder.com/150",
  },
  {
    id: "osis3",
    nama: "Ikhsan XI Tkp II & Adam X Tkr I",
    visi: "Peduli Lingkungan dan Sosial",
    foto: "https://via.placeholder.com/150",
  },
];

const kandidatMpk = [
  {
    id: "mpk1",
    nama: "Rakha XI Dpib",
    visi: "Pengembangan Minat Bakat",
    foto: "https://via.placeholder.com/150",
  },
  {
    id: "mpk2",
    nama: "Kenichi XI TITL",
    visi: "Kepemimpinan dan Keteladanan",
    foto: "https://via.placeholder.com/150",
  },
];

const votingState = { osis: {}, mpk: {} };
let tahapSaatIni = "osis";

function renderKandidat(kandidat, tipe) {
  const container = document.getElementById(
    `kandidat${tipe.charAt(0).toUpperCase() + tipe.slice(1)}`
  );
  container.innerHTML = ""; // Bersihkan kontainer sebelumnya

  kandidat.forEach((k) => {
    const card = document.createElement("div");
    card.className = "kandidat-card";
    card.innerHTML = `
                    <img src="${k.foto}" alt="${k.nama}">
                    <h3>${k.nama}</h3>
                    <p>${k.visi}</p>
                    <button 
                        onclick="vote('${tipe}', '${k.id}')" 
                        class="vote-btn" 
                        id="btn-${k.id}">Pilih
                    </button>
                `;
    container.appendChild(card);
  });
}

function vote(tipe, kandidatId) {
  if (Object.keys(votingState[tipe]).length > 0) {
    alert("Anda sudah memberikan suara!");
    return;
  }

  votingState[tipe][kandidatId] = 1;

  document
    .querySelectorAll(
      `#kandidat${tipe.charAt(0).toUpperCase() + tipe.slice(1)} .vote-btn`
    )
    .forEach((btn) => {
      btn.disabled = true;
    });
  //   rip logika
  if (tipe === "osis") {
    document.getElementById("tahapOsis").style.display = "none";
    document.getElementById("tahapMpk").style.display = "block";
    tahapSaatIni = "mpk";
  } else {
    document.getElementById("tahapMpk").style.display = "none";
    document.getElementById("hasilVoting").style.display = "block";
    tampilkanHasil();
  }
}

function tampilkanHasil() {
  const hasilOsis = document.getElementById("hasilOsis");
  const hasilMpk = document.getElementById("hasilMpk");
  hasilOsis.innerHTML = "<h2>Hasil Voting OSIS</h2>";
  hasilMpk.innerHTML = "<h2>Hasil Voting MPK</h2>";

  ["osis", "mpk"].forEach((tipe) => {
    const kandidatList = tipe === "osis" ? kandidatOsis : kandidatMpk;
    const hasilContainer = tipe === "osis" ? hasilOsis : hasilMpk;
    const totalSuara = Object.values(votingState[tipe]).reduce(
      (a, b) => a + b,
      0
    );

    kandidatList.forEach((k) => {
      const suara = votingState[tipe][k.id] || 0;
      const persentase =
        totalSuara > 0 ? ((suara / totalSuara) * 100).toFixed(1) : 0;

      const progressHTML = `
                        <div class="progress-container">
                            <div class="progress-info">
                                <strong>${k.nama}</strong>
                                <span>${suara} suara (${persentase}%)</span>
                            </div>
                            <div class="progress-bar">
                                <div 
                                    class="progress-bar-fill" 
                                    style="width:0%" 
                                    data-percentage="${persentase}"
                                ></div>
                            </div>
                        </div>
                    `;

      hasilContainer.innerHTML += progressHTML;
    });
  });

  // Animasi progress bar
  setTimeout(() => {
    const progressBars = document.querySelectorAll(".progress-bar-fill");
    progressBars.forEach((bar) => {
      const percentage = bar.getAttribute("data-percentage");
      bar.style.width = `${percentage}%`;
    });
  }, 100);
}

// Inisialisasi
renderKandidat(kandidatOsis, "osis");
renderKandidat(kandidatMpk, "mpk");
