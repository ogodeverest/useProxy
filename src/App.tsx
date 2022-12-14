import proxy, { useProxy } from "./hooks/store";

function Button() {
  return <button onClick={() => proxy.count++}>count is {proxy.count}</button>;
}

function App() {
  useProxy(proxy);
  return (
    <div className="App">
      <div>
        <a href="https://reactjs.org" target="_blank"></a>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>React + Vite</h1>
      <h2>On CodeSandbox!</h2>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR.
        </p>

        <p>
          Tip: you can use the inspector button next to address bar to click on
          components in the preview and open the code in the editor!
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Button />
      <Button />
    </div>
  );
}

export default App;
