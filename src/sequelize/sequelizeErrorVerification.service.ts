import SequelizeBaseError from './sequelizeBaseError.model';

const isSequelizeError = (error: unknown): error is SequelizeBaseError => {
    if (typeof error !== 'object') {
        return false;
    }

    return (
        'name' in error &&
        'message' in error &&
        'parent' in error &&
        'original' in error &&
        'sql' in error &&
        'fields' in error &&
        typeof error.name === 'string' &&
        typeof error.message === 'string' &&
        error.parent instanceof Error &&
        error.original instanceof Error &&
        typeof error.sql === 'string' &&
        typeof error.fields === 'object'
    );
};

export default isSequelizeError;
