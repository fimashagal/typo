# Typo
Detect any data-type like wizard 🌟

## Methods

### typeOf

In general for detect type use **typeOf** method

```javascript
Typo.typeOf("Hi there!"); // Must return "string"
```

It's not all, also you can use another methods



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
