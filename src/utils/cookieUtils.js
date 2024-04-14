import { Cookies } from 'react-cookie';

const cookies = new Cookies();

function setCookie(name, value) {
  return cookies.set(name, value);
}

function getCookie(name) {
  return cookies.get(name);
}

function removeCookie(name) {
  return cookies.remove(name);
}

export { setCookie, getCookie, removeCookie };
