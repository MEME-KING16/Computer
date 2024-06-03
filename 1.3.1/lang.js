


//addCode("close File Manager.exe", (id) => document.getElementById(id).remove())

class Interpreterv1 {
    constructor() {
        this.variables = {};
        this.constants = {};
        this.functions = {};
    }

    parse(input) {
        return input.trim().split(/\s+/);
    }

    evaluate(tokens) {
        const command = tokens[0];
        switch (command) {
            case 'let':
                return this.handleLet(tokens);
            case 'const':
                return this.handleConst(tokens);
            case 'print':
                return this.handlePrint(tokens);
            case 'fn':
                return this.handleFunction(tokens.join(' '));
            case 'call':
                return this.handleCall(tokens);
            default:
                throw new Error(`Unknown command: ${command}`);
        }
    }

    handleLet(tokens) {
        if (tokens.length < 4 || tokens[2] !== '=') {
            throw new Error('Invalid let syntax. Usage: let <variable> = <value>');
        }
        const varName = tokens[1];
        const value = this.evaluateExpression(tokens.slice(3).join(' '));
        this.variables[varName] = value;
    }

    handleConst(tokens) {
        if (tokens.length < 4 || tokens[2] !== '=') {
            throw new Error('Invalid const syntax. Usage: const <variable> = <value>');
        }
        const constName = tokens[1];
        const value = this.evaluateExpression(tokens.slice(3).join(' '));
        this.constants[constName] = value;
    }

    handlePrint(tokens) {
        const value = this.evaluateExpression(tokens.slice(1).join(' '));
        console.log(value);
    }

    handleFunction(input) {
        const fnPattern = /fn\s+(\w+)\s*\(([^)]*)\)\s*\{\s*([^}]*)\s*\}/;
        const match = input.match(fnPattern);

        if (!match) {
            throw new Error('Invalid function syntax. Usage: fn <name> (<params>) { <body> }');
        }

        const [_, fnName, params, body] = match;
        this.functions[fnName] = {
            params: params.split(',').map(param => param.trim()),
            body: body.trim(),
        };
    }

    handleFunctionCall(tokens) {
        const fnName = tokens[1];
        const args = tokens.slice(2).join(' ').split(',').map(arg => this.evaluateExpression(arg.trim()));
        const fn = this.functions[fnName];

        if (!fn) {
            throw new Error(`Function not found: ${fnName}`);
        }

        const localVars = {};
        fn.params.forEach((param, index) => {
            localVars[param.trim()] = args[index];
        });

        return this.evaluateFunctionBody(fn.body, localVars);
    }

    handleCall(tokens) {
        if (tokens[1] === 'js') {
            const jsCode = tokens.slice(2).join(' ');
            this.executeJavaScript(jsCode);
        } else {
            this.handleFunctionCall(tokens);
        }
    }

    executeJavaScript(jsCode) {
        const vars = this.prepareJavaScriptVars();
        const replacedCode = jsCode.replace(/\$([a-zA-Z_]\w*)/g, (match, p1) => {
            if (vars[p1] !== undefined) {
                return JSON.stringify(vars[p1]);
            } else {
                throw new Error(`Variable not found: ${p1}`);
            }
        });
        try {
            eval(replacedCode);
        } catch (e) {
            console.error('Error executing JavaScript code:', e);
        }
    }

    prepareJavaScriptVars() {
        return { ...this.variables, ...this.constants };
    }

    evaluateFunctionBody(body, localVars) {
        const originalVariables = { ...this.variables };
        this.variables = { ...this.variables, ...localVars };

        const statements = body.split(';').map(statement => statement.trim()).filter(statement => statement);

        statements.forEach(statement => {
            this.evaluate(this.parse(statement));
        });

        this.variables = originalVariables;
    }

    evaluateExpression(expression) {
        const tokens = expression.split(' ');

        if (tokens.length === 1) {
            const token = tokens[0];
            if (this.variables[token] !== undefined) {
                return this.variables[token];
            } else if (this.constants[token] !== undefined) {
                return this.constants[token];
            } else if (!isNaN(token)) {
                return Number(token);
            } else if (token === 'true' || token === 'false') {
                return token === 'true';
            } else {
                throw new Error(`Unknown variable or constant: ${token}`);
            }
        } else if (tokens.length === 3) {
            const left = this.evaluateExpression(tokens[0]);
            const operator = tokens[1];
            const right = this.evaluateExpression(tokens[2]);
            return this.evaluateOperation(left, operator, right);
        } else {
            throw new Error('Invalid expression syntax');
        }
    }

    evaluateOperation(left, operator, right) {
        switch (operator) {
            case '+':
                return left + right;
            case '-':
                return left - right;
            case '*':
                return left * right;
            case '/':
                return left / right;
            case '==':
                return left == right;
            case '!=':
                return left != right;
            case '&&':
                return left && right;
            case '||':
                return left || right;
            default:
                throw new Error(`Unknown operator: ${operator}`);
        }
    }
}

  
  // Example usage
  const interpreter = new Interpreterv1();
  //interpreter.evaluate(interpreter.parse('let x = 5'));
  //interpreter.evaluate(interpreter.parse('let y = 10'));
  //interpreter.evaluate(interpreter.parse('const z = true'));
  //interpreter.evaluate(interpreter.parse('print x + y'));
  //interpreter.evaluate(interpreter.parse('print z && false'));
  
  // Defining a function
  //interpreter.evaluate(interpreter.parse('fn add (a, b) { let result = a + b; print result }'));
  
  // Calling a function
  //interpreter.evaluate(interpreter.parse('call add 3, 4'));
  
  //interpreter.evaluate(interpreter.parse('fn test (a, b) { let yum = a * b; print yum * 3 }'))
  //interpreter.evaluate(interpreter.parse('call test 1, 1'));
  //interpreter.evaluate(interpreter.parse('call js console.log(\'aa\')'));
  interpreter.evaluate(interpreter.parse('fn close (process) { call js document.getElementById($process).remove(); call js delete Computer.ram[Computer.ram.indexOf(Computer.ram.find(obj => obj.process === $process))]; call js Computer.ram = Computer.ram.filter(str => str !== undefined); }'));