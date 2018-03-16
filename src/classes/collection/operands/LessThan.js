import Operand from './Operand'

class LessThan extends Operand{
    
    // Confirm the actual value is less than the expected value
    check(actual, expected) {
        return actual < expected
    }

}

export default LessThan;