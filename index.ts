// const addNumbers = (a: number, b: number): number => {
//     return a + b;
// }

// console.log(addNumbers(5, 10)); // Output: 15

import figlet from "figlet";

const server = Bun.serve({
  port: 3000,
  fetch(request, server) {
    //bun --watch/--hot run index.ts
    //or can even in the package.json scripts add start script as "start": "bun --watch/--hot/default run index.ts"

    // return new Response("Hello from Bun! and now i have changed the code checking --watch how it works and now for the --hot part for hot reloading");

    //or you can add figlet as a dev dependency
    //This is done using figlet to create ASCII art text

    const getURL = new URL(request.url);
    if (getURL.pathname === "/") {
      const message = figlet.textSync("Hello from Bun!", {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      });
      return new Response(`<pre>${message}</pre>`, {
        headers: { "Content-Type": "text/html" },
      });
    }

      if (getURL.pathname === "/about") {
        return new Response("<h1>About Page</h1>", {
          headers: { "Content-Type": "text/html" },
        });
      }

      if(getURL.pathname === "/api/data") {
        return new Response(
          JSON.stringify({ message: "This is some sample data from the API" }),
          {
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      if(getURL.pathname === "/greet") {
        return new Response(Bun.file("./greet.txt"), {
            headers: { "Content-Type": "text/plain" },
        })
      }

      if(getURL.pathname === "/feed") {
        throw new Error("This is a sample error for testing error handling");
      }

      return new Response("<h1>404 Not Found</h1>", {
        status: 404,
      });
    },
    error(err) {
        return new Response (`<pre>${err.message} and \n ${err.stack}</pre>`, {
            headers: { "Content-Type": "text/html" }
        })
    }
  },
);

console.log(`Server running on http://localhost:${server.port}`);