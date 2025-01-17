# Test Mectronix - Frontend

## Environment Variables

The repository has two development environments, one for staging and another for production. An independent file should be created for each environment in the following way:

##### staging

```
.env.staging
```

##### production

```
.env.production
```

This will be the content of the .env file:

```
VITE_API_URL=""                         # Api url
VITE_SECRET_KEY=""                      # Key to use crypto-js
```

## Installation

install dependencies, preferably with npm:

```
npm i
```

## Start

The .env files will be used to initialize their respective environment using the following commands:

##### staging

```
npm run dev
```

##### production

```
npm run start
```

## Folder structure

```
/public                                # Static resources like images, fonts
  ├── images/
  ├── fonts/
  |
/src
  ├── components/                      # Reusable components (buttons, inputs, cards, etc.)
  │   └── Button/
  │       ├── Button.jsx
  │       ├── Button.module.scss
  │       └── index.js                 # Entry file for export the component
  │
  ├── hooks/                           # Custom and reusable hooks
  │   ├── useFetch.js
  │   └── index.js                     # Index file for export de hooks
  │
  ├── services/                        # API calls and another services
  │
  ├── utils/                           # Reusable utility functions (helpers)
  │
  ├── redux/                           # Redux for manage the global state
  │   ├── store.js                     # Store setup
  │   └── features/                    # Redux state related to the Editor
  │
  ├── App.jsx                          # Root component of React
  └── index.js                         # Entry point for the project
```

## Name conventions

- For constants the ideal is named for complete on upper case using the `_` how separator. For example: `NEW_CONSTANT`

- And for the functions and variables we are using camel case and we try to be the more descriptive posible. For example `isContentActive`
