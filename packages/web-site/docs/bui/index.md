替换全局变量，以压缩调日志内容。

```typescript
import type { RollupOptions } from 'rollup'
import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import replace from '@rollup/plugin-replace'

const bundle: RollupOptions = {
    plugins: [
        replace({
            preventAssignment: true,
            __YiuTreeWorn__: JSON.stringify('No'),
        }),
        typescript(),
        terser(),
    ],
}
```