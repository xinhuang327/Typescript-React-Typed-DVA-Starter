export function encSuf(encoded) {
    var validation = 0;
    var add = true;
    var x = -3;
    for (var i = 0; i < encoded.length; i++) {
        var c = encoded.charAt(i);
        var v = parseInt(c);
        if (!isNaN(v)) {
            if (add) {
                validation += v * x;
            } else {
                validation -= v * x;
            }
            add = !add;
            x++;
        }
    }
    return ["." + validation.toString(), validation];
}