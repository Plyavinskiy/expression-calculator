function eval() {
  // Do not use eval!!!
  return;
}

const isPairing = (expression, char1, char2) => {
  const openedChar = RegExp(`[${char1}]`, 'g');
  const closedChar = RegExp(`[${char2}]`, 'g');

  const totalOpenedChars = (expression.match(openedChar) || []).length;
  const totalClosedChars = (expression.match(closedChar) || []).length;

  if (totalOpenedChars === totalClosedChars) {
    return true;
  } else {
    return false;
  }
}

const isDivisionByZero = (divider) => {
  if (divider === 0) {
    return true;
  } else {
    return false;
  }
}

const hasPriority = (operator1, operator2) => {
  if ((operator2 === '(') || (operator2 === ')')) {
    return false;
  }

  if (((operator1 === '*') || (operator1 === '/'))
   && ((operator2 === '+') || (operator2 === '-'))) {
    return false;
  }

  return true;
};

const calculate = (operator, b, a) => {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (!isDivisionByZero(b)) {
        return (a / b);
      } else {
        throw new Error('TypeError: Division by zero.');
      }
  }

  return 0;
}

function expressionCalculator(expr) {
  if (!isPairing(expr, '(', ')')) {
    throw new Error('ExpressionError: Brackets must be paired');
  };

  expr = expr.replace(/\s/g, '');
  const exprLength = expr.length;

  const numbers = [];
  const operators = [];

  for (let i = 0; i < exprLength; i++) {
    const isNumber = /\d/.test(expr[i]);

    if (isNumber) {
      let buffer = '';

      while (/\d/.test(expr[i])) {
        buffer += expr[i++];
      }

      numbers.push(parseInt(buffer));
      i--;
    }

    else if (expr[i] === '(') {
      operators.push(expr[i]);
    }

    else if (expr[i] === ')') {
      while (operators[operators.length - 1] !== '(') {
        numbers.push(calculate(operators.pop(), numbers.pop(), numbers.pop()));
      }

      operators.pop();
    }

    else if (/[*\/+-]/.test(expr[i])) {
      while ((operators.length)
          && (hasPriority(expr[i], operators[operators.length - 1]))) {
        numbers.push(calculate(operators.pop(), numbers.pop(), numbers.pop()));
      }

      operators.push(expr[i]);
    }
  }

  while (operators.length) {
    numbers.push(calculate(operators.pop(), numbers.pop(), numbers.pop()));
  }

  return numbers.pop();
};

module.exports = {
    expressionCalculator
}