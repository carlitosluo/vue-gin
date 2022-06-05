import request from '@/utils/request';

const register = ({ name, telephone, password }) => {
    return request.post('auth/register', { name, telephone, password });
};
// 用户登录
const login = ({ telephone, password }) => {
    return request.post('auth/login', { telephone, password });
};
const info = () => {
    return request.get('auth/info');
};
export default {
    register,
    login,
    info,
};
