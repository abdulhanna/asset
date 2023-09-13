import { hostedAuthAxios } from "./backendAxios";

export const doCheckAuth = async (appCtx) => {
    let user = null;
    const cookie =
        'cookie' in appCtx.req.headers ? appCtx.req.headers.cookie : null;

    try {
        // console.log(cookie, 'cookie')
        if (appCtx && appCtx.req) {
            user = await hostedAuthAxios.get('/who-am-i', {
                headers: {
                    cookie: cookie
                }

            });
            // console.log(user.data, 'user.data')
        } else {
            return {}
        }
    } catch (err) {
        console.log('error:', err);
    }
    // console.log(user, 'user')
    return user?.data && user.data.user ? user : false;
};
