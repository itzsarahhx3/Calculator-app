// Helper function 1: checks if brackets are balanced
function validPretheses(str) {
    let brackets = [];
    for (let i = 0; i < str.length; i++) {
        if (str[i] === "(") {
            brackets.push(str[i]);
        } else if (str[i] === ")") {
            if (brackets.pop() !== "(") return false;
        }
    }
    return brackets.length === 0;
}

// Helper function 2: operation process
function operation(sign, num, stack) {
    if (sign === "-") {
        stack.push(-num);
    } else if (sign === "+") {
        stack.push(num);
    } else if (sign === "*") {
        stack.push(stack.pop() * num);
    } else if (sign === "/") {
        stack.push(stack.pop() / num);
    }
}

// Main Function
function calculator(str) {
    let operators = {
        "+": true,
        "-": true,
        "/": true,
        "*": true
    };

    let brackets = {
        "(": true,
        ")": true
    };

    // call the helper function. If it is invalid, which is false, return "Syntax Error"
    if (!validPretheses(str)) return "Syntax Error";

    // Handle decimal: if there is a decimal pointer but no integer before the dot, add "0" to it
    // e.g. ".4" => "0.4"
    let array = str.split("");
    for (let i = 0; i < array.length; i++) {
        if (array[i] === "." && isNaN(array[i - 1])) {
            array[i] = "0."; // reassign "." to be ".0"
        }
    }
    str = array.join("");

    //convert str to array:
    let arr = [];
    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        if (char === " ") continue;

        // check Edge Cases:
        if (
            /* if number or '-' associated with negative number
                1. if it is a number
                2. char is a minus sign AND "-" at beginning 
                    OR current char's previous num is an operator AND next char is a num
                e.g. - at 0, ok
                e.g. +-2, --2, ok
            */
            !isNaN(char) ||
            (char === "-" &&
                (i === 0 || (operators[str[i - 1]] && !isNaN(str[i + 1]))))
        ) {
            // the previous char CANNOT be a number
            // e.g. 2--5 -> ["2", "-"]
            if (!isNaN(arr[arr.length - 1])) return "Syntax Error";
            // include the whole num, not just the first digit
            // e.g. 2--5 -> -5, slice at 2
            // e.g. 2--0.5 -> -0.5, slice at 3
            let num = parseFloat(str.slice(i));
            arr.push(num);
            // skip till the end of the num
            i += String(num).length - 1;
        } else if (brackets[char]) {
            arr.push(char);
        } else if (operators[char]) {
            // if 2 or more operators in a row it is invalid
            // exception: minus sign with a negative num. already taken care in the if statement above
            // e.g. 1++4 -> ["+", "+"] -> false
            if (operators[arr[arr.length - 1]]) return "Syntax Error";
            arr.push(char);
        } else {
            return "Invalid Input";
        }
    }

    // if input starts or ends with an operator it is invalid
    if (operators[arr[0]] || operators[arr[arr.length - 1]])
        return "Syntax Error";

    return calculate(arr);

    function calculate(arr) {
        let num = 0;
        let stack = [];
        let operator = "+";

        for (let i = 0; i < arr.length; i++) {
            let char = arr[i];

            // if it is a number
            if (!isNaN(char)) {
                num = char;
            } else {
                // if it is not a number
                // if we meet brackets
                if (arr[i] === "(") {
                    // find closing bracket, while taking into account that there can be brackets nested within
                    let openingIdx = i;
                    let leftBlock = 0;
                    while (i < str.length) {
                        if (arr[i] === "(") leftBlock++;
                        if (arr[i] === ")") leftBlock--;
                        if (leftBlock === 0) break;
                        i++;
                    }
                    //place the i to the position after close block
                    let closingIdx = i;
                    // include all elements in the closed block recursively
                    let innerBlockValue = arr.slice(openingIdx + 1, closingIdx);
                    num = calculate(innerBlockValue);
                } else {
                    // if we meet a sign
                    operator = char;
                }
            }

            // Do the calculation process!!
            if (num !== null) {
                operation(operator, num, stack);
            }
            // reset num to null so we can start with the calculation of nex number
            num = null;
        }

        // add all the num inside the stack
        let result = 0;
        while (stack.length !== 0) result += stack.pop();
        return result;
    }
}

export default calculator;
