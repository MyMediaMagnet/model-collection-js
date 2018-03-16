import Operand from './Operand'

class GreaterThanOrEqual extends Operand{
    
    // Confirm the actual value is greater than or equal to the expected value
    check(actual, expected) {
        return actual >= expected
    }

}

export default GreaterThanOrEqual;