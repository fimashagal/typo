;"use strict";
(() => {
    function Typo() {}

    Typo.prototype.typeOf = function (object = null) {
        return Object.prototype.toString
                .call(object)
                .replace(/^\[object (.+)\]$/, '$1')
                .toLowerCase();
    };

    Typo.prototype.isDef = function (object = null) {
        return !/null|undefined/.test(this.typeOf(object));
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
        return (parseInt(object, 16).toString(16) === object);
    };

    Typo.prototype.isEmpty = function (object = null) {
        let type = this.typeOf(object),
            response = false;
        if((type === "string" && object === "")
            || (/array|htmlcollection|nodelist/.test(type) && !object.length)
            || (type === "object" && !Object.keys(object).length)
            || !this.isDef(object) ){
            response = true;
        }

        return response;
    };

    if(window && !window.Typo) window.Typo = new Typo();

})();
