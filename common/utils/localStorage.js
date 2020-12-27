export function setUserData(data, remember) {
  if (remember) {
    localStorage.setItem('userData', JSON.stringify(data));
    localStorage.setItem('remember', true);
  } else sessionStorage.setItem('userData', JSON.stringify(data));

  document.cookie = `userData = ${JSON.stringify(data)}`;
}

export function getUserData() {
  const sessionData = sessionStorage.getItem('userData');
  if (sessionData) {
    return JSON.parse(sessionData);
  } else {
    const localData = localStorage.getItem('userData');
    const remember = localStorage.getItem('remember');
    if (localData && remember) {
      sessionStorage.setItem('userData', localData);
      return JSON.parse(localData);
    }
    return null;
  }
}

export function clearStorage() {
  localStorage.clear();
  sessionStorage.clear();
  document.cookie = `userData = ${JSON.stringify({})}`;
}
