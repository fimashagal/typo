# Typo
Work with any data-types like wizard 🌟

## Identify type main method 

### typeOf

In general for detect basic type use **typeOf** method

```javascript
Typo.typeOf("Hi there!"); // "string"

Typo.typeOf(100); // "number"

Typo.typeOf(null); // null
```

### typify

**typify** detect type like **typeOf**, but for response use object, not string

```javascript
Typo.typify("Hi there!"); // {type "string", object: "Hi there!"}

Typo.typify(null); // {type "null", object: null}
```

## Specific type detect methods 

### isDef

Method **isDef** for detect whether there is an existing object

```javascript
Typo.isDef(-1); // true

Typo.isDef({}); // true

Typo.isDef(null); // false

Typo.isDef(NaN); // false
```

### isFn

Method **isFn** for detect function

```javascript
Typo.isFn(setTimeout); // true

Typo.isFn(() => true); // true
```

### isNumber

Method **isNumber** for detect number in general

```javascript
Typo.isNumber(1); // true

Typo.isNumber(1); // true

Typo.isNumber(NaN); // false

Typo.isNumber(Infinity); // false
```

### isInteger

Method **isInteger** for detect just integer number

```javascript
Typo.isInteger(1); // true

Typo.isInteger(1.1); // false
```

### isFloat

Method **isFloat** for detect just float number

```javascript
Typo.isFloat(1); // false

Typo.isFloat(1.1); // true
```

### isHEX

Method **isHEX** for detect string with heximal number

```javascript
Typo.isHEX("ff0000"); // true

Typo.isHEX("#ff0000"); // true

Typo.isHEX("0xff0000"); // true

Typo.isHEX("ff00zy"); // false

Typo.isHEX("@ff0000"); // false
```

### isElement

Method **isElement** for detect xml element

```javascript
Typo.isElement(document.createElement("div")); // true
```

### isEmpty

Method **isEmpty** for detect content of the anytype object

```javascript
Typo.isEmpty(document.createElement("div")); // true

Typo.isEmpty([]); // true

Typo.isEmpty(new Map()); // true

Typo.isEmpty({a: 1}); // false
```

### isChar

Method **isChar** for detect string contain just single character

```javascript
Typo.isChar("Word"); // false

Typo.isChar("@"); // true
```

### isURL

Method **isURL** for detect http or https links.

```javascript
Typo.isURL("https://google.com"); // true

Typo.isURL("ht1ps://go0g1e.com"); // false
```

### isTouch

Method **isTouch** for detect touch device

```javascript
Typo.isTouch();
```

## Callbacks

Each specific type detect method has three types of callback: call that works if the condition is true, call that works if the condition is false
and call that works anyway

```javascript
function onTrue(){
    // some code...
}

function onFalse(){
    // some code...
}

function onFinal(response){
    // some code and response variable with result...
}

Typo.isURL("https://google.com", onTrue, onFalse, onFinal);
```