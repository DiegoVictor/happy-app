# [App] Happy
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/DiegoVictor/happy-app/config.yml?logo=github&style=flat-square)](https://github.com/DiegoVictor/happy-app/actions)
[![typescript](https://img.shields.io/badge/typescript-3.9.7-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![react-native](https://img.shields.io/badge/react--native-0.63.2-61dafb?style=flat-square&logo=react)](https://reactnative.dev/)
[![styled-components](https://img.shields.io/badge/styled_components-5.2.0-db7b86?style=flat-square&logo=styled-components)](https://styled-components.com/)
[![eslint](https://img.shields.io/badge/eslint-7.11.0-4b32c3?style=flat-square&logo=eslint)](https://eslint.org/)
[![airbnb-style](https://flat.badgen.net/badge/style-guide/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![jest](https://img.shields.io/badge/jest-25.5.4-brightgreen?style=flat-square&logo=jest)](https://jestjs.io/)
[![expo](https://img.shields.io/badge/expo-39.0.3-000000?style=flat-square&logo=expo)](https://expo.io/)
[![coverage](https://img.shields.io/codecov/c/gh/DiegoVictor/happy-app?logo=codecov&style=flat-square)](https://codecov.io/gh/DiegoVictor/happy-app)
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://raw.githubusercontent.com/DiegoVictor/happy-app/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)<br>
This app version allow everyone to see all available orphanages. All the resources used by this application comes from its [`API`](https://github.com/DiegoVictor/happy-api).

## Table of Contents
* [Screenshots](#screenshots)
* [Installing](#installing)
  * [Configuring](#configuring)
    * [.env](#env)
    * [API](#api)
* [Usage](#usage)
  * [Expo](#expo)
  * [OS](#os)
* [Running the tests](#running-the-tests)
  * [Coverage report](#coverage-report)

# Screenshots
Click to expand.<br>
<img src="https://raw.githubusercontent.com/DiegoVictor/happy-app/main/screenshots/map.png" width="32%" />
<img src="https://raw.githubusercontent.com/DiegoVictor/happy-app/main/screenshots/detail.gif" width="31.3%" />
<img src="https://raw.githubusercontent.com/DiegoVictor/happy-app/main/screenshots/select-position.png" width="32%" />
<img src="https://raw.githubusercontent.com/DiegoVictor/happy-app/main/screenshots/create.gif" width="32%" />

# Installing
Easy peasy lemon squeezy:
```
$ yarn
```
Or:
```
$ npm install
```
> Was installed and configured the [`eslint`](https://eslint.org/) and [`prettier`](https://prettier.io/) to keep the code clean and patterned.

## Configuring
Configure your environment variables and remember to start the [API](https://github.com/DiegoVictor/happy-api) before to start this app.

### .env
In this file you may configure the API's url. Rename the `.env.example` in the root directory to `.env` then just update with your settings.

key|description|default
---|---|---
API_URL|API's url with version (v1)|`http://localhost:3333/v1`

### API
Start the [`API`](https://github.com/DiegoVictor/happy-api) (see its README for more information). In case of any change in the API's port or host remember to update the `.env` too.
> Also, maybe you need run reverse command to the API's port: `adb reverse tcp:3333 tcp:3333`

# Usage
To start the app run:
```
$ yarn start
```
Or:
```
$ npm run start
```
> This project was built with [Expo](https://expo.io), to know how to run it in your phone see [Expo client for iOS and Android](https://docs.expo.io/versions/v37.0.0/get-started/installation/#2-mobile-app-expo-client-for-ios) and in your computer see [Running the Expo client on your computer](https://docs.expo.io/versions/v37.0.0/get-started/installation/#running-the-expo-client-on-your-computer).

## OS
This app was tested only with Android through USB connection and [Genymotion](https://www.genymotion.com/) (Emulator), is strongly recommended to use the same operational system, but of course you can use an emulator or a real device connected through wifi or USB.

# Running the tests
[Jest](https://jestjs.io/) was the choice to test the app, to run:
```
$ yarn test
```
Or:
```
$ npm run test
```

## Coverage report
You can see the coverage report inside `tests/coverage`. They are automatically created after the tests run.
