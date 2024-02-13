export const KEY_ACCESS_TOKEN = "access_token";

//to check it someone is login or not
export function getItem(key) {
  return localStorage.getItem(key);
}

//to  save access token after getting logged in
export function setItem(key, value) {
  localStorage.setItem(key, value);
}

// to remove access token when have to logout
export function removeItem(key) {
  localStorage.removeItem(key);
}
