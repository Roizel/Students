import http from "../http_common";

export default function setAuthorizationToken(token, role) {
  if (token, role) {
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete http.defaults.headers.common['Authorization'];
  }
}