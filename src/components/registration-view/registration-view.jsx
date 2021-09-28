import axios from 'axios';
import Proptypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Link } from "react-router-dom";


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

return (
    <Form>
        <Row>
            <Form.Group>
                <Form.Label>Name:</Form.Label>
                <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
                {Object.keys(nameError).map((key) => {
                    return (
                        <div>
                            {nameError[key]}
                        </div>
                    );
                })}
            </Form.Group>
        </Row>

        <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
                {Object.keys(usernameError).map((key) => {
                    return (
                        <div>
                            {usernameError[key]}
                        </div>
                    );
                })}
        </Form.Group>

        <Row>
          <Form.Group>
                <Form.Label>Create Password:</Form.Label>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                {Object.keys(passwordError).map((key) => {
                    return (
                        <div>
                            {passwordError[key]}
                        </div>
                    );
                })}
            </Form.Group>
        </Row>

        <Row>
          <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
                {Object.keys(emailError).map((key) => {
                    return (
                        <div>
                            {emailError[key]}
                        </div>
                    );
                })}
            </Form.Group>
        </Row>
        
          <Form.Group>
                <Form.Label>Birthdate:</Form.Label>
                <Form.Control type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
                {Object.keys(birthdateError).map((key) => {
                    return (
                        <div>
                            {birthdateError[key]}
                        </div>
                    );
                })}
            </Form.Group>
        <span>
            <Button type="submit" onClick={handleSubmit}>Submit</Button>
            <Link to="/">
                <Button variant="secondary" type="button">Back</Button>
            </Link>
        </span>
    </Form>
   );

   export default RegistrationView;
