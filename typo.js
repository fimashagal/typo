;"use strict";
(function() {
    const customTypes = {};

    function Typo() {}

    Typo.prototype.typeOf = function (object = null) {
        return Object.prototype.toString
                .call(object)
                .replace(/^\[object (.+)\]$/, '$1')
                .toLowerCase();
    };

    Typo.prototype.isDef = function (object = null, fnTrue = null, fnFalse = null, fnAfter = null) {
        let condition = !/null|undefined/.test(this.typeOf(object)) || (this.typeOf(object) === "number" && !isNaN(object));
        return this._pipe({ condition, fnTrue, fnFalse, fnAfter });
    };

    Typo.prototype.isDefs = function (...objects) {
        return objects.length ? this._isMarriage(objects, object => this.isDef(object)) : false;
    };

    Typo.prototype.isntDef = function(object = null, fnTrue = null, fnFalse = null, fnAfter = null){
        let condition = !this.isDef(object);
        return this._pipe({ condition, fnTrue, fnFalse, fnAfter });
    };

    Typo.prototype.isFn = function (object = null, fnTrue = null, fnFalse = null, fnAfter = null) {
        let condition = /function/.test(this.typeOf(object));
        return this._pipe({ condition, fnTrue, fnFalse, fnAfter });
    };

    Typo.prototype.isFns = function (...objects) {
        return objects.length ? this._isMarriage(objects, object => this.isFn(object)) : false;
    };

    Typo.prototype.isntFn = function (object = null, fnTrue = null, fnFalse = null, fnAfter = null) {
        let condition = !this.isFn(object);
        return this._pipe({ condition, fnTrue, fnFalse, fnAfter });
    };

    Typo.prototype.isString = function(object = null, fnTrue = null, fnFalse = null, fnAfter = null){
        let condition = typeof object === "string" || object instanceof String;
        return this._pipe({ condition, fnTrue, fnFalse, fnAfter });
    };

    Typo.prototype.isStrings = function (...objects) {
        return objects.length ? this._isMarriage(objects, object => this.isString(object)) : false;
    };

    Typo.prototype.isNumber = function(object = null, fnTrue = null, fnFalse = null, fnAfter = null){
        let condition = this.typeOf(object) === "number" && !isNaN(object) && isFinite(object);
        return this._pipe({ condition, fnTrue, fnFalse, fnAfter });
    };

    Typo.prototype.isNumbers = function (...objects) {
        return objects.length ? this._isMarriage(objects, object => this.isNumber(object)) : false;
    };

    Typo.prototype.isFloat = function(object = null, fnTrue = null, fnFalse = null, fnAfter = null){
        let condition = this.isNumber(object) && /[.]/.test(`${object}`);
        return this._pipe({ condition, fnTrue, fnFalse, fnAfter });
    };

    Typo.prototype.isFloats = function (...objects) {
        return objects.length ? this._isMarriage(objects, object => this.isFloat(object)) : false;
    };

    Typo.prototype.isInteger = function(object = null, fnTrue = null, fnFalse = null, fnAfter = null){
        let condition = this.isNumber(object) && !/[.]/.test(`${object}`);
        return this._pipe({ condition, fnTrue, fnFalse, fnAfter });
    };

    Typo.prototype.isIntegers = function (...objects) {
        return objects.length ? this._isMarriage(objects, object => this.isInteger(object)) : false;
    };

    Typo.prototype.isHEX = function(object = null, fnTrue = null, fnFalse = null, fnAfter = null){
        object = object.replace(/[#]|[0x]/g, '');
        let condition = parseInt(object, 16).toString(16) === object;
        return this._pipe({ condition, fnTrue, fnFalse, fnAfter });
    };

    Typo.prototype.isHEXs = function (...objects) {
        return objects.length ? this._isMarriage(objects, object => this.isHEX(object)) : false;
    };

    Typo.prototype.isElement = function(object = null, fnTrue = null, fnFalse = null, fnAfter = null){
        let condition;
        try {
            if(typeof object === "string") object = document.querySelector(object);
            condition = /^(html)+(.)+(element)$|htmlelement|^(svg)+(.)+(element)$/gm.test(this.typeOf(object));
            return this._pipe({ condition, fnTrue, fnFalse, fnAfter });
        } catch(err){
            condition = false;
            return this._pipe({ condition, fnTrue, fnFalse, fnAfter });
        }
    };

    Typo.prototype.isElements = function (...objects) {
        return objects.length ? this._isMarriage(objects, object => this.isElement(object)) : false;
    };

    Typo.prototype.isntElement = function (object = null, fnTrue = null, fnFalse = null, fnAfter = null) {
        let condition = !this.isElement(object);
        return this._pipe({ condition, fnTrue, fnFalse, fnAfter });
    };

    Typo.prototype.isEmpty = function (object = null, fnTrue = null, fnFalse = null, fnAfter = null) {
        let type = this.typeOf(object),
            condition = false;
        if(!this.isDef(object)) return true;
        if(type === "string" && object === ""){
            condition = true;
        }
        if(/array|htmlcollection|nodelist/.test(type) && object.length === 0){
            condition = true;
        }
        if(/set|map/.test(type) && !object.size){
            condition = true;
        }
        if(type === "object" && !Object.keys(object).length){
            condition = true;
        }
        if(this.isElement(object) && (!object.children.length && !object.childNodes.length)){
            condition = true;
        }
        return this._pipe({ condition, fnTrue, fnFalse, fnAfter });
    };

    Typo.prototype.isEmpties = function (...objects) {
        return objects.length ? this._isMarriage(objects, object => this.isEmpty(object)) : false;
    };

    Typo.prototype.isntEmpty = function (object = null, fnTrue = null, fnFalse = null, fnAfter = null) {
        let condition = !this.isEmpty(object);
        return this._pipe({ condition, fnTrue, fnFalse, fnAfter });
    };

    Typo.prototype.isChar = function (object = null, fnTrue = null, fnFalse = null, fnAfter = null) {
        let condition = this.typeOf(object) === "string" && object.length === 1;
        return this._pipe({ condition, fnTrue, fnFalse, fnAfter });
    };

    Typo.prototype.isChars = function (...objects) {
        return objects.length ? this._isMarriage(objects, object => this.isChar(object)) : false;
    };

    Typo.prototype.isURL = function (object = null, fnTrue = null, fnFalse = null, fnAfter = null) {
        let condition = this.typeOf(object) === "string" && /(https?:\/\/[^\s]+)/g.test(object);
        return this._pipe({ condition, fnTrue, fnFalse, fnAfter });
    };

    Typo.prototype.isURLs = function (...objects) {
        return objects.length ? this._isMarriage(objects, object => this.isURL(object)) : false;
    };

    Typo.prototype.isTouch = function(ctx = null, fnTrue = null, fnFalse = null, fnAfter = null){
        if(this.isDef(window)) ctx = window;
        if(this.isntDef(ctx)) return false;
        let condition = 'ontouchstart' in ctx || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
        return this._pipe({ condition, fnTrue, fnFalse, fnAfter });
    };

    Typo.prototype.isFacebookBrowser = function(ctx = null, fnTrue = null, fnFalse = null, fnAfter = null){
        if(this.isDef(navigator)) ctx = navigator;
        if(this.isntDef(ctx)) return false;
        let userAgent = navigator.userAgent
            || navigator.vendor
            || window.opera,
            condition = /FBAN|FBAV/.test(userAgent);
        return this._pipe({ condition, fnTrue, fnFalse, fnAfter });
    };

    Typo.prototype.isTypeChain = function(collection = [], typeChain = [], fnTrue = null, fnFalse = null, fnAfter = null){
        let condition = true;
        let typeOfCollection = this.typeOf(collection);

        if(typeOfCollection === "object") collection = Object.values(collection);

        if(typeOfCollection === "set") collection = [...collection];

        if(collection.length !== typeChain.length || /number|string|boolean|null|undefined/.test(typeOfCollection)) {
            condition = false;
        } else {
            for(let i = 0; i < typeChain.length; i++){
                let chain = typeChain[i];
                (chain === "undefined") && (chain = "null");
                if(this.typeOf(collection[i]) !== chain){
                    condition = false;
                    break;
                }
            }
        }
        return this._pipe({ condition, fnTrue, fnFalse, fnAfter });
    };

    Typo.prototype.addType = function (typeName, fnChecker) {
        if((this.isString(typeName) && this.isntEmpty(typeName))
            && !customTypes.hasOwnProperty(typeName)
            && (this.isFn(fnChecker))){
            customTypes[typeName] = fnChecker;
        }
    };

    Typo.prototype.hasType = function (object, typeName) {
        if((!this.isString(typeName) || this.isEmpty(typeName))
            || !customTypes.hasOwnProperty(typeName)) return false;
        try {
            return customTypes[typeName](object);
        } catch (err) {
            return false;
        }

    };

    Typo.prototype.removeType = function (typeName) {
        if((this.isString(typeName) && this.isntEmpty(typeName)) &&
            customTypes.hasOwnProperty(typeName)){
            delete customTypes[typeName];
        }
    };

    Typo.prototype._isMarriage = function (array, fnChecker){
        for(let item of array){
            if(!fnChecker(item)){
                return false;
            }
        }
        return true;
    };

    Typo.prototype._pipe = function (options = {}) {
        const {condition, fnTrue, fnFalse, fnAfter } = options;
        this._eventually(condition, fnTrue, fnFalse, fnAfter);
        return condition;
    };

    Typo.prototype._eventually = function (condition, fnA, fnB, fnC) {
        (condition === true) ? ((typeof fnA === "function") && fnA()) : ((typeof fnB === "function") && fnB());
        (typeof fnC === "function") && fnC(condition);
    };



    if(window && !window.Typo) window.Typo = new Typo();

})();
