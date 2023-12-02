This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# COMP2140 React Native App

A React Native app developed as part of the final assignment for the COMP2140 course in The University of Queensland. The application, SongTrax Mobile, is a mobile application developed in React Native that allows users to view song samples shared to geographic locations around the world created in the [SongTrax Web App](https://github.com/Abishtu/COMP2140-ReactJS-App). The application involves accessing a remote REST API and displaying its data to the users, it consists of multiple pages to effectively display data from the API to the users.

## Map View

Upon opening the app, users are presented with a map, this displays all locations that contain song samples, identified as a purple circle. If users select one of these circles they're presented with a list of all samples shared to that location, along with the locations name.

|<img src="./screenshots/mapView.png" width="50%"/>|<img src="./screenshots/sampleList.jpg" width="50%"/>|
|:-:|:-:|
|Map View|Samples List|

## Sample View

When a user selects a sample, they are presented with a new page that shows further details of that sample and allows them to preview it.

|<img src="./screenshots/sampleView.jpg" width="30%" />|
|:-:|
|Sample View|

## Profile Page

Users also have the ability to update their in-app profile, this includes selecting a profile name and picture.

|<img src="./screenshots/emptyProfile.jpg" width="50%"/>|<img src="./screenshots/userProfile.jpg" width="50%"/>|
|:-:|:-:|
|Empty Profile|Created Profile|

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
