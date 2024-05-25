import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

// Button Component
type ButtonProps = {
  onPress: () => void;
  style?: any;
  textStyle?: any;
  text: string;
};

// Button Component
//main use of this component is to create buttons for the calculator with different styles
const Button: React.FC<ButtonProps> = ({ onPress, style, textStyle, text }) => (
  // TouchableOpacity is a wrapper for making views respond properly to touches
  <TouchableOpacity style={style} onPress={onPress}>
  
    <Text style={textStyle}>{text}</Text>
  </TouchableOpacity>
);
// App Component
const App: React.FC = () => {
  //useState is a hook that allows you to have state variables in functional components
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState<string | null>(null);
  const [firstValue, setFirstValue] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  //handleNumberInput function is used to handle the input of numbers

  const handleNumberInput = (num: Number) => {
    //if the display value is 0, then the display value will be the number that is pressed
    //if not, the display value will be the previous display value concatenated with the number that is pressed  
    setDisplayValue((prev) => (prev === '0' ? num.toString() : prev + num));
  };
//handleOperatorInput function is used to handle the input of operators
//the first value will be the display value and the display value will be 0

  const handleOperatorInput = (op: string) => {
    setOperator(op);
    setFirstValue(displayValue);
    setDisplayValue('0');
  };
//handleEqual function is used to handle the input of the equal sign
//the first value will be parsed to a float and the display value will be parsed to a float
  const handleEqual = () => {
    const num1 = parseFloat(firstValue);
    
    const num2 = parseFloat(displayValue);
    
    let result: number | null = null;

    if (operator) {
      switch (operator) {
        case '+':
          result = num1 + num2;
          break;
        case '-':
          result = num1 - num2;
          break;
        case '*':
          result = num1 * num2;
          break;
        case '/':
          result = num1 / num2;
          break;
        case '%':
          result = num1 % num2;
          break;
      }
        //if the result is not null and is not a number, the calculation will be displayed
        //the history will be updated with the calculation
        //the display value will be the result
        //the operator will be null
        //the first value will be an empty string

      if (result !== null && !isNaN(result)) {
        const calculation = `${firstValue} ${operator} ${displayValue} = ${result}`;
        setHistory([calculation, ...history].slice(0, 4)); // Add to history, limit to 4 entries
        setDisplayValue(result.toString());
        setOperator(null);
        setFirstValue('');
      }
    }
  };
//handleClear function is used to handle the input of the clear button
  const handleClear = () => {
    setDisplayValue('0');
    setOperator(null);
    setFirstValue('');
  };
//handleAllClear function is used to handle the input of the all clear button
//the display value will be 0
//the operator will be null
//the first value will be an empty string
//the history will be an empty array

  const handleAllClear = () => {
    setDisplayValue('0');
    setOperator(null);
    setFirstValue('');
    setHistory([]);
  };
  //handleBackspace function is used to handle the input of the backspace button
  //if the display value is greater than 1, the display value will be the display value without the last character
  //if not, the display value will be 0

  const handleBackspace = () => {
    setDisplayValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  };
//buttons array is used to create the buttons for the calculator
//the renderButton function is used to render the buttons
//the handlePress function is used to handle the press of the buttons
//if the button is an operator, the handleEqual function will be called
//if the button is a clear button, the handleClear function will be called
//if the button is an all clear button, the handleAllClear function will be called
//if the button is a backspace button, the handleBackspace function will be called
//if the button is a decimal point, the display value will be concatenated with a decimal point

  const buttons = [
    ['AC', '⌫', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '00', '.', '=']
  ];

  const renderButton = (text: string) => {
    const isOperator = ['/', '*', '-', '+', '=', '%'].includes(text);
    const isClear = text === 'C';
    const isAllClear = text === 'AC';
    const isBackspace = text === '⌫';
    const isFloat= text === '.';
    const isDoubleZero = text === '00';

    const handlePress = () => {
      if (isOperator) {
        text === '=' ? handleEqual() : handleOperatorInput(text);
      } else if (isClear) {
        handleClear();
      } else if (isAllClear) {
        handleAllClear();
      } else if (isBackspace) {
        handleBackspace();
      } 
      else if (isFloat) {
        setDisplayValue((prev) => prev + '.');
      }
      else if (isDoubleZero) {
        setDisplayValue((prev) => prev + '00');
      }
      else {
        handleNumberInput(parseFloat(text));
      }
    };
//the button will be rendered with the text, style and text style
//the style and text style will be different based on the type of button

    return (
      <Button
        key={text}
        onPress={handlePress}
        style={[
          styles.button,
          isOperator && styles.operatorButton,
          isClear && styles.clearButton,
          isAllClear && styles.allClearButton,
          isBackspace && styles.backspaceButton,
          text === '=' && styles.equalButton
        ]}
        textStyle={[
          styles.buttonText,
          isOperator && styles.operatorButtonText,
          isClear && styles.clearButtonText,
          isAllClear && styles.allClearButtonText,
          isBackspace && styles.backspaceButtonText,
          text === '=' && styles.equalButtonText
        ]}
        text={text}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.historyContainer}>
        <ScrollView> 
          {history.map((entry, index) => (
            <Text key={index} style={styles.historyText}>{entry}</Text>
          ))}
        </ScrollView>
      </View>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{displayValue}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map(renderButton)}
          </View>
        ))}
      </View>
    </View>
  );
};
//styles for the app

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    padding: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 10,
    
  },
  historyText: {
    
    fontSize: 18,
    color: '#666',
  },
  displayContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    marginBottom: 10,
    width: '100%',
    elevation: 3,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  displayText: {
    fontSize: 48,
    color: '#333',
  },
  buttonContainer: {
    flex: 3,
    width: '100%',
    padding: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 2,
    justifyContent: 'space-between',

  },
  button: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#f0f0f0',
    elevation: 3,
    margin: 2,
    padding: 5,

  },
  buttonText: {
    fontSize: 34,
    color: '#333',
  },
  operatorButton: {
    backgroundColor: '#f0f0f0',

  },
  operatorButtonText: {
    color: '#ff9500',
  },
  equalButton: {
    flex: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff9500',
    elevation: 3,
  },
  equalButtonText: {
    fontSize: 32,
    color: '#fff',
  },
  clearButton: {
    flex: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff9500',
    elevation: 3,
    margin: 2,
    padding: 15,
  },
  clearButtonText: {
    fontSize: 24,
    color: '#333',
  },
  allClearButton: {
    flex: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff0000',
    elevation: 3,
    margin: 2,
    padding: 5,
  },
  allClearButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  backspaceButton: {
    flex: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff9500',
    elevation: 3,
    margin: 2,
    padding: 5,
  },
  backspaceButtonText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default App;
