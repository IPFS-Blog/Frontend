<p align="center">
  <a href="https://nextjs.org/" target="blank"><img src="https://raw.githubusercontent.com/ijsto/reactnextjssnippets/master/images/logo02.png" width="200" alt="Next Logo" /></a>
</p>

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Install

```bash
npx create-next-app@latest --typescript
# or
yarn create next-app --typescript
# or
pnpm create next-app --typescript
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Coding Style & Repair tool

### 1. Eslint

<a href="https://eslint.org/" target="blank"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--dWcPMxnR--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hk083ugohb8gcuv8xt8t.png" width="100" alt="Eslint Logo" /></a>

```bash
yarn add -D eslint
```

#### 設定

```json
// package.json
"scripts": {
    "lint": "next lint", //找到錯誤
    "lint:save": "eslint . --ext .js,.jsx,.cjs,.mjs,.tsx,.ts --fix --ignore-path .gitignore", //找到錯誤並修正
},
```

```json
// .vscode/settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true
}
```

#### 初始化並新增 eslint-config-next 套件

```bash
yarn lint

➜ yarn lint
yarn run v1.22.19
warning ..\..\..\package.json: No license field
$ next lint
? How would you like to configure ESLint? https://nextjs.org/docs/basic-features/eslint

Installing devDependencies (yarn):
- eslint-config-next
```

#### 產生.eslint.json

```js
//.eslint.js
module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:tailwindcss/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["tailwindcss", "simple-import-sort", "@typescript-eslint/eslint-plugin", "prettier"],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-array-constructor": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
};
```

### 2. Prettier

<a href="https://prettier.io/" target="blank"><img src="https://lh3.googleusercontent.com/sfHO5MKevLesNw1grlh21j0hgtH5IaMmASI5aVv_-gYyF7dvA96FlS7mdagWM6NDPxfEY2JwkArooEZZPOzXmu01-g=w640-h400-e365-rj-sc0x00ffffff" width="150" alt="Prettier Logo" /></a>

```bash
yarn add -D prettier
```

<a href="https://prettier.io/docs/en/options.html" target="blank">格式化規定</a>

```json
// .prettierrc
{
  "semi": true,//語末結尾有分號
  "trailingComma": "all",//所有尾隨逗號
  "singleQuote": false,//true單引號false雙引號
  "tabWidth": 2,//幾個空格
  "useTabs": false,//使用tab
  "printWidth": 120//多少字換行
  "arrowParens": "avoid",//箭頭函數盡可能省略括號
  "endOfLine": "auto",//設定為 LF
}

```

### 3. <a href="https://github.com/prettier/eslint-config-prettier" target="blank">eslint-config-prettier(用來解決 Prettier & Eslint Conflict)</a>

<a href="https://eslint.org/" target="blank"><img src="https://blog.logrocket.com/wp-content/uploads/2021/05/venn-diagram-prettier-eslint.png" width="300" alt="Prettier & Eslint Conflict" /></a>

#### prettier 一定要在最後，讓他去格式化

```json
// .eslintrc.js
 "extends": [
	"others",
    "prettier"
  ]
```

### 4. <a href="https://github.com/francoismassart/eslint-plugin-tailwindcss" target="blank">eslint-plugin-tailwindcss</a>

```json
// .eslintrc.js
 "extends": [
	"others",
    "plugin:tailwindcss/recommended"
  ],
  plugins: ["tailwindcss"],
```

### 5. <a href="https://openbase.com/js/@bigtaddy/eslint-plugin-simple-import-sort/documentation" target="blank">eslint-plugin-simple-import-sort</a>

```json
// .eslintrc.js
 "extends": [
	"others",
    "plugin:tailwindcss/recommended"
  ],
  plugins: ["tailwindcss"],
```

### 6. <a href="https://jenniesh.github.io/dev/NPM/husky-lint-staged/" target="blank">husky & lint-staged</a>

- <a href="https://jenniesh.github.io/dev/NPM/husky-lint-staged/" target="blank">husky 🐶</a> : 可以讓我們在如 git commit、git push 執行前，預先處理我們指定的任務
- <a href="https://jenniesh.github.io/dev/NPM/husky-lint-staged/" target="blank">lint-staged 🚫 💩</a> : 集中檢查範圍，只針對有變動的檔案，而非整個專案，也可以依據檔案類型，分別設置不同指令。

```bash
yarn add husky lint-staged -D
```

- 專案最初設定一次即可，會在根目錄下產生一個 .husky 資料夾，存放 husky 的相關腳本

```bash
npm set-script prepare "husky install"
npm run prepare
```

- 增加 hook: 指定在 git commit 前先跑過 npx lint-staged 腳本，如果失敗的話，git commit 不會被執行。

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

- 在.husky 資料夾下產生 pre-commit 檔案

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

#### lint-staged 設定

```json
// package.json
"lint-staged": {
    "*.{ts,js,jsx,tsx}": [
      "eslint --fix"
    ],
    "pages/**/*.**": "prettier --check --ignore-unknown --write"
  },
```

### 7. CommitLint

<a href="https://commitlint.js.org/#/" target="blank"><img src="https://ithelp.ithome.com.tw/upload/images/20211007/20107789YeuYEmwXlq.png" width="50" alt="CommitLint Logo" /></a>

#### 安裝 commitLint 使用 @commitlint/config-conventional 是 Commitlint 提供的規則包。

```bash
yarn add @commitlint/cli @commitlint/config-conventional -D
```

#### 設定

```js
// commitlint.config.js
module.exports = {
  extends: ["@commitlint/config-conventional"],
};
```

#### 使用 Husky 為 Commitlint 註冊 Git Hooks

- 使用 husky add 將指令加入 Git hooks ：

```bash
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

- 修改完後，要重新註冊 Git hooks ：

```bash
yarn
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
