export interface ISorting {
    sortBy: string;
    sortOrder: 'ASC' | 'DESC';
}

export interface ISortingRequestQuery extends ISorting {}
