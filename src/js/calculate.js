function calculate(val1, operator, val2) {
    smileyCounter = 0;
    val1 = parseFloat(val1);
    val2 = parseFloat(val2);
    var result;
    if (operator == '+') result = val1 + val2;
    else if (operator == '-') result = val1 - val2;
    else if (operator == '×' || operator == '*') result = val1 * val2;
    else if (operator == '÷' || operator == '/') result = val1 / val2;

    resultString = result.toString();
    if (resultString.length > 10) {
        mainDisplay.style.fontSize = '30px';
    }
    return result;
}