import Operand from './Operand'

class Equals extends Operand{
    
    /**
     * Confirm the actual value equals the expected value
     * 
     * @param {*} actual 
     * @param {*} expected 
     */
    check(actual, expected) {
        return actual === expected
    }

}

export default Equals;