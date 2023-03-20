## 安装

```bash
npm i yiu-tree
yarn add yiu-tree
pnpm add yiu-tree
```

## 使用

### 定义入参树

```js
const tree = [
    { id: 1, children: [
        { id: '1-1', children: [
            { id: '1-1-1' }, { id: '1-1-2' }] },
        { id: '1-2' },
        { id: '1-3' } ],
    },
    { id: 2, children: [
        { id: '2-1' }] },
    { id: 3 },
    { id: 4 },
]
```

### ems & ts
```js
import { getFilterBySearch } from "yiu-tree"

const result = getFilterBySearch(tree, (node) => node.id === 2)
console.log(`过滤结果 :>> ${result}`)
```


### commonjs
```js
const { getFilterBySearch } = require("yiu-tree")

const result = getFilterBySearch(tree, (node) => node.id === 2)
console.log(`过滤结果 :>> ${result}`)
```


### CDN
```html
<script src="https://cdn.jsdelivr.net/npm/rubbish-tool/dist/umd/yiu-tree.min.js"></script>
<script>
    const { getFilterBySearch } = YiuTree;
    const result = getFilterBySearch(tree, (node) => node.id === 2);
    console.log(`过滤结果 :>> ${result}`);
</script>

<!-- 你也可以使用没有map文件链接 -->
<!-- <script src="https://cdn.jsdelivr.net/npm/rubbish-tool/dist/umd/yiu-tree.min.nomap.js"></script> -->
```