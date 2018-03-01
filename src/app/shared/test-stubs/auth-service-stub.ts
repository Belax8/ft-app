import { Observable } from 'rxjs/Rx';

export const AuthServiceStub = {
    userId: 10,
    formatPayload: () => {
        return {};
    },
    getNonce: () => {
        return 'alskdjfhasdlfk';
    },
    getAuthHeaders: () => {
        return null;
    },
    login: () => {
        return null;
    },
    logout: () => {
        return null;
    },
    isAuthenticated: () => {
        return true;
    },
    getHost: () => {
        return '//api.testing.com';
    }
};
