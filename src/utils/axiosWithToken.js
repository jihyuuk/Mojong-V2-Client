import axios from 'axios';

//Axios 인스턴스 생성
const axiosWithToken = axios.create({
    baseURL: 'http://192.168.0.3:8080'
});

//요청 인터셉터 설정
axiosWithToken.interceptors.request.use(
    (config) => {
        //토큰 가져오기
        const token = localStorage.getItem('token');

        if (token) {
            // 요청 헤더에 토큰을 추가합니다.
            config.headers['Authorization'] = token;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

export default axiosWithToken;

