function eval() {
  // Do not use eval!!!
  return;
}

const checkPairing = (expression, char1, char2) => {
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

const removeSpaces = (expression) => {
  return expression.replace(/\s/g, '');
}

const checkDivisionByZero = (divider) => {
  if (divider === 0) {
    return true;
  } else {
    return false;
  }
}

const hasPriority = (priorities, operator1, operator2) => {
  if (((operator2 === '(') || (operator2 === ')'))) {
    return false;
  }

  if (priorities[operator1] > priorities[operator2]) {
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
      const isDivisionByZero = checkDivisionByZero(b);

      if (!isDivisionByZero) {
        return (a / b);
      } else {
        throw new Error('TypeError: Division by zero.');
      }
  }

  return 0;
}

function expressionCalculator(expr) {
  const expression = removeSpaces(expr);
  const exprLength = expression.length;

  const isPairing = checkPairing(expression, '(', ')');

  if (!isPairing) {
    throw new Error('ExpressionError: Brackets must be paired');
  };

  const numbers = [];
  const operators = [];
  const priorities = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2
  };

  for (let i = 0; i < exprLength; i++) {
    const isNumber = /\d/.test(expression[i]);
    const isOpenedParenthesis = /\(/.test(expression[i]);
    const isClosedParenthesis = /\)/.test(expression[i]);
    const isOperator = /[*\/+-]/.test(expression[i]);

    if (isNumber) {
      let buffer = '';

      while (/\d/.test(expression[i])) {
        buffer += expression[i++];
      }

      numbers.push(+buffer);
      i--;
    }

    if (isOpenedParenthesis) {
      operators.push(expression[i]);
    }

    if (isClosedParenthesis) {
      while (operators[operators.length - 1] !== '(') {
        numbers.push(calculate(operators.pop(), numbers.pop(), numbers.pop()));
      }

      operators.pop();
    }

    if (isOperator) {
      while (operators.length
          && hasPriority(priorities, expression[i], operators[operators.length - 1])) {
        numbers.push(calculate(operators.pop(), numbers.pop(), numbers.pop()));
      }

      operators.push(expression[i]);
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