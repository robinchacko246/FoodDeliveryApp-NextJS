// const dotenv = require('dotenv');
// dotenv.config();


// //port connection and server running
// console.log(`Running API_URL is ${process.env.API_URL}`); // 3000
// console.log('Running NEXT_URL',process.env.NEXT_URL);
// console.log(process.env.NODE_ENV);
// module.exports = {
//   images: {
//     domains: ["res.cloudinary.com"]
//   },
//   API_URL:process.env.API_URL,
//   NEXT_URL:process.env.NEXT_URL,
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.resolve.fallback.fs = false
//     }

//     return config
//   },
// }
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase) => {

 
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)


  const env = {
     
    API_URL: (() => {
      if (isDev) return 'http://localhost:3001/'
      if (isProd) {
        return 'https://fooddeliverynextapi.herokuapp.com/'
      }
      if (isStaging) return 'https://fooddeliverynextapi.herokuapp.com/'
      
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    NEXT_URL: (() => {
      if (isDev) return 'http://localhost:3000/'
      if (isProd) return 'https://fooddeliverynextapi.herokuapp.com/'
      if (isStaging) return 'https://fooddeliverynextapi.herokuapp.com/'
      return 'RESTURL_SESSIONS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),

    TOKEN:(()=>
    {
      return "SWdw4CV||663Z{p3|ZXtP%0k6Ejj;F"
    })
   
  }



  // next.config.js object

  return {
    env
  }
}

module.exports = {
  reactStrictMode: true, 
  images: {
    domains: ['res.cloudinary.com'],
  },
}