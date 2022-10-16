(function() {

    var filter = document.getElementById('colour');

    /* SVG filters */
    if (!filter) {
        filter = document.createElement('div');
        filter.setAttribute('style', 'height: 0; padding: 0; margin: 0; line-height: 0');
        filter.innerHTML = '<svg id="colour"> <defs> <filter id="Protanopia"> <feColorMatrix type="matrix" values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0 0.242,0.758,0,0 0,0,0,1,0" in="SourceGraphic" /> </filter> <filter id="Deuteranopia"> <feColorMatrix type="matrix" values="0.8,0.2,0,0,0 0.258,0.742,0,0,0 0,0.142,0.858,0,0 0,0,0,1,0" in="SourceGraphic" /> </filter> <filter id="Monochromie"> <feColorMatrix type="matrix" values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0" in="SourceGraphic" /> </filter> <filter id="Tritanopia"> <feColorMatrix type="matrix" values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0" in="SourceGraphic" /> </filter> <filter id="Achromatomalie"> <feColorMatrix type="matrix" values="0.618,0.320,0.062,0,0 0.163,0.775,0.062,0,0 0.163,0.320,0.516,0,0 0,0,0,1,0" in="SourceGraphic" /> </filter> </defs> </svg>';
        document.body.appendChild(filter);
    }

    /* User choices */
    var choices = [ "Protanopia", "Deuteranopia", "Tritanopia", "Monochromie", "Achromatomalie" ];
    var token = '';
    for (var x in choices){
        token += (parseInt(x) + 1) + ': ' + choices[x] + '\n ';
    }

    var res = parseInt(prompt(' ' + '0: aucun\n ' + token)) - 1;

    if (res >= choices.length) return; /* If the answer is not in the interval */
    if (isNaN(res))            return; /* If the answer is not a digit/number */
    if (res == -1) {
        document.body.style.filter = "none";
        return;
    }
    res = choices[res];
    if (document.getElementById(res)){
        document.body.style.filter = '!!'.replace(/!!/g,'url(#'+ res +')');
    }else{
        document.body.style.filter = "none";
    }
})();
