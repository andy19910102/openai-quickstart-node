import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  console.log("[文字輸入]", animalInput);

  async function onSubmit(event) {
    event.preventDefault();
    setResult("等待回應中...");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>Uninus 智能客服</h3>
        <form onSubmit={onSubmit}>
          <textarea className="form-control" rows="8" name="animal" onChange={(e) => setAnimalInput(e.target.value)} value={animalInput} placeholder={"Type here..."}></textarea>
          <input type="submit" value="Send" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
