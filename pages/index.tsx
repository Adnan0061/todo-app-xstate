import { useMachine } from "@xstate/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { myMachine } from "../machines/myFirstMechine";

const Home: NextPage = () => {
  const [state, send] = useMachine(myMachine);
  const router = useRouter();
  return (
    <>
      <button onClick={() => router.push("/hover")}>hovers test</button>
      <button onClick={() => router.push("/todos")}>todos test</button>
    </>
  );
};

export default Home;
