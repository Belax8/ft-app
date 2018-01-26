import { Observable } from 'rxjs/Rx';

export const CoreApiServiceStub = {
    get: () => {
        return Observable.from([]);
    },
    put: () => {
        return Observable.from([]);
    },
    post: () => {
        return Observable.from([]);
    },
    delete: () => {
        return Observable.from([]);
    },
    getHost: () => {
        return '//api.testing.com';
    }
};
