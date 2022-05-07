import { createResource, createSignal } from "solid-js";
import "./index.css";

export default function Home() {
  const [hydrationLabel, setHydrationLabel] = createSignal('no value from onHydrated')
  const [label] = createResource<string>(async function (_, { refetching }) {
    console.log(!refetching ? 'refetch' : 'fetch')
    return 'hello world'
  }, {
    onHydrated: function (_, { value }) {
      const hydrationLablel = 'value from onHydrated: ' + value;
      console.log(hydrationLablel)

      // P.S.: Updating signals in onHydrated only works if they are scheduled for the next frame
      // This maybe should be documented when 1.4 comes out
      requestAnimationFrame(() => setHydrationLabel(hydrationLablel))
    }
  })

  return (
    <main>
      <h1>{hydrationLabel()}!</h1>
      {label()}
      <p>
        Visit{" "}
        <a href="https://solidjs.com" target="_blank">
          solidjs.com
        </a>{" "}
        to learn how to build Solid apps.
      </p>
    </main>
  );
}
