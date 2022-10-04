# reactstrap-toastify

The goal of this library is to expose a basic toast notifications system using
redux pattern and reactstrap UX design. I've found lot of example but I'm in love with
reactstrap graphics and I want to mantain this kind of "basic" graphical user interface.

[You can see a DEMO of what I've done.](https://robyconte.github.io/reactstrap-toastify/)

>

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save reactstrap-toastify
```

Re-configure your store including new reducer:

```jsx
// Import the new store in your redux state:
import { Reducer } from "reactstrap-toastify";
const store = createStore({
  ...
  toast: Reducer,
  ...
})
```

Add Toastify component that will handle notifications for you.

```jsx
// Map the principal component into your app container:
import Toastify from "reactstrap-toastify";

class MyApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <MyAwesomeApp />
        <Toastify />
      </Provider>
    );
  }
}
```

## Usage

Dispatching new notification inside your redux-connected components is really simple:

```jsx
import { Actions } from "reactstrap-toastify";
...

const { dispatch } = this.props;
dispatch(Actions.notify({
  icon: "success",
  title: "Toastify?",
  message: "Toastify is UP & running!",
  color: "success",
  autoClose: 10000,
  dismissable: true
}))

```

## License

MIT © [RoBYCoNTe](https://github.com/RoBYCoNTe)
