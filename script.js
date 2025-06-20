
const form = document.getElementById('class-form');
const classList = document.getElementById('class-list');

let classes = JSON.parse(localStorage.getItem('classes')) || [];

// Render classes on page load
function renderClasses() {
  classList.innerHTML = '';
  classes.forEach((cls, idx) => {
    const div = document.createElement('div');
    div.className = 'class-item';
    div.style.borderColor = cls.color;

    div.innerHTML = `
      <div class="class-info">
        <strong>${cls.name} (${cls.code})</strong><br/>
        <small>${cls.time}</small>
      </div>
      <button class="delete-btn" data-index="${idx}">Delete</button>
    `;

    classList.appendChild(div);
  });
}

// Add new class
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('class-name').value.trim();
  const code = document.getElementById('class-code').value.trim();
  const color = document.getElementById('class-color').value;
  const time = document.getElementById('class-time').value.trim();

  if (!name || !code || !time) return alert('Please fill all required fields.');

  classes.push({ name, code, color, time });
  localStorage.setItem('classes', JSON.stringify(classes));

  renderClasses();
  form.reset();
  document.getElementById('class-color').value = '#007BFF';
});

// Delete class
classList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const index = e.target.getAttribute('data-index');
    classes.splice(index, 1);
    localStorage.setItem('classes', JSON.stringify(classes));
    renderClasses();
  }
});

renderClasses();
