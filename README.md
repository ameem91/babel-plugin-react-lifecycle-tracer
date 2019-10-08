# react-lifecycle-tracer-plugin 

A [babel](https://new.babeljs.io/) plugin that is used to capture [React](https://reactjs.org/) lifecycle method events. It should be used in conjunction with the [react-lifecycle-tracer](https://github.com/ameem91/react-lifecycle-tracer) Chrome Extension.


## Installation
```sh
npm install babel-plugin-react-lifecycle-tracer --save-dev
```

## Usage
Add `"react-lifecycle-tracer"` to your `.babelrc` file. 

**It's highly recommended that you do NOT use this plugin for your production build**. Doing so may cause your bundle size to increase significantly and may also cause application errors. Take a look at the `.babelrc` [env](https://new.babeljs.io/docs/en/next/babelrc.html#env-environment-option) option for instructions on how to configure this. 
