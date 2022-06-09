const WAKELOCK_TARGET = 'screen';
const WAKELOCK_KEEPALIVE_TIMEOUT = 60000;
let checked = true;
let locked = false;
let wakeLock;
let interval;

if (window.location.protocol !== 'https:') {
  location.href = location.href.replace('http://', 'https://');
}

const toggleVisibility = () => {
  checked = !checked;
  if (!checked) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}

const toggleLock = async () => {
  locked = !locked;
  if (locked) {
    await acquireLock();
  } else {
    await releaseLock();
  }
}

const acquireLock = async () => {
  if (interval && locked && checked) {
    toggleVisibility();
    await releaseLock();
  }

  wakeLock = await navigator.wakeLock.request(WAKELOCK_TARGET);
  console.info('wakeLock acquired', wakeLock);
  document.getElementById('buttons').classList.add('enabled');

  interval = setInterval(async () => {
    wakeLock = await navigator.wakeLock.request(WAKELOCK_TARGET);
    console.info('wakeLock maintained', wakeLock);
  }, WAKELOCK_KEEPALIVE_TIMEOUT);
}

const releaseLock = async () => {
  document.getElementById('buttons').classList.remove('enabled');

  wakeLock = await wakeLock.release(WAKELOCK_TARGET);
  console.info('wakeLock released');

  clearInterval(interval);
  interval = null;
}