import Operand from './Operand'

class LessThan extends Operand{
    
    /**
     * Confirm the actual value is less than the expected value
     * 
     * @param {*} actual 
     * @param {*} expected 
     */
    check(actual, expected) {
        return actual < expected
    }

}

export default LessThan;