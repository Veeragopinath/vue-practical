export default function ({ $axios }) {
  
  const url = 'https://qa5.devaavaz.biz/361-api/v3';


  $axios.defaults.baseURL = url;
}