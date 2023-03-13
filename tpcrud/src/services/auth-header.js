export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.accessToken) {
     // return { Authorization: 'Bearer ' + user.accessToken }; // pour Spring Boot back-end
      return { 'x-access-token': user.accessToken };       // pour Node.js Express back-end
    } else {
      return {};
    }
  }