export interface ISorting {
    sortBy: string;
    sortingOrder: 'ASC' | 'DESC';
}

export interface ISortingRequestQuery extends ISorting {}
