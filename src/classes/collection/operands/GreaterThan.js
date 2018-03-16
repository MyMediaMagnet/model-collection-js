import Operand from './Operand'

class GreaterThan extends Operand{
    
    // Confirm the actual value is greater than the expected value
    check(actual, expected) {
        return actual > expected
    }

}

export default GreaterThan;