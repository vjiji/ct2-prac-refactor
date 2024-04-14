function setLocalStorage(accessToken) {
  return localStorage.setItem('accessToken', accessToken);
}

function getLocalStorage() {
  return localStorage.getItem('accessToken');
}

function removeLocalStorage() {
  return localStorage.removeItem('accesssToken');
}

export { setLocalStorage, getLocalStorage, removeLocalStorage };
