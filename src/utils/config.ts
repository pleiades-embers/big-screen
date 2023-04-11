export default {
  local: {
    BASE_API: 'https://big-screen-sigma.vercel.app',
  },
  dev: {
    BASE_API: 'https://big-screen-sigma.vercel.app',
  },
  test: {
    BASE_API: 'http://47.100.208.92:81',
  },
  prod: {
    BASE_API: 'http://47.100.208.92:81',
  },
}[VITE_MODE];
