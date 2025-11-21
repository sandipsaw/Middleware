# What is Middleware in Backend?

Middleware is basically a function that runs between the request and the response.

Whenever a client sends a request → before the server sends the final response → many small functions run in the middle.
These functions are called middleware.

Think of middleware as checkpoints or filters.

## Why is Middleware used?

Middleware is used for tasks like:

✔ Logging
Track which request came, at what time.

✔ Authentication
Check if the user is logged in.

✔ Authorization
Check if the user has permission.

✔ Body Parsing
Convert JSON request body into JavaScript object.

✔ Error Handling
Send proper error messages.

✔ Validations
Check if user sent correct data.

Each middleware receives:

req → request object
res → response object
next() → function used to go to the next middleware

## A simple middleware example

Basic logging middleware:
```
function logger(req, res, next) {
    console.log(`Request Method: ${req.method}, URL: ${req.url}`);
    next();  // Move to next middleware or route
}

app.use(logger); // apply middleware to all routes
```
## Another example: Authentication middleware
```
function auth(req, res, next) {
    if (req.headers.token === "12345") {
        next();   // user is allowed
    } else {
        res.status(401).send("Not Authorized");
    }
}

app.get("/dashboard", auth, (req, res) => {
    res.send("Welcome to Dashboard");
});
```
## Real Life Analogy

Imagine you try to enter a mall:
Security check (auth middleware)
Ticket check (authorization middleware)
Bag check (validation middleware)
CCTV recording (logging middleware)
All these steps happen before you reach the main place.
That’s exactly how backend middleware works.

# Types of Middleware in Backend

## 1. Application-level Middleware
These middleware run for all routes in your app.
Used for tasks like:- 1. Logging every request 2. Parsing body 3. Checking tokens (basic authentication) 4. Checking rate limits
```
app.use((req, res, next) => {
    console.log("Application level middleware");
    next();
});
```
This runs for every request → /login, /signup, /profile, etc.

## 2. Router-level Middleware
These middleware are applied to a specific router only, not the whole app.

Useful when you have modules like:
/user , /admin , /products

Example:
```
const router = express.Router();

router.use((req, res, next) => {
    console.log("Router level middleware");
    next();
});
```
app.use("/user", router);

This will run only for /user related routes.

## 3. Built-in Middleware (Express Provided)
Express gives some ready-made middleware.

Parses JSON body into req.body.
app.use(express.json());

Parses form data (HTML form).
app.use(express.urlencoded({ extended: true }));

## 4. Third-party Middleware
These are installed using npm packages to add extra features.

Most common:
✔ cors

Allow frontend + backend communication.
const cors = require("cors");
app.use(cors());

Helps to read cookies.
app.use(cookieParser());

Used for logging incoming requests.
app.use(morgan("tiny"));

Improves security by setting HTTP headers.
app.use(helmet());

## 5. Error-handling Middleware
This middleware catches errors in the server.

💡 It always has 4 parameters: (err, req, res, next)

Example:
```
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
```
Used when: 1. Database fails 2. Invalid data 3. Route crashes 4.Internal server error

## 6. Custom Middleware
These are middleware that you create for your own logic.

Example: custom authentication.
```
function auth(req, res, next) {
    if (req.headers.token === "12345") {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
}

app.use(auth);
```
Examples of custom middleware you might create:
1. Validate email/password 2. Check user role 3. Count request hits
4. Prevent spam 5. Log IP address