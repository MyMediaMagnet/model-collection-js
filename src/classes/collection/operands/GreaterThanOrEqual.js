import Operand from './Operand'

class GreaterThanOrEqual extends Operand{
    
    /**
     * Confirm the actual value is greater than or equal to the expected value
     * 
     * @param {*} actual 
     * @param {*} expected 
     */
    check(actual, expected) {
        return actual >= expected
    }

}

export default GreaterThanOrEqual;