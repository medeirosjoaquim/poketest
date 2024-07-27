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

### About caching

This app is using sqlite to do a simple caching and reduce requests and latency. Because the API is not likely to change,
cache invalidation was not considered in the scope of this project.

### About Frontend state

Given that this is a simple project, to add libraries for state control would be an overhead. So it just
uses localStorage when it's needed (e.g to keep track of user current page in case of refreshes)
