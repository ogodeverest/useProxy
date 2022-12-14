export { default as useProxy } from "./useProxy";
import createProxy from "./proxy";

const proxy = createProxy({
  count: 0,
});

export default proxy;
