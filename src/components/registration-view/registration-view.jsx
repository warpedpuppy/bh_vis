import axios from 'axios';

axios.post('https://stormy-taiga-55813.herokuapp.com/', {
    Username: username,
    Password: password,
    Email: email,
    Birthday: birthday
})
.then(response => {
    const data = response.data;
    console.log(data);
    window.open('/', '_self'); 
    // so the page will open in the current tab
})
.catch(e => {
    console.log('error registering the user')
});