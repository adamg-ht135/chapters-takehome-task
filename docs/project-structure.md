# 🗄️ Project Structure

Most of the code lives in the `src` folder and looks like this:

## assets

Used for storing static files that need to be compressed such as images, fonts, etc

## components

Used for shared components used across the entire applications such as Buttons or Layouts

## config

Global configuration, env variables etc

## features

In order to scale the application in the easiest and most maintainable way, keep most of the code inside the `features` folder, which should contain different feature-based things. Every `feature` folder should contain domain specific code for a given feature. This will allow you to keep functionalities scoped to a feature and not mix its declarations with shared things. This is much easier to maintain than a flat folder structure with many files.

A feature could have the following structure:

```sh
src/features/awesome-feature
|
+-- api         # exported API request declarations and api hooks related to a specific feature
|
+-- assets      # assets folder can contain all the static files for a specific feature
|
+-- components  # components scoped to a specific feature
|
+-- hooks       # hooks scoped to a specific feature
|
+-- routes      # route components for a specific feature pages
|
+-- stores      # state stores for a specific feature
|
+-- types       # typescript types for TS specific feature domain
|
+-- utils       # utility functions for a specific feature
|
+-- index.ts    # entry point for the feature, it should serve as the public API of the given feature and exports everything that should be used outside the feature
```

Everything from a feature should be exported from the `index.ts` file which behaves as the public API of the feature.

You should import stuff from other features only by using:

`import {AwesomeComponent} from "@/features/awesome-feature"`

and not

`import {AwesomeComponent} from "@/features/awesome-feature/components/AwesomeComponent`

## hooks

shared hooks used across the entire application

## providers

A wrapper used to encapsulate the app using

- react query
- suspense / error boundries
- router
- stores

## routes

Used to specify the routing for the application with common, protected and public routes. The features routes are used here to further specify the routing for each individual feature.

## stores

Used for global state

## tests

test utilities and mock server

## utils

shared utility functions
