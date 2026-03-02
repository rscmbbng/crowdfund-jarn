fetch('./data/funding.json')
  .then(res => res.json())
  .then(data => {
    const total = data.total;
    let remainder = total;
    const chart = document.querySelector('.chart');

    data.items.forEach(item => {
      remainder -= item.value;
      const span = document.createElement('span');
      span.id = item.id;
      span.className = 'block';
      span.title = item.label;
      span.innerHTML = `<span class="value">${item.value.toLocaleString('sv-SE')}</span>`;
      span.style.width = item.value / total * 100 + '%';
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
