# Steps to run

This project uses workspaces and `concurrently` to run both back and frontend at same time

First run

```
npm install
```

It will install all that's needed both for back and frontend

To run both use

```
npm run start
```

Run backend only

```
npm run dev -w backend
```

Run frontend only

```
npm run dev -w frontend
```
