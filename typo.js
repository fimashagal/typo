;"use strict";
(() => {
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

    Typo.prototype.isDef = function (object = null) {
        return !/null|undefined/.test(this.typeOf(object)) && !isNaN(object);
    };

    Typo.prototype.isFn = function (object = null) {
        return /function/.test(this.typeOf(object));
    };

    Typo.prototype.isNumber = function(object = null){
        return this.typeOf(object) === "number" && !isNaN(object) && isFinite(object);
    };

    Typo.prototype.isFloat = function(object = null){
        return this.isNumber(object) && /[.]/.test(`${object}`);
    };

    Typo.prototype.isInteger = function(object = null){
        return this.isNumber(object) && !/[.]/.test(`${object}`);
    };

    Typo.prototype.isHEX = function(object = null){
        object = object.replace(/[#]|[0x]/g, '');
        return parseInt(object, 16).toString(16) === object;
    };

    Typo.prototype.isElement = function(object = null){
        return /^(html)+(.)+(element)$/gm.test(this.typeOf(object));
    };

    Typo.prototype.isEmpty = function (object = null) {
        let type = this.typeOf(object),
            response = false;
        if((type === "string" && object === "")
            || (/array|htmlcollection|nodelist/.test(type) && !object.length)
            || (/set|map/.test(type) && !object.size)
            || (type === "object" && !Object.keys(object).length)
            || (this.isElement(object) && (!object.children.length && !object.childNodes.length))
            || !this.isDef(object) ){
            response = true;
        }

        return response;
    };

    Typo.prototype.isChar = function (object = null) {
        return this.typeOf(object) === "string" && object.length === 1;
    };

    if(window && !window.Typo) window.Typo = new Typo();

})();
