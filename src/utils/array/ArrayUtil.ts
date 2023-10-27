export default class ArrayUtil {
    static swap<T>(array: T[], index1: number, index2: number): void {
        const temp = array[index1];
        array[index1] = array[index2];
        array[index2] = temp;
    }
}
