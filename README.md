Sure, here's a README file formatted for a GitHub repository:

---

# Calculator App

This project is a simple calculator application built using React Native. It supports basic arithmetic operations and includes features such as history management, backspace, and clearing functions.

## Features

- **Basic Arithmetic Operations**: Addition, subtraction, multiplication, and division.
- **Special Operations**: Modulus.
- **History Management**: Displays the last four calculations.
- **Clear (C) and All Clear (AC) Functions**: Clear the current input or reset the calculator.
- **Backspace Function**: Delete the last input character.
- **Additional Features**: Support for double zero (00) and decimal point.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/ankurpunia30/calculator.git
   ```
2. Navigate to the project directory:
   ```sh
   cd calculator-app
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Usage

1. Start the application:
   ```sh
   npm start
   ```
2. Use an emulator or connect a physical device to run the app:
   ```sh
   npx react-native run-android
   ```
   or
   ```sh
   npx react-native run-ios
   ```

## Code Explanation

### Components

#### `Button` Component

This component renders a calculator button.

```tsx
type ButtonProps = {
  onPress: () => void;
  style?: any;
  textStyle?: any;
  text: string;
};

const Button: React.FC<ButtonProps> = ({ onPress, style, textStyle, text }) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Text style={textStyle}>{text}</Text>
  </TouchableOpacity>
);
```

#### `App` Component

This is the main component of the calculator app.

1. **State Variables**:
   - `displayValue`: Current value displayed.
   - `operator`: Current operator selected.
   - `firstValue`: First operand in the operation.
   - `history`: List of previous calculations.

2. **Functions**:
   - `handleNumberInput(num: number)`: Handles number button presses.
   - `handleOperatorInput(op: string)`: Handles operator button presses.
   - `handleEqual()`: Computes the result of the operation.
   - `handleClear()`: Clears the current input.
   - `handleAllClear()`: Clears all inputs and history.
   - `handleBackspace()`: Deletes the last character of the current input.
   - `renderButton(text: string)`: Renders each button with appropriate styles and functions.

3. **Layout**:
   - The app layout includes history display, current value display, and buttons arranged in rows.

### Styles

The styles are defined using `StyleSheet.create` for consistency and ease of maintenance.

```tsx
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
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

This README provides a comprehensive overview of the Calculator App, detailing its features, installation, usage, code structure, and styling conventions. Feel free to customize and expand it as needed.