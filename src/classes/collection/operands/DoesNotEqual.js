import Operand from './Operand'

class DoesNotEqual extends Operand{
    
    /**
     * Confirm the actual value does not equal the expected value
     * 
     * @param {*} actual 
     * @param {*} expected 
     */
    check(actual, expected) {
        return actual !== expected
    }

}

export default DoesNotEqual;