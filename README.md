# React Web Audio Graph

Interactive audio graph editor built with [Web Audio API](https://www.w3.org/TR/webaudio/), [React](https://reactjs.org/) and [React Flow](https://reactflow.dev/).

## Basic instructions

1. Add nodes by right-click.
2. Connect nodes by left-click the handle and drag your mouse from source handle to target handle. Or drag existing connections.
3. Select nodes or connections by left-click.
4. Delete nodes or connections by selecting them and pressing Backspace on your keyboard.

All changes to the graph are stored in URL so you can share it. See examples below.

## Examples

- [Simple C major Chord](https://michalochman.github.io/react-web-audio-graph/?project=examples/c-major-chord.json)
- [Low Frequency Oscillator controlling volume of C major chord](https://michalochman.github.io/react-web-audio-graph/?project=examples/c-major-chord-with-lfo.json)
- [Ocean waves](https://michalochman.github.io/react-web-audio-graph/?project=examples/ocean-waves.json)
- [Envelope with Gate Trigger](https://michalochman.github.io/react-web-audio-graph/?project=examples/envelope-with-gate-trigger.json)
- [Keyboard controlling 3 Oscillators with Filter frequency sweep controlled by Low Frequency Oscillator](https://michalochman.github.io/react-web-audio-graph/?project=examples/keyboard.json)
- [Random melody using Noise and Sample / Hold](https://michalochman.github.io/react-web-audio-graph/?project=examples/sample-and-hold.json)
- [Simple arpeggiator with Quantizer](https://michalochman.github.io/react-web-audio-graph/?project=examples/quantizer-arpeggiator.json)
- [XY Pad](https://michalochman.github.io/react-web-audio-graph/?project=examples/xy-pad.json)

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
