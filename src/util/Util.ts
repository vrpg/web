export class Util {
    static nullCheck(test: any): boolean {
        console.log(test)
        if (test == null) return true
        if (test === null) return true
        if (typeof test === 'undefined') return true

        return false
    }
}