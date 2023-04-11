export default {
  local: {
    BASE_API: 'http://192.168.124.5:3033',
  },
  dev: {
    BASE_API: 'http://192.168.124.5:3033',
  },
  test: {
    BASE_API: 'http://192.168.124.5:3033',
  },
  prod: {
    BASE_API: 'https://big-screen-sigma.vercel.app/',
  },
}[VITE_MODE];
