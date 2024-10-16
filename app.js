const websiteURL = 'https://mpinelikia.xyz';
let cachedPhrases = {};

async function loadPhrasesFromFile(filename) {
  filename = "data/"+filename;
  if (cachedPhrases[filename]) {
    return cachedPhrases[filename];
  }

  try {
    const response = await fetch(filename);
    const data = await response.text();
    const phrases = data.split('\n').filter(line => line.trim() !== '');
    cachedPhrases[filename] = phrases;
    return phrases;
  } catch (error) {
    console.error('Error loading phrases:', error);
    return [];
  }
}

async function initializePhrases() {
  const promises = [
    loadPhrasesFromFile(`partA1.txt`),
    loadPhrasesFromFile(`partA2.txt`),
    loadPhrasesFromFile(`partA3.txt`),
    loadPhrasesFromFile(`partB1.txt`),
    loadPhrasesFromFile(`partB2.txt`),
    loadPhrasesFromFile(`partB3.txt`),
    loadPhrasesFromFile(`partC1.txt`),
    loadPhrasesFromFile(`partC2.txt`),
    loadPhrasesFromFile(`partC3.txt`),
    loadPhrasesFromFile(`partD.txt`),
  ];

  const results = await Promise.all(promises);
  // Store the results for later use
  cachedPhrases.partA1 = results[0];
  cachedPhrases.partA2 = results[1];
  cachedPhrases.partA3 = results[2];
  cachedPhrases.partB1 = results[3];
  cachedPhrases.partB2 = results[4];
  cachedPhrases.partB3 = results[5];
  cachedPhrases.partC1 = results[6];
  cachedPhrases.partC2 = results[7];
  cachedPhrases.partC3 = results[8];
  cachedPhrases.partD = results[9];
}

async function generatePhrase() {
  const gender = document.getElementById("gender").value;
  const rndA = cachedPhrases[`partA${gender}`][Math.floor(Math.random() * cachedPhrases[`partA${gender}`].length)];
  const randomA = rndA.charAt(0).toUpperCase() + rndA.slice(1);
  const randomB = cachedPhrases[`partB${gender}`][Math.floor(Math.random() * cachedPhrases[`partB${gender}`].length)];
  const randomC = cachedPhrases[`partC${gender}`][Math.floor(Math.random() * cachedPhrases[`partC${gender}`].length)];
  const randomD = cachedPhrases[`partD`][Math.floor(Math.random() * cachedPhrases[`partD`].length)];

  const phrase = `${randomA} ${randomB} ${randomC} ${randomD}`;
  document.getElementById("phrase").textContent = phrase;
}

// Call initializePhrases() on page load
window.onload = initializePhrases;

function shareOnFacebook() {
  const phrase = document.getElementById("phrase").textContent;
  const shareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteURL)}&quote=${encodeURIComponent(phrase)}`;
  window.open(shareURL, '_blank');
}

function shareOnTwitter() {
  const phrase = document.getElementById("phrase").textContent;
  const shareURL = `https://x.com/intent/tweet?text=${encodeURIComponent(phrase)}&url=${encodeURIComponent(websiteURL)}`;
  window.open(shareURL, '_blank');
}

function shareOnTikTok() {
  // Replace with TikTok's specific sharing URL format
  const phrase = document.getElementById("phrase").textContent;
  const shareURL = `https://www.tiktok.com/share/video/6942042052092014150?text=${encodeURIComponent(phrase)}&url=${encodeURIComponent(websiteURL)}`;
  window.open(shareURL, '_blank');
}

function copyPhrase() {
  const phraseText = document.getElementById('phrase').textContent;
  navigator.clipboard.writeText(phraseText).then(() => {
    alert('Η φράση αντιγράφηκε στο πρόχειρο!');
  }).catch(err => {
    console.error('Σφάλμα αντιγραφής: ', err);
  });
}
