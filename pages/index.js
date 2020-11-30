import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import Cotter from "cotter"; //  1️⃣  Import Cotter
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { API_KEY_ID } from "../apiKeys";

export default function Home() {
  const router = useRouter();
  //  2️⃣ Initialize and show the form
  useEffect(() => {
    var cotter = new Cotter(API_KEY_ID); // 👈 Specify your API KEY ID here
    cotter
      .signInWithLink() // use .signInWithOTP() to send an OTP
      .showEmailForm() // use .showPhoneForm() to send magic link to a phone number
      .then((response) => {
        console.log(response); // show the response
        router.push("/dashboard");
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.subtitle}>Welcome to my Github App</h1>

        {/*  3️⃣  Put a <div> that will contain the form */}
        <div id="cotter-form-container" style={{ width: 300, height: 300 }} />
      </div>
    </>
  );
}
