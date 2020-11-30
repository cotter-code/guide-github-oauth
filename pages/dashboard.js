import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Cotter from "cotter";
import axios from "axios";
import Navbar from "../components/Navbar";
import { API_KEY_ID } from "../apiKeys";

export default function Dashboard() {
  const [err, seterr] = useState(null);
  const [repos, setrepos] = useState([]);

  // Get a list of repositories
  useEffect(() => {
    getRepositories();
  }, []);

  const getRepositories = async () => {
    // 1️⃣  Get Access Token for Logged-in User
    var cotter = new Cotter(API_KEY_ID); // 👈 Specify your API KEY ID here
    const accessToken = await cotter.tokenHander.getAccessToken();

    // 2️⃣ Make the request to our `/api/repo` endpoint
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken?.token}`,
      },
    };
    try {
      let resp = await axios.get("/api/repo", config);
      setrepos(resp.data);
    } catch (err) {
      seterr(JSON.stringify(err.response?.data));
    }
  };

  const connectToGithub = async () => {
    var cotter = new Cotter(API_KEY_ID); // 👈 Specify your API KEY ID here
    const accessToken = await cotter.tokenHandler.getAccessToken();
    cotter.connectSocialLogin("GITHUB", accessToken?.token); // pass in the provider's name
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.subtitle}>
          Welcome! Here's a list of your Github Repos
        </h1>
        {/*  Show any error here */}
        <div style={{ color: "#FF0000" }}>{err}</div>

        {/* If there's no Github access token, show a button to connect a Github account */}
        {err?.includes("Fail getting Github access token from Cotter API") && (
          <div className={styles.card} onClick={connectToGithub}>
            Connect Github
          </div>
        )}

        {/*  3️⃣ Show the list of repositories */}
        <div className={styles.main}>
          {repos.map((repo) => (
            <div className={styles.card}>
              <h3>{repo.full_name}</h3>
              <a href={repo.url}>{repo.url}</a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
