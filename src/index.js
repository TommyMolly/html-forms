import './styles.css';

const button = document.getElementById('popoverBtn');
let popover = null;

button.addEventListener('click', () => {
  if (popover) {
    popover.remove();
    popover = null;
    return;
  }
  popover = document.createElement('div');
  popover.classList.add('popover');

  const header = document.createElement('div');
  header.classList.add('popover-header');
  header.textContent = 'Popover title';

  const body = document.createElement('div');
  body.classList.add('popover-body');
  body.textContent = "And here's some amazing content. It's very engaging. Right?";

  popover.appendChild(header);
  popover.appendChild(body);
  document.body.appendChild(popover);

  const btnRect = button.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();

  const top = window.scrollY + btnRect.top - popoverRect.height - 10;
  const left = window.scrollX + btnRect.left + (btnRect.width / 2) - (popoverRect.width / 2);

  popover.style.top = `${top}px`;
  popover.style.left = `${left}px`;
});

document.addEventListener('click', (e) => {
  if (popover && !popover.contains(e.target) && e.target !== button) {
    popover.remove();
    popover = null;
  }
});
