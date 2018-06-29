# Typo
Detect any data-type like wizard 🌟

## Methods

### typeOf

In general for detect type use **typeOf** method

```javascript
Typo.typeOf("Hi there!"); // Must return "string"
```

### isDef

Method **isDef** for detect whether there is an existing object

```javascript
Typo.isDef({}); // Must return "true"

Typo.isDef(null); // Must return "false"
```

### isFn

Method **isFn** for detect function

```javascript
Typo.isFn(setTimeout); // Must return "true"

Typo.isFn(() => true); // Must return "true"
```

### isNumber

Method **isNumber** for detect number in general

```javascript
Typo.isNumber(1); // Must return "true"

Typo.isNumber(1, 1.1); // Must return "true"

Typo.isNumber(NaN); // Must return "false"

Typo.isNumber(Infinity); // Must return "false"
```

### isInteger

Method **isInteger** for detect just integer number

```javascript
Typo.isInteger(1); // Must return "true"

Typo.isInteger(1.1); // Must return "false"
```

### isFloat

Method **isFloat** for detect just float number

```javascript
Typo.isFloat(1); // Must return "false"

Typo.isInteger(1.1); // Must return "true"
```

### isHEX

Method **isHEX** for detect string with heximal number

```javascript
Typo.isHEX("ff0000"); // Must return "true"

Typo.isHEX("#ff0000"); // Must return "true"

Typo.isHEX("0xff0000"); // Must return "true"

Typo.isHEX("ff00zy"); // Must return "false"

Typo.isHEX("@ff0000"); // Must return "false"
```

### isElement

Method **isElement** for detect xml element

```javascript
Typo.isElement(document.createElement("div")); // Must return "true"
```

### isEmpty

Method **isEmpty** for detect content of the anytype object

```javascript
Typo.isEmpty(document.createElement("div")); // Must return "true"

Typo.isEmpty([]); // Must return "true"

Typo.isEmpty(new Map()); // Must return "true"

Typo.isEmpty({a: 1}); // Must return "false"
```
