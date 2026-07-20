(() => {
  const STORAGE_KEY = 'nora-journey-archive-europe-2026';
  const state = { data: null, selectedDay: 1, editing: false };
  const $ = (selector, context = document) => context.querySelector(selector);
  const escapeHTML = (value = '') => String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));

  async function loadData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (error) { console.warn('Archive data reset:', error); }
    }
    if (window.NORA_ARCHIVE_DATA) return JSON.parse(JSON.stringify(window.NORA_ARCHIVE_DATA));
    throw new Error('无法读取 Archive 数据');
  }

  function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
    showToast('已保存在这台设备');
  }

  function currentDayData() {
    return state.data.days.find(item => item.day === state.selectedDay) || state.data.days[0];
  }

  function renderList() {
    const list = $('[data-archive-list]');
    list.innerHTML = state.data.days.map(item => `
      <button class="archive-day-row ${item.day === state.selectedDay ? 'active' : ''}" data-day="${item.day}" type="button">
        <span class="archive-day-number">${String(item.day).padStart(2,'0')}</span>
        <span class="archive-day-copy"><strong>${escapeHTML(item.city)}</strong><small>${formatDate(item.date)} · ${escapeHTML(item.title)}</small></span>
        <span class="archive-favorite">${item.favorite ? '♥' : ''}</span>
      </button>`).join('');
    list.querySelectorAll('[data-day]').forEach(button => button.addEventListener('click', () => {
      state.selectedDay = Number(button.dataset.day);
      state.editing = false;
      render();
    }));
  }

  function renderViewer(item) {
    const places = item.places.length ? item.places.map(place => `<span>${escapeHTML(place)}</span>`).join('') : '<em>还没有添加地点</em>';
    return `
      <div class="archive-entry-head">
        <div><div class="eyebrow">Day ${item.day} · ${formatDate(item.date)}</div><h2>${escapeHTML(item.title)}</h2><p>${escapeHTML(item.city)} · ${escapeHTML(item.country)}</p></div>
        <button class="favorite-button ${item.favorite ? 'active' : ''}" type="button" data-favorite aria-label="收藏这一天">${item.favorite ? '♥' : '♡'}</button>
      </div>
      <div class="archive-entry-section"><span class="archive-label">Journal</span><div class="journal-copy ${item.journal ? '' : 'empty'}">${item.journal ? paragraphs(item.journal) : '旅程中或回来后，在这里写下当天最想记住的事。'}</div></div>
      <div class="archive-entry-grid">
        <div class="archive-entry-section"><span class="archive-label">Places</span><div class="place-chips">${places}</div></div>
        <div class="archive-entry-section"><span class="archive-label">Expense</span><strong class="expense-value">${escapeHTML(item.expense || '—')}</strong></div>
      </div>
      <div class="archive-actions"><button class="btn primary" type="button" data-edit>编辑这一天</button><button class="btn" type="button" data-export>导出 Archive JSON</button></div>`;
  }

  function renderEditor(item) {
    return `
      <form class="archive-editor" data-editor>
        <div class="archive-editor-head"><div><div class="eyebrow">Editing Day ${item.day}</div><h2>${escapeHTML(item.city)}</h2></div><button class="close-editor" type="button" data-cancel>×</button></div>
        <label><span>标题</span><input name="title" value="${escapeHTML(item.title)}" required maxlength="80"></label>
        <label><span>日记</span><textarea name="journal" rows="10" placeholder="今天最想记住的事情……">${escapeHTML(item.journal)}</textarea></label>
        <div class="archive-form-grid">
          <label><span>地点（用逗号分隔）</span><input name="places" value="${escapeHTML(item.places.join(', '))}" placeholder="Bachalpsee, First Cliff Walk"></label>
          <label><span>花费</span><input name="expense" value="${escapeHTML(item.expense)}" placeholder="CHF 108"></label>
        </div>
        <label class="favorite-check"><input type="checkbox" name="favorite" ${item.favorite ? 'checked' : ''}><span>加入 Favorites</span></label>
        <div class="archive-actions"><button class="btn primary" type="submit">保存</button><button class="btn" type="button" data-cancel>取消</button></div>
      </form>`;
  }

  function renderEntry() {
    const entry = $('[data-archive-entry]');
    const item = currentDayData();
    entry.innerHTML = state.editing ? renderEditor(item) : renderViewer(item);

    $('[data-edit]', entry)?.addEventListener('click', () => { state.editing = true; renderEntry(); });
    entry.querySelectorAll('[data-cancel]').forEach(button => button.addEventListener('click', () => { state.editing = false; renderEntry(); }));
    $('[data-favorite]', entry)?.addEventListener('click', () => { item.favorite = !item.favorite; saveData(); render(); });
    $('[data-export]', entry)?.addEventListener('click', exportJSON);
    $('[data-editor]', entry)?.addEventListener('submit', event => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      item.title = String(form.get('title') || '').trim();
      item.journal = String(form.get('journal') || '').trim();
      item.places = String(form.get('places') || '').split(',').map(value => value.trim()).filter(Boolean);
      item.expense = String(form.get('expense') || '').trim();
      item.favorite = form.get('favorite') === 'on';
      state.editing = false;
      saveData();
      render();
    });
  }

  function renderSummary() {
    const written = state.data.days.filter(item => item.journal.trim()).length;
    const favorites = state.data.days.filter(item => item.favorite).length;
    $('[data-written]').textContent = written;
    $('[data-favorites]').textContent = favorites;
  }

  function render() { renderList(); renderEntry(); renderSummary(); }
  function paragraphs(text) { return text.split(/\n{2,}/).map(p => `<p>${escapeHTML(p).replace(/\n/g,'<br>')}</p>`).join(''); }
  function formatDate(date) { return new Intl.DateTimeFormat('zh-CN',{month:'short',day:'numeric'}).format(new Date(`${date}T12:00:00`)); }
  function exportJSON() {
    const blob = new Blob([JSON.stringify(state.data, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = 'nora-europe-2026-archive.json'; link.click();
    URL.revokeObjectURL(url);
  }
  function showToast(message) {
    const toast = $('[data-toast]');
    toast.textContent = message; toast.classList.add('show');
    clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('show'), 1800);
  }

  loadData().then(data => { state.data = data; render(); }).catch(error => {
    $('[data-archive-entry]').innerHTML = `<p class="archive-error">${escapeHTML(error.message)}。请通过 GitHub Pages 或本地服务器打开网站。</p>`;
  });
})();
