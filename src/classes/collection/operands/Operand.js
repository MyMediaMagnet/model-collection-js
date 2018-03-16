class Operand {
    // Any api routes would need to both have structure (CRUD) and also allow for flexible starting route names (not only 'api')
    constructor() {
        if (new.target === Operand) {
            throw new TypeError("Cannot construct Operand instances directly");
        }
    }

    check(actual, expected) {
        throw new Error('The check method has not been properly implemented in the Operand child class');
    }
}

export default Operand;