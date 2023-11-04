import { IPaginationRequestQuery } from '../paginationRequest.model';
import { ISortingRequestQuery } from '../sortingRequest.model';

export default interface IGetAllEmployeeRequestQuery
    extends IPaginationRequestQuery,
        Partial<ISortingRequestQuery> {
    isActive?: string;
}
