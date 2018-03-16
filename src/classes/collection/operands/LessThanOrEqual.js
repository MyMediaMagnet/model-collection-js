import Operand from './Operand'

class LessThanOrEqual extends Operand{
    
    // Confirm the actual value is less than or equal to the expected value
    check(actual, expected) {
        return actual <= expected
    }

}

export default LessThanOrEqual;