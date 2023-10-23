// const { getFontDefinitionFromManifest } = require("next/dist/server/font-utils");

function Debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            // console.log(args,'dd')
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        // console.log(timeout)
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        // console.log(callNow)
        if (callNow) func.apply(context, args);
    };
};
 

export default Debounce