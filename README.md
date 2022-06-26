# todo app

### VueJs Web App With Typescript And Clean Architecture


# Environment setup
1. Make sure Node 12+ has been installed.

# Run the application locally
### 1. Go to the project folder and then install all dependencies.
```shell
npm install
or
yarn install
```
### 2. To run the application and mock server together:
```shell
npm run dev
or
yarn dev
```

### 3. To run the application locally:
```shell
npm run serve
or
yarn serve
```
### 4. To run the mock server:
```shell
npm run db
or
yarn db
```
### 5. To build the application and minifies for production:
```shell
npm run build
or
yarn build
```

### 6. Lints and fixes files :
```shell
npm run lint
or
yarn lint
```

# Application design
- Language: Typescript
- Framework: Vue Js (version 2)
- State management: Vuex
- UI Framework: Pure css with scss syntax
- HTTP Client: Axios
- Router: vue-router
- Lint: ESLint with standard configurations
- REST API: json-server for mock rest api

# Clean Architecture
This project is built on Clean Architecture
In this Architecture software divides into multiple layers within dependency rules:
1. Entities layer: encapsulates enterprise wide business rules. An entity can be an object with methods, or it can be a set of data structures and functions.
2. Services layer: encapsulates and implements all of use cases of the system.
3. Ui layer: contains set of components and pages and layouts for user interaction
4. State Management layer: It refers to managing the state of one or several user interface control systems like that of radio controls, action buttons, input fields, etc.

In this architecture all module encapsulated with other modules and each model has own services,entities,ui and router.
# Project structure
```
.
└──src
    ├──app                  # Main file of project (global configs and etc here)
    ├──core                 # Each external modules and wrappers config here
    │    ├──constatns       # Contains application constant like base url , endpoints url and ...
    │    ├──di              # Config dependency injection and injectable services for use in views
    │    ├──httpClient      # Create wrapper for axios, interceptors and error handlers must be here
    │    ├──localization    # Hardcode strings must be here for multi language support
    │    ├──store           # Config Vuex here
    │    ├──vueModular      # Clean arch config here
    │    └──...             
    ├──router               # middlewares and route controllers here (vue-router)
    ├──uikit                # all app assests and resource here like icons,css,images and ...
    ├──home                 # This module contains home page ui,service,store management and etc needed in home
    │    ├──components      # Home page components
    │    ├──ui              # Home page design
    │    ├──entities        # Home page entities
    │    ├──router          # Home page routes
    │    ├──store           # Home pages states
    │    ├──services        # Home page services
    │               
```
