import axios from 'axios';
// import { useNotificationStore } from '../store/index'
// import { get } from 'lodash';

const instance = axios.create({
  baseURL: 'http://localhost:3131/',
  // withCredentials: true,
});

// instance.interceptors.response.use(
//   (response) => {
//     const status = get(response, 'status');
//     const { addNotification } = useNotificationStore();
//     if (status === 200 || 201) {
//       addNotification({
//         _id: Date.now(),
//         text: get(response, 'statusText', ''),
//         dangerous: false,
//       });
//     }
//     return response;
//   },
//   (error) => {
//     const { addNotification } = useNotificationStore();
//     addNotification({
//       _id: Date.now(),
//       text: `${get(error, 'response.status')}: ${get(error, 'response.statusText', '')}`,
//       dangerous: true,
//     });
//     return Promise.reject(error);
//   },
// );

export default instance;