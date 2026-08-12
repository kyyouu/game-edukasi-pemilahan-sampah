/**
 * Certificate Generator using HTML5 Canvas API
 * Pahlawan Lingkungan – Desa Sukaraja, Kec. Ciawigebang, Kab. Kuningan
 */
export function generateCertificateCanvas(playerName, totalScore, stars) {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 850;
  const ctx = canvas.getContext('2d');

  // Background - Warm Light Gradient
  const grad = ctx.createLinearGradient(0, 0, 1200, 850);
  grad.addColorStop(0, '#FFFDE7');
  grad.addColorStop(0.5, '#E8F5E9');
  grad.addColorStop(1, '#E0F7FA');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 850);

  // Outer Border (Desaverse style hard border)
  ctx.lineWidth = 12;
  ctx.strokeStyle = '#1A1A2E';
  ctx.strokeRect(20, 20, 1160, 810);

  // Inner Gold Border
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#FFC107';
  ctx.strokeRect(36, 36, 1128, 778);

  // Corner Decorations
  const drawCorner = (x, y) => {
    ctx.fillStyle = '#2DB89A';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1A1A2E';
    ctx.lineWidth = 3;
    ctx.stroke();
  };
  drawCorner(50, 50);
  drawCorner(1150, 50);
  drawCorner(50, 800);
  drawCorner(1150, 800);

  // Header Badge
  ctx.fillStyle = '#2DB89A';
  ctx.beginPath();
  ctx.roundRect(400, 70, 400, 48, 24);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#1A1A2E';
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px "Nunito", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SERTIFIKAT PENGHARGAAN', 600, 102);

  // Title
  ctx.fillStyle = '#1A1A2E';
  ctx.font = 'bold 44px "Nunito", sans-serif';
  ctx.fillText('PAHLAWAN LINGKUNGAN', 600, 180);

  ctx.font = 'bold 20px "Nunito", sans-serif';
  ctx.fillStyle = '#455A64';
  ctx.fillText('Desa Sukaraja, Kecamatan Ciawigebang, Kabupaten Kuningan', 600, 220);

  // Divider Line
  ctx.strokeStyle = '#2DB89A';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(350, 250);
  ctx.lineTo(850, 250);
  ctx.stroke();

  // Recipient text
  ctx.fillStyle = '#455A64';
  ctx.font = '22px "Nunito", sans-serif';
  ctx.fillText('Dengan bangga diberikan kepada:', 600, 310);

  // Player Name
  ctx.fillStyle = '#1A1A2E';
  ctx.font = 'bold 54px "Nunito", sans-serif';
  ctx.fillText(playerName.toUpperCase(), 600, 385);

  // Underline player name
  ctx.strokeStyle = '#FFC107';
  ctx.lineWidth = 4;
  ctx.beginPath();
  const textWidth = ctx.measureText(playerName.toUpperCase()).width;
  ctx.moveTo(600 - textWidth / 2 - 20, 405);
  ctx.lineTo(600 + textWidth / 2 + 20, 405);
  ctx.stroke();

  // Achievement Text
  ctx.fillStyle = '#37474F';
  ctx.font = '20px "Nunito", sans-serif';
  ctx.fillText('Atas keberhasilan dan dedikasinya dalam menyelesaikan seluruh babak tantangan', 600, 460);
  ctx.fillText('pengelolaan sampah dan membebaskan Desa Sukaraja dari pencemaran lingkungan.', 600, 495);

  // Score & Stars Box
  ctx.fillStyle = '#FFFFFF';
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#1A1A2E';
  ctx.beginPath();
  ctx.roundRect(400, 540, 400, 100, 16);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#1A1A2E';
  ctx.font = 'bold 24px "Nunito", sans-serif';
  ctx.fillText(`TOTAL SKOR: ${totalScore} XP`, 600, 582);

  // Stars on certificate
  const starStr = '⭐'.repeat(stars);
  ctx.font = '30px sans-serif';
  ctx.fillText(starStr, 600, 622);

  // Date & Signature Placeholders
  const today = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  ctx.fillStyle = '#455A64';
  ctx.font = '18px "Nunito", sans-serif';
  ctx.fillText(`Diterbitkan pada: ${today}`, 600, 690);

  // Footer seal
  ctx.fillStyle = '#2DB89A';
  ctx.font = 'bold 16px "Nunito", sans-serif';
  ctx.fillText('🌿 Program KKN Edukasi Lingkungan Desa Sukaraja 🌿', 600, 780);

  return canvas;
}

export function downloadCertificate(playerName, totalScore, stars) {
  const canvas = generateCertificateCanvas(playerName, totalScore, stars);
  const link = document.createElement('a');
  link.download = `Sertifikat_Pahlawan_Lingkungan_${playerName.replace(/\s+/g, '_')}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
