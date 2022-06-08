let checked = true;
let locked = false;
let wakeLock;

if (window.location.protocol !== 'https:') {
  // location.href = location.href.replace('http://', 'https://');
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
  try {
    locked = !locked;
    if (locked) {
      document.getElementById('buttons').classList.add('enabled');
      wakeLock = await navigator.wakeLock.request('screen');
      console.info('wakeLock acquired', wakeLock);
    } else {
      document.getElementById('buttons').classList.remove('enabled');
      wakeLock = await wakeLock.release('screen');
      console.info('wakeLock released');
    }
  } catch (e) {
    alert('Your browser does not meet the requirements for this to work');
    console.alert(e);
  }
}