export default interface StandardResponse<T> {
    data?: T;
    errorMessage?: string;
    isSuccess: boolean;
}
