import { useState, useEffect } from "react";
import Link from "next/link";
import Cotter from "cotter";
import { API_KEY_ID } from "../../apiKeys";

export default function Navbar() {
  const [loggedIn, setloggedIn] = useState(false);
  const [email, setemail] = useState(null);
  useEffect(() => {
    checkLoggedIn();
  }, []);

  // TODO: Check if the user is logged-in
  const checkLoggedIn = async () => {
    const cotter = new Cotter(API_KEY_ID); // 👈 Specify your API KEY ID here
    const accessToken = await cotter.tokenHander.getAccessToken();
    if (accessToken?.token.length > 0) {
      setloggedIn(true);
      const user = cotter.getLoggedInUser();
      setemail(user?.identifier);
    } else {
      setloggedIn(false);
    }
  };

  // TODO: Log out the user
  const logOut = async () => {
    const cotter = new Cotter(API_KEY_ID); // 👈 Specify your API KEY ID here
    await cotter.logOut();
    setloggedIn(false);
    window.location.href = "/";
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      {loggedIn ? (
        <div style={{ padding: 20 }} onClick={logOut}>
          Log Out
        </div>
      ) : (
        <Link href="/">
          <a style={{ padding: 20 }}>Log In</a>
        </Link>
      )}

      {loggedIn && <div style={{ padding: 20 }}>{email}</div>}
      <Link href="/dashboard">
        <a style={{ padding: 20 }}>Go to Dashboard</a>
      </Link>
    </div>
  );
}
