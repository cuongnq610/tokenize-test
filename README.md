## Directory Structure

`├──` <b>public</b> - Static folder <br />
`├──` <b>src</b> - Define react app <br />
`├──|──` assets - Define all resources <br />
`├──|──` components - Define common components <br />
`├──|──` constants - Define common constant variables <br />
`├──|──` features - Define all features, ( each feature with it own components, contexts, hooks, style,... inside ) <br />
`├──|──|──` trading-view - Define trading-view feature <br />
`├──|──|──|──` components - Define components will be used in trading-view <br />
`├──|──|──|──` hooks - Define custom hooks. <br />
`├──|──|──|──` hocs - Define HOCS for trading-view feature <br />
`├──|──|──|──` contexts - Define context <br />
`├──|──|──|──` styles.less - Define styles for trading-view. It could be a folder if it is more complicate<br />
`├──|──|──|──` index.ts - Manage import, export for trading-view feature <br />
`├──|──|──|──` TradingView.tsx - The root component for trading-view feature <br />
`├──|──` hooks - Define common hooks <br />
`├──|──` services - Define all services <br />
`├──|──` styles - Define styles, it can be seperated into mutilple files by group such as variables, animations, sizes <br />
`├──|──` types - Define type and global type, it can be separated into multiple files or folder similar to the above `styles` <br />
`├──|──` utils - Define ultility or helper functions like transform data, high order function,... <br /><br />
`├──|──` stores - Define common state management (Redux, Recoil, Zustand, ...).<br />
`├──` <b>.prettierrs</b> - Config [Prettier](https://prettier.io/docs/en/) <br />
`├──` <b>tsconfig.app.json</b> - Config [Typescript](https://www.typescriptlang.org/docs/) <br />
`├──` <b>tsconfig.json</b> - Config [Typescript](https://www.typescriptlang.org/docs/) <br />
`├──` <b>tsconfig.node.json</b> - Config [Typescript](https://www.typescriptlang.org/docs/) <br />
`├──` <b>vite.config.ts</b> - Config module bundler[Vite](https://vite.dev/guide/) <br />
