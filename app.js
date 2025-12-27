// Simple Flower Categorizer SPA (vanilla JS + localStorage)
(() => {
  const LS_KEY = 'flower_categorizer_v1';
  const form = document.getElementById('flower-form');
  const nameInput = document.getElementById('flower-name');
  const categorySelect = document.getElementById('flower-category');
  const listEl = document.getElementById('flower-list');
  const totalCountEl = document.getElementById('total-count');
  const filteredCountEl = document.getElementById('filtered-count');
  const filterSelect = document.getElementById('filter-select');
  const clearBtn = document.getElementById('clear-btn');

  let flowers = [];
  let editingId = null;

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
  }

  function save() {
    localStorage.setItem(LS_KEY, JSON.stringify(flowers));
  }

  function load() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        flowers = JSON.parse(raw);
      } else {
        // seed sample data
        flowers = [
          { id: uid(), name: 'English Rose', category: 'Rose' },
          { id: uid(), name: 'Golden Sun', category: 'Sunflower' },
          { id: uid(), name: 'Spring Tulip', category: 'Tulip' },
          { id: uid(), name: 'Wild Daisy', category: 'Daisy' }
        ];
        save();
      }
    } catch (e) {
      console.error('Failed to load data', e);
      flowers = [];
    }
  }

  function render() {
    const filter = filterSelect.value;
    listEl.innerHTML = '';
    const filtered = flowers.filter(f => filter === 'all' ? true : f.category === filter);
    filtered.forEach(f => {
      const li = document.createElement('li');
      li.className = 'list-item';

      const left = document.createElement('div');
      left.className = 'item-left';

      const name = document.createElement('div');
      name.className = 'item-name';
      name.textContent = f.name;

      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = f.category;

      left.appendChild(name);
      left.appendChild(badge);

      const actions = document.createElement('div');
      actions.className = 'actions';

      const editBtn = document.createElement('button');
      editBtn.className = 'btn edit';
      editBtn.textContent = 'Edit';
      editBtn.onclick = () => startEdit(f.id);

      const delBtn = document.createElement('button');
      delBtn.className = 'btn delete';
      delBtn.textContent = 'Delete';
      delBtn.onclick = () => {
        if (confirm(`Delete "${f.name}"?`)) {
          flowers = flowers.filter(x => x.id !== f.id);
          save();
          render();
        }
      };

      actions.appendChild(editBtn);
      actions.appendChild(delBtn);

      li.appendChild(left);
      li.appendChild(actions);
      listEl.appendChild(li);
    });

    totalCountEl.textContent = `Total: ${flowers.length}`;
    filteredCountEl.textContent = filter === 'all' ? '' : `Showing: ${filtered.length}`;
  }

  function startEdit(id) {
    const item = flowers.find(f => f.id === id);
    if (!item) return;
    nameInput.value = item.name;
    categorySelect.value = item.category;
    editingId = id;
    nameInput.focus();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const category = categorySelect.value;
    if (!name || !category) return;
    if (editingId) {
      const idx = flowers.findIndex(f => f.id === editingId);
      if (idx >= 0) {
        flowers[idx].name = name;
        flowers[idx].category = category;
      }
      editingId = null;
    } else {
      flowers.unshift({ id: uid(), name, category });
    }
    nameInput.value = '';
    categorySelect.value = '';
    save();
    render();
  });

  filterSelect.addEventListener('change', render);

  clearBtn.addEventListener('click', () => {
    if (confirm('Clear all saved flowers?')) {
      flowers = [];
      save();
      render();
    }
  });

  // initialize
  load();
  render();
})();
