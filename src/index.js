import React from "react";
import { hydrateRoot } from "react-dom/client";
import "./index.css";
//app
import App from "./App";

//CommonHOC
import { HelperHOC } from "./dataWrapper";
//Client side renderedData - Suspense fetch on the fly you'll get the data
let ClientSideData = HelperHOC(App);

//container
const container = document.getElementById("root");

//hydrateRoot - To obtain SSR, for selective hydration
hydrateRoot(
  container,
  <React.StrictMode>
    <ClientSideData />
  </React.StrictMode>
);

//React 18 CSR - to obtain new features like (automatic batching, concurrency, transistion)

// const container = document.getElementById('app');
// const root = ReactDOM.createRoot(container);
// root.render(<App />);
