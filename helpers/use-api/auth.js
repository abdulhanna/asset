import { hostedAuthAxios } from "./hostedAxios";

const authApi = {};

authApi.doRegister = async (data) => hostedAuthAxios.post("/register", data);

authApi.doLogin = async (data) => hostedAuthAxios.post("/login", data);

authApi.doLogout = async () => hostedAuthAxios.get("/logout");

authApi.WhoAmI = async (appCtx) => {
  let user = null;
  let access_token =
    "cookie" in appCtx.req.headers ? appCtx.req.headers.cookie : null;

  access_token = access_token ? access_token.slice(13) : access_token;

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
      return {};
    }
  } catch (err) {
    console.log("error:", err);
  }

  return user; // Return the user data
};

authApi.CompanyProfile = (data) => {
  return hostedAuthAxios.post("/company-profile", data);
};
authApi.ResendMail = (data) => {
  return hostedAuthAxios.post("/resen-verification-email", data);
};
authApi.verifyToken = (token) => hostedAuthAxios.get(`/confirm/${token}`);

authApi.forgotPassword = (data) => {
  return hostedAuthAxios.post("/request-forgot-password", data);
};
authApi.resetPassword = (data) => hostedAuthAxios.post("/reset-password", data);

authApi.setPassword = (data) => hostedAuthAxios.post("/setPassword", data);

authApi.changePassword = (data) => {
  return hostedAuthAxios.post("/change-password", data);
};
export default authApi;
