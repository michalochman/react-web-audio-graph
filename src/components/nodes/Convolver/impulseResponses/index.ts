interface Require {
  (x: string): NodeRequireFunction;
  keys: () => string[];
}

const importAll = (require: Require) => {
  return require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {} as Record<string, any>);
};

// @ts-ignore TS2339: Property 'context' does not exist on type 'NodeRequire'.
const impulseResponses = importAll(require.context("./", false, /\.\/.+\.wav$/));

export default impulseResponses;
