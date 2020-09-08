// 1) Import Cotter
import { CotterValidateJWT } from "cotter-node";
// 1) Import Cotter Token
import { CotterAccessToken } from "cotter-token-js";
import axios from "axios"; // Import axios

const checkJWT = (handler) => async (req, res) => {
  // 2) Check that the access_token exists
  if (!("authorization" in req.headers)) {
    res.statusCode = 401;
    res.end("Authorization header missing");
    return;
  }
  const auth = await req.headers.authorization;
  const bearer = auth?.split(" ");
  const token = bearer?.length > 0 && bearer[1];

  // 3) Validate the access_token
  var valid = false;
  try {
    valid = await CotterValidateJWT(token);
  } catch (e) {
    console.log(e);
    valid = false;
  }
  if (!valid) {
    res.statusCode = 403;
    res.end("Authorization header is invalid");
    return;
  }

  // 4) Pass the access token to the next handler
  req.access_token = token;
  handler(req, res);
};

const handler = async (req, res) => {
  // Parse the access_token to get cotter_user_id
  const decodedToken = new CotterAccessToken(req.access_token);
  const cotterUserID = decodedToken.getID();

  // Call Cotter's API to get Github Access Token for the user
  let githubAccessToken = "";
  const config = {
    headers: {
      API_KEY_ID: process.env.COTTER_API_KEY_ID,
      API_SECRET_KEY: process.env.COTTER_API_SECRET_KEY,
    },
  };
  try {
    let resp = await axios.get(
      `https://www.cotter.app/api/v0/oauth/token/GITHUB/${cotterUserID}`,
      config
    );
    githubAccessToken = resp.data.tokens?.access_token;
  } catch (err) {
    res.statusCode = 500;
    res.end("Fail getting Github access token from Cotter API");
    return;
  }

  // Call Github API to get the repository data
  const githubConfig = {
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${githubAccessToken}`,
    },
  };
  try {
    let resp = await axios.get(
      `https://api.github.com/user/repos`,
      githubConfig
    );
    // We only want to show the repo name and url
    const repoData = resp.data?.map((repo) => ({
      full_name: repo.full_name,
      url: repo.html_url,
    }));
    res.statusCode = 200;
    res.json(repoData);
    return;
  } catch (err) {
    res.statusCode = 500;
    res.end("Fail getting repostories from Github API");
    return;
  }
};

export default checkJWT(handler);
