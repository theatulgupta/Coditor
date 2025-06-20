export const htmlBoilerplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>My Project</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <h1>Hello, World!</h1>
  <script src="script.js"></script>
</body>
</html>`;

export const cssBoilerplate = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #f9f9f9;
  color: #333;
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  color: #0070f3;
}`;

export const jsBoilerplate = `document.addEventListener("DOMContentLoaded", function () {
  console.log("Welcome to your new project!");
});`;
