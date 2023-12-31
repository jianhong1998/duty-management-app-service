type Prettify<T> = {
    [K in keyof T]: T[K];
} & Record<string, unknown>;

export default Prettify;
