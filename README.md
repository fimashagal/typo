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

## Specific type detect methods 

### isDef

Method **isDef** for detect whether there is an existing object

```javascript
Typo.isDef(-1); // true

Typo.isDef({}); // true

Typo.isDef(null); // false

Typo.isDef(NaN); // false
```

### isntDef

Method **isntDef** for detect whether there is an nonexistent object

```javascript
Typo.isntDef(null); // true

Typo.isntDef({}); // false
```

### isFn

Method **isFn** for detect function

```javascript
Typo.isFn(setTimeout); // true

Typo.isFn(() => true); // true
```

### isntFn

Method **isntFn** for detect not a function

```javascript
Typo.isntFn(setTimeout); // false

Typo.isntFn(null); // true
```

### isString

Method **isString** for detect string

```javascript
Typo.isString("Hello, World!"); // true

Typo.isString(0); // false
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

Typo.isElement("#someId"); // true
```

### isntElement

Method **isntElement** for detect not a element

```javascript
Typo.isntElement('x-tag'); // true
```

### isEmpty

Method **isEmpty** for detect lack of content in the anytype object

```javascript
Typo.isEmpty(document.createElement("div")); // true

Typo.isEmpty([]); // true

Typo.isEmpty(new Map()); // true

Typo.isEmpty({a: 1}); // false
```

### isntEmpty

Method **isntEmpty** for detect availability of content in the anytype object

```javascript
Typo.isntEmpty(document.createElement("div")); // false

Typo.isntEmpty([]); // false

Typo.isntEmpty(new Map()); // false

Typo.isntEmpty({a: 1}); // true
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

### isFacebookBrowser

Method **isFacebookBrowser** for detect Facebook in-app browser

```javascript
Typo.isFacebookBrowser();
```

### isTypeChain

Method **isTypeChain** for compare each array item with item of type-list 

```javascript
Typo.isTypeChain([null, 5], ['null', 'number']); // true

Typo.isTypeChain(["*", false], ['null', 'number']); // false
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


## Multiple type checking

Most of the existing methods have analogues for checking the type of a set of elements without callbacks

### isDefs

```javascript
Typo.isDefs(-1, 2); // true

Typo.isDefs(null, 2); // false
```

### isFns

```javascript
Typo.isFns(() => {}, () => {}); // true

Typo.isFns(() => {}, 2); // false
```

### isStrings

```javascript
Typo.isStrings("alpha", "beta"); // true

Typo.isStrings("gamma", 2); // false
```

### isNumbers

```javascript
Typo.isNumbers(0, 1.2); // true

Typo.isNumbers("gamma", 2); // false
```

### isIntegers

```javascript
Typo.isIntegers(0, 1); // true

Typo.isIntegers(0.1, 2); // false
```

### isFloats

```javascript
Typo.isFloats(0.1, 0.2); // true

Typo.isIntegers(1, .2); // false
```

### isHEXs

```javascript
Typo.isHEXs("ff0000", "#ff0000"); // true

Typo.isHEXs("", "@ff0000"); // false
```

### isElements

```javascript
Typo.isElements("body", document.createElement('div')); // true

Typo.isElements(null, "body"); // false
```

### isEmpties

```javascript
Typo.isEmpties([], {}); // true

Typo.isEmpties([1, 2], {}); // false
```

### isChars

```javascript
Typo.isChars("2", "3"); // true

Typo.isChars("a", "b2"); // false
```

### isURLs

```javascript
Typo.isURLs("https://google.com", "https://gmail.com"); // true

Typo.isURLs(null, "htt"); // false
```


## Custom types

### addType

Set name for register your own type and function-checker

```javascript
Typo.addType("single", value => value.length === 1);
```

### hasType

Compare object type with your custom type

```javascript
Typo.hasType([1], "single"); // true
Typo.hasType(null, "single"); // false
```

### removeType

Use name for delete your own type

```javascript
Typo.removeType("single");
```

### Remember!

'Custom Type' method family not work with native types!

Use 'typeOf' if wan't get native javascript type

Use 'hasType' just if wan't check your own custom type