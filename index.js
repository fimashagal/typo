"use strict";
(function () {
    Typo.isFloat(4.5, () => alert('It is fn'), () => alert("It isn't fn"));
})();