// See: https://github.com/reklawnos/worklet-loader/blob/5f5e02e99a6df2e65d71a8071c9226f8a737d508/README.md#integrating-with-typescript
declare module "*.worklet.ts" {
  const exportString: string;
  export default exportString;
}
