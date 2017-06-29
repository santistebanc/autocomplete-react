# autocomplete-react
Simple autocomplete react component. Displays a list of suggestions that match the input of the user.

* Demo [http://santistebanc.tk/autocomplete-react/](http://santistebanc.tk/autocomplete-react/)
* Github repo [https://github.com/santistebanc/autocomplete-react](https://github.com/santistebanc/autocomplete-react)

## Features

- Keyboard Navigation to traverse suggestions with `UP` and `DOWN` arrow keys.
- Optional Highlight of matching substrings in suggestions.
- Custom fetch of data through Array, Function or Promise. This way data can be fetched from remote API calls as well as from local resources.
- Allows data suggestions to be optionally sorted by score.


## Setup

### Clone and Install

```bash
git clone https://github.com/santistebanc/autocomplete-react
npm install
```

### Development

Run a local server using webpack-dev for development.

```bash
npm run dev
```

### Production

Run the following command to get the production build.

```bash
npm run build
```

You can then open dist/index.html.

## API

### Props

 All Props are Optional

#### `data: Array | Function( query: String)`
Property containing the data that will be used to populate the suggestions list of the autocomplete. If a Function is used, it will be passed a `query` String containing the input of the user.

The `data` prop can be in either one of these configurations:

#### data as simple static Array

```jsx
<AutoComplete data={['red', 'blue', 'green']}/>
```

#### data as Function returning an Array

```jsx
function fetchFunction(query) {
  return ['red', 'blue', 'green'];
}
<AutoComplete data={fetchFunction}/>
```

#### data as Function returning a Promise that resolves to an Array

```jsx
function fetchPromise(query) {
  return new Promise((resolve, reject) => {
    //get data from API or server
    resolve(['red', 'blue', 'green'])
  });
}
<AutoComplete data={fetchPromise}/>
```

The Array passed may optionally also contain objects of the following form:

`{ title: String, score: Number, matchList: Array }`
- `title` : the string to be displayed in the suggestion
- `score` : a numerical value to sort the suggestions where a smaller number gives higher priority
- `matchList` : an Array listing the substrings that match the query which can be used to have them highlighted. The Array must contain objects of the form:
    
  `{ offset:Number, length:Number }`

  - `offset` : the position index of the matching term
  - `length` : the length of the substring that matches

#### `placeholder: String`
The text that will appear inside the text field by default when the user has not typed any input.

```jsx
<AutoComplete placeholder="type the name of a color"/>
```

#### `highlightMatch: Boolean` (default: `true`)
Whether to show the matching substrings highlighted or not.

```jsx
<AutoComplete highlightMatch={true}/>
```

#### `onChange: Function( text: String )`
Method to be called whenever the value of the text input changes
- `text` : The new value of the text input field

```jsx
function handleChange(text) {
  console.log("changed text to: ", text);
}
<AutoComplete onChange={handleChange}/>
```

#### `onSubmit: Function( text: String )`
Method to be called whenever the user submits the text input or selects a suggestion
- `text` : The new value of the text input field

```jsx
function handleSubmit(text) {
  console.log("user submited: ", text);
}
<AutoComplete onChange={handleSubmit}/>
```

## Technologies Used

The only dependencies are:
- `react`
- `react-dom`

In development the tools used are:
- `webpack` : to bundle the React components and js files together into a single compressed `script.js` file.
- `babel` : to use ES6 and ES7 syntax and compile it to a more compatible vanilla JavaScript

## Author

### Carlos Santisteban
* Online Portfolio: [http://santistebanc.tk/](http://santistebanc.tk/)
* Github profile: [https://github.com/santistebanc/](https://github.com/santistebanc/)
