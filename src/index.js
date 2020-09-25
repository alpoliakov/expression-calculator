function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    const arr = expr.match(/([+*-/)(]{1}|\d+)/g);
    const bracketLeft = arr.filter(item => item === '(').length
    const bracketRight = arr.filter(item => item === ')').length;
    if (bracketLeft !== bracketRight) throw new Error('ExpressionError: Brackets must be paired');
    arr.forEach((item, index) => {
        if((item === '/') && arr[index + 1] === '0') throw new Error("TypeError: Division by zero.");
    })

    const method = {
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
    }

    const operation = (item) => {
        for(let i = 0; i < item.length; i++) {
            if(item[i] === '*') {
                item.splice(i - 1, 3, method[item[i]](+item[i - 1], +item[i + 1]))
                i--;
            }else if(item[i] === '/') {
                item.splice(i - 1, 3, method[item[i]](+item[i - 1], +item[i + 1]))
                i--
            }
        }

        for (let i = 0; i < item.length; i++) {
            if(item[i] === '+') {
                item.splice(i - 1, 3, method[item[i]](+item[i - 1], +item[i + 1]))
                i--
            }else if(item[i] === '-') {
                item.splice(i - 1, 3, method[item[i]](+item[i - 1], +item[i + 1]))
                i--
            }
        }
        return item;
    }

    const pushInStack = (array) => {
        const index = array.lastIndexOf('(');
        for (let i = index; i < array.length; i++) {
            if(array[i] === ')') {
                let newArr = array.splice(index, i - index + 1).slice(1, -1);
                let [result] = operation(newArr);
                array.splice(index, 0, result);
                if(~array.lastIndexOf('(')){
                    pushInStack(array);
                }
            }
        }
        return array
    }

    let [result] =  operation(pushInStack(arr));
    return result;
}

module.exports = {
    expressionCalculator
}