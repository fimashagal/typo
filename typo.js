;"use strict";
(function() {
    function Typo() {}

    Typo.prototype.typeOf = function (object = null) {
        return Object.prototype.toString
            .call(object)
            .replace(/^\[object (.+)\]$/, '$1')
            .toLowerCase();
    };

    Typo.prototype.typify = function (object = null) {
        return Object.freeze({
            type: this.typeOf(object),
            object: object
        });
    };

    Typo.prototype.isDef = function (object = null, fnTrue = null, fnFalse = null, fnAfter = null) {
        let response = !/null|undefined/.test(this.typeOf(object)) || (this.typeOf(object) === "number" && !isNaN(object));
        this._eventually(response, fnTrue, fnFalse, fnAfter);
        return response;
    };

    Typo.prototype.isFn = function (object = null, fnTrue = null, fnFalse = null, fnAfter = null) {
        let response = /function/.test(this.typeOf(object));
        this._eventually(response, fnTrue, fnFalse, fnAfter);
        return response;
    };

    Typo.prototype.isNumber = function(object = null, fnTrue = null, fnFalse = null, fnAfter = null){
        let response = this.typeOf(object) === "number" && !isNaN(object) && isFinite(object);
        this._eventually(response, fnTrue, fnFalse, fnAfter);
        return response;
    };

    Typo.prototype.isFloat = function(object = null, fnTrue = null, fnFalse = null, fnAfter = null){
        let response = this.isNumber(object) && /[.]/.test(`${object}`);
        this._eventually(response, fnTrue, fnFalse, fnAfter);
        return response;
    };

    Typo.prototype.isInteger = function(object = null, fnTrue = null, fnFalse = null, fnAfter = null){
        let response = this.isNumber(object) && !/[.]/.test(`${object}`);
        this._eventually(response, fnTrue, fnFalse, fnAfter);
        return response;
    };

    Typo.prototype.isHEX = function(object = null, fnTrue = null, fnFalse = null, fnAfter = null){
        object = object.replace(/[#]|[0x]/g, '');
        let response = parseInt(object, 16).toString(16) === object;
        this._eventually(response, fnTrue, fnFalse, fnAfter);
        return response;
    };

    Typo.prototype.isElement = function(object = null, fnTrue = null, fnFalse = null, fnAfter = null){
        let response;
        try {
            if(typeof object === "string") object = document.querySelector(object);
            response = /^(html)+(.)+(element)$|htmlelement/gm.test(this.typeOf(object));
            this._eventually(response, fnTrue, fnFalse, fnAfter);
            return response;
        } catch(err){
            console.warn(err);
            response = false;
            this._eventually(response, fnTrue, fnFalse, fnAfter);
            return response;
        }

    };

    Typo.prototype.isEmpty = function (object = null, fnTrue = null, fnFalse = null, fnAfter = null) {
        let type = this.typeOf(object),
            response = false;
        if(!this.isDef(object)) return true;
        if(type === "string" && object === ""){
            response = true;
        }
        if(/array|htmlcollection|nodelist/.test(type) && object.length === 0){
            response = true;
        }
        if(/set|map/.test(type) && !object.size){
            response = true;
        }
        if(type === "object" && !Object.keys(object).length){
            response = true;
        }
        if(this.isElement(object) && (!object.children.length && !object.childNodes.length)){
            response = true;
        }
        this._eventually(response, fnTrue, fnFalse, fnAfter);
        return response;
    };

    Typo.prototype.isntEmpty = function (object = null, fnTrue = null, fnFalse = null, fnAfter = null) {
        let response = !this.isEmpty(object);
        this._eventually(response, fnTrue, fnFalse, fnAfter);
        return response;
    };

    Typo.prototype.isChar = function (object = null, fnTrue = null, fnFalse = null, fnAfter = null) {
        let response = this.typeOf(object) === "string" && object.length === 1;
        this._eventually(response, fnTrue, fnFalse, fnAfter);
        return response;
    };

    Typo.prototype.isURL = function (object = null, fnTrue = null, fnFalse = null, fnAfter = null) {
        let response = this.typeOf(object) === "string" && /(https?:\/\/[^\s]+)/g.test(object);
        this._eventually(response, fnTrue, fnFalse, fnAfter);
        return response;
    };

    Typo.prototype.isURI = function (object = null, fnTrue = null, fnFalse = null, fnAfter = null) {
        let response = this.isURL(object) && /([.]+(avi|mp4|ogg|wav|mp3|svg|jpg|jpeg|png|gif|webm|webp|json)$)/.test(object);
        this._eventually(response, fnTrue, fnFalse, fnAfter);
        return response;
    };

    Typo.prototype.isTouch = function(ctx = null, fnTrue = null, fnFalse = null, fnAfter = null){
        if(this.isDef(window)) ctx = window;
        if(!this.isDef(ctx)) return false;
        let response = 'ontouchstart' in ctx || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
        this._eventually(response, fnTrue, fnFalse, fnAfter);
        return response;
    };

    Typo.prototype.isTypeChain = function(collection = [], typeChain = [], fnTrue = null, fnFalse = null, fnAfter = null){
        let response = true;
        let typeOfCollection = this.typeOf(collection);

        if(typeOfCollection === "object") collection = Object.values(collection);

        if(typeOfCollection === "set") collection = [...collection];

        if(collection.length !== typeChain.length || /number|string|boolean|null|undefined/.test(typeOfCollection)) {
            response = false;
        } else {
            for(let i = 0; i < typeChain.length; i++){
                let chain = typeChain[i];
                (chain === "undefined") && (chain = "null");
                if(this.typeOf(collection[i]) !== chain){
                    response = false;
                    break;
                }
            }
        }
        this._eventually(response, fnTrue, fnFalse, fnAfter);
        return response;
    };

    Typo.prototype._eventually = function (condition, fnA, fnB, fnC) {
        (condition === true) ? ((typeof fnA === "function") && fnA()) : ((typeof fnB === "function") && fnB());
        (typeof fnC === "function") && fnC(condition);
    };

    if(window && !window.Typo) window.Typo = new Typo();

})();
