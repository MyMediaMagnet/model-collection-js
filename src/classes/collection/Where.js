import Equals from './operands/Equals'
import DoesNotEqual from './operands/DoesNotEqual'
import GreaterThan from './operands/GreaterThan'
import GreaterThanOrEqual from './operands/GreaterThanOrEqual'
import LessThan from './operands/LessThan'
import LessThanOrEqual from './operands/LessThanOrEqual'

class Where {
    // Construct a where statement
    constructor(field_name, operand, value) {
        this.field_name = field_name
        this.operand = operand
        this.value = value

        this.operandClass = this.setupOperand()
    }

    // Confirm that the given values pass the check based on the given operand
    passes(item) {
        return this.operandClass.check(item[this.field_name], this.value)
    }

    // Set the class to handle the check based on the operand
    setupOperand() {
        switch(this.operand) {
            case '=':
                return new Equals()
            case '!=':
                return new DoesNotEqual()
            case '>':
                return new GreaterThan()
            case '>=':
                return new GreaterThanOrEqual()
            case '<':
                return new LessThan()
            case '<=':
                return new LessThanOrEqual()
            default:
                return new Equals()
        }
    }
}

export default Where;