const SHEET_ID = '2PACX-1vSQS9UzTIvJv6WDBx-2bd3i7eCaxU-wWnHwX-hFNmA1bpHqrjHXVuGnqNMGw6Pll-hge587iMRIPaXT';
const GID_ID = '1308576484';
const FUNDING_URL = `https://docs.google.com/spreadsheets/d/e/${SHEET_ID}/pub?output=csv`;
const CONTENT_URL = `https://docs.google.com/spreadsheets/d/e/${SHEET_ID}/pub?output=tsv&gid=${GID_ID}`;

Promise.all([
  fetch(FUNDING_URL).then(r => r.text()),
  fetch(CONTENT_URL).then(r => r.text())
]).then(([fundingCsv, contentTsv]) => {

  // --- Text content CMS ---
  const contentRows = contentTsv.trim().split('\n').slice(1);
  const content = {};
  contentRows.forEach(row => {
    const [key, ...rest] = row.split('\t');
    content[key.trim()] = rest.join('\t').trim();
    const el = document.querySelector(`[data-cms="${key.trim()}"]`);
    if (el) el.innerHTML = rest.join('\t').trim();
  });

  // --- Funding chart ---
  const total = parseInt(content['total']) || 1600000;
  const rows = fundingCsv.trim().split('\n').slice(1);
  let remainder = total;
  const chart = document.querySelector('.chart');

  rows.forEach(row => {
    const [id, label, value] = row.split(',');
    const num = parseInt(value);
    remainder -= num;
    const span = document.createElement('span');
    span.id = id.trim();
    span.className = 'block';
    span.title = label.trim();
    span.innerHTML = `<span class="value">${num.toLocaleString('sv-SE')}</span>`;
    span.style.width = num / total * 100 + '%';
    chart.appendChild(span);
  });

  const saknas = document.createElement('span');
  saknas.id = 'saknas';
  saknas.className = 'block';
  saknas.title = 'Saknas';
  saknas.innerHTML = `<span class="value">${remainder.toLocaleString('sv-SE')}</span>`;
  saknas.style.width = remainder / total * 100 + '%';
  chart.appendChild(saknas);

});
