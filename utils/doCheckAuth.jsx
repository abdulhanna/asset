// import { hostedAuthAxios } from "./backendAxios";

// export const doCheckAuth = async (appCtx) => {
//     let user = null;
//     const cookie =
//         'cookie' in appCtx.req.headers ? appCtx.req.headers.cookie : null;

//     try {
//         // console.log(cookie, 'cookie')
//         if (appCtx && appCtx.req) {
//             user = await hostedAuthAxios.get('/who-am-i', {
//                 headers: {
//                     cookie: cookie
//                 }

//             });
//             // console.log(user.data, 'user.data')
//         } else {
//             return {}
//         }
//     } catch (err) {
//         console.log('error:', err);
//     }
//     // console.log(user, 'user')
//     return user?.data && user.data.user ? user : false;
// };

import { hostedAuthAxios } from "./backendAxios";

export const doCheckAuth = async (appCtx) => {
    let user = null;
    let access_token = 'cookie' in appCtx.req.headers ? appCtx.req.headers.cookie : null;

    access_token = access_token ? access_token.slice(13) : access_token;

        const tokenString = cookie.replace('access_token: ', '');

  // Remove quotes and trim spaces
  const token = tokenString.split('=')[1];

   console.log(token, "this is")
  

    try {
       
      
        if (appCtx && appCtx.req) {
            const response = await hostedAuthAxios.get("/who-am-i", {
                headers: {
                    Cookie: `access_token=${access_token}`,
                  },
            });

            user = response.data.data; // Extract user data from response

            // console.log(user, 'user.data');
        } else {
            return {}
        }
    } catch (err) {
        console.log('error:', err);
    }

    return user; // Return the user data
};