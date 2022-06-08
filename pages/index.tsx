import { useMachine } from "@xstate/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { myMachine } from "../machines/myFirstMechine";

const Home: NextPage = () => {
  const [state, send] = useMachine(myMachine);
  const router = useRouter();
  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", gap: "15px" }}>
      <button onClick={() => router.push("/todos")}>todos test</button>
      <button onClick={() => router.push("/hover")}>hovers test</button>
    </div>
  );
};

export default Home;
