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

    Typo.prototype.isObject = function (object = null, fnTrue = null, fnFalse = null, fnAfter = null) {
        let condition = /object/.test(this.typeOf(object));
        return this._pipe({ condition, fnTrue, fnFalse, fnAfter });
    };

    Typo.prototype.isObjects = function (...objects) {
        return objects.length ? this._isMarriage(objects, object => this.isObject(object)) : false;
    };

    Typo.prototype.isntObject = function (object = null, fnTrue = null, fnFalse = null, fnAfter = null) {
        let condition = !this.isObject(object);
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

    Typo.prototype.addXType = function (typeName, fnChecker) {
        if((this.isString(typeName) && this.isntEmpty(typeName))
            && !customTypes.hasOwnProperty(typeName)
            && (this.isFn(fnChecker))){
            customTypes[typeName] = fnChecker;
        }
    };

    Typo.prototype.hasXType = function (object, typeName) {
        if((!this.isString(typeName) || this.isEmpty(typeName))
            || !customTypes.hasOwnProperty(typeName)) return false;
        try {
            return Boolean(customTypes[typeName](object));
        } catch (err) {
            return false;
        }

    };

    Typo.prototype.removeXType = function (typeName) {
        if((this.isString(typeName) && this.isntEmpty(typeName)) &&
            customTypes.hasOwnProperty(typeName)){
            delete customTypes[typeName];
        }
    };

    Typo.prototype.hasStruct = function (object, struct) {
        let response = true;
        if(this.isDefs(object, struct) && this.isObjects(object, struct)
            && (this.isntEmpty(object) && this.isntEmpty(struct))){
            for(let [key, value] of Object.entries(struct)){
                if(!object.hasOwnProperty(key) || this.typeOf(object[key]) !== value){
                    response = false;
                }
            }
            for(let key of Object.keys(object)){
                if(!struct.hasOwnProperty(key)){
                    response = false;
                }
            }
        } else {
            response = false;
        }
        return response;
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
