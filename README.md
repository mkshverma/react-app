# react-app
An sample MERN stack app, build to create a blogging website with all features a blog can have.

Technologies used: 
Node.js
Expressjs framework
Mongoose ODM

Its an MVC structured application.

All the routes are written in `routes/index.js` and corressponding controller is written in the `controllers/` folder.
All configuration can be stored in `config/index.js`
Mongoose Data models can be created in `models/` folder.
If you require to create any middleware it can be created in `middleware/` folder.

I am using `express-validator` for data validation, `crypto` for password hashing, and `jsonwebtoken` library for creating tokens.