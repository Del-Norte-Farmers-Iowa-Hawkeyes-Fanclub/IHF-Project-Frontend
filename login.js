// Ensure the DOM content is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for sign-in button click
    document.getElementById('signinBtn').addEventListener('click', async function() {
        let email = document.querySelector('#nameField input[type="email"]').value;
        let password = document.querySelector('#nameField input[type="password"]').value;
        let url = 'http://localhost:6942/api/person/';
        
        const headers = {
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
            headers: { 'Content-Type': 'application/json' },
        };

        try {
            const response = await fetch(url, headers);
            if (!response.ok) {
                throw new Error('Login Failed');
            }
            const data = await response.json();
            const user = data.find(user => user.email === email && user.password === password);
            if (user) {
                console.log('Login Successful');
                document.getElementById('navigation').style.visibility = 'visible';
                document.getElementById('lognav').style.visibility = 'hidden';
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userid', user.username); 
                document.getElementById('SignInError').style.display = 'none';
                window.location.href = '{{site.baseurl}}/game';
            } else {
                console.log('Login Failed');
                localStorage.setItem('userLoggedIn', 'false');
                localStorage.setItem('userid', 'null');
                document.getElementById('SignInError').style.display = 'block';
            }
        } catch (error) {
            console.log(error);
            document.getElementById('SignInError').style.display = 'block';
        }
    });
});