import Operand from './Operand'

class DoesNotEqual extends Operand{
    
    // Confirm the actual value does not equal the expected value
    check(actual, expected) {
        return actual !== expected
    }

}

export default DoesNotEqual;