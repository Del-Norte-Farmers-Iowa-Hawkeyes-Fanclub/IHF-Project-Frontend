var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload() {
    // Preload assets like images or spritesheets if needed
}

function create() {
    // Display login form
    var loginForm = this.add.dom(400, 300).createFromHTML(`
        <div style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
            <h2>Login</h2>
            <input type="text" id="username" placeholder="Username"><br><br>
            <input type="password" id="password" placeholder="Password"><br><br>
            <button id="loginBtn">Login</button>
            <p id="errorText" style="color: red;"></p>
        </div>
    `);

    // Add event listener to login button
    loginForm.addListener('click');

    loginForm.on('click', function (event) {
        if (event.target.id === 'loginBtn') {
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            
            // Check if username and password match
            if (username === 'admin' && password === 'password') {
                // Successful login, redirect to main game scene or do something else
                console.log('Login successful!');
                // For demonstration, saving the login state in localStorage
                localStorage.setItem('loggedIn', true);
                // Redirect to another scene or display a success message
            } else {
                // Display error message
                document.getElementById('errorText').innerText = 'Invalid username or password';
            }
        }
    });
}