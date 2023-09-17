export default interface SequelizeBaseError extends Error {
    name: string;
    message: string;
    parent: Error;
    original: Error;
    sql: string;
    fields: object;
    sqlMessage?: string;
    sqlState?: string;
    code?: string;
    errno?: number;
}
