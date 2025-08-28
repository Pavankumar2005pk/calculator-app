// Memory storage
let memory = 0;

// Display functions
function appendToDisplay(value) {
    const display = document.getElementById('result');
    display.value += value;
}

function clearDisplay() {
    document.getElementById('result').value = '';
}

function backspace() {
    const display = document.getElementById('result');
    display.value = display.value.slice(0, -1);
}

// Calculation function
function calculate() {
    const display = document.getElementById('result');
    let expression = display.value;
    
    // Replace × with * and ÷ with / for evaluation
    expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
    
    try {
        // Validate expression before evaluation
        if (!isValidExpression(expression)) {
            throw new Error('Invalid expression');
        }
        
        // Use Function constructor to avoid eval() security risks
        const result = new Function('return ' + expression)();
        
        // Check for division by zero
        if (!isFinite(result)) {
            throw new Error('Cannot divide by zero');
        }
        
        // Display result with proper formatting
        display.value = Number.isInteger(result) ? result : parseFloat(result.toFixed(8));
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => clearDisplay(), 1000);
    }
}

// Memory functions
function memoryAdd() {
    const display = document.getElementById('result');
    try {
        const currentValue = parseFloat(display.value) || 0;
        memory += currentValue;
        showNotification(`Added ${currentValue} to memory`);
    } catch (error) {
        showNotification('Memory operation failed');
    }
}

function memoryRecall() {
    document.getElementById('result').value += memory;
}

function memoryClear() {
    memory = 0;
    showNotification('Memory cleared');
}

// Additional operations
function calculateSquareRoot() {
    const display = document.getElementById('result');
    try {
        const value = parseFloat(display.value);
        if (value < 0) throw new Error('Invalid input');
        display.value = Math.sqrt(value);
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => clearDisplay(), 1000);
    }
}

function calculatePercentage() {
    const display = document.getElementById('result');
    try {
        const value = parseFloat(display.value) / 100;
        display.value = value;
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => clearDisplay(), 1000);
    }
}

// Helper functions
function isValidExpression(expr) {
    // Check for invalid characters
    if (!/^[0-9+\-*/.()\s]*$/.test(expr)) {
        return false;
    }
    
    // Check for balanced parentheses
    let stack = [];
    for (let char of expr) {
        if (char === '(') stack.push(char);
        if (char === ')') {
            if (stack.length === 0) return false;
            stack.pop();
        }
    }
    
    return stack.length === 0;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 14px;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .notification.show {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Keyboard support
document.addEventListener('keydown', (e) => {
    const key = e.key;
    
    // Numbers and operators
    if (/[0-9+\-*/.()]/.test(key)) {
        appendToDisplay(key);
    }
    // Division
    else if (key === '/') {
        e.preventDefault();
        appendToDisplay('/');
    }
    // Enter or = for calculation
    else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        calculate();
    }
    // Backspace
    else if (key === 'Backspace') {
        e.preventDefault();
        backspace();
    }
    // Escape to clear
    else if (key === 'Escape') {
        e.preventDefault();
        clearDisplay();
    }
    // Decimal point
    else if (key === '.') {
        appendToDisplay('.');
    }
});
