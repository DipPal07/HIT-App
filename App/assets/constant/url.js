import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const URL = {
  baseUri: 'http://10.0.2.2:3000',
  login: {
    url: '/api/login',
    method: 'POST',
  },
  getClassRoutine: {
    url: '/api/class-routine',
    method: 'GET',
  },
  getSyllabus: {
    url: '/api/syllabus',
    method: 'GET',
  },
};

export default URL;
