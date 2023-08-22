## rust

> https://www.rust-lang.org/tools/install

验证按照上述文档中的命令操作即可

## C++ 编译

使用 [Mingw-w64](https://www.mingw-w64.org/downloads/)，学过 C 语言的同学应该使用过，感兴趣可以深入了解

也可选择使用 visual studio 的 c++ 相关扩展，可自行了解

### 下载

点击上方链接找到 `SourceForge` 入口，然后选择电脑对应版本的安装包，详细步骤见：https://zhuanlan.zhihu.com/p/76613134

如果安装过程中下载文件失败了则可以直接下载对应的压缩包，比如 `x86_64-win32-seh`，建议科学上网，解压后将 `mingw64` 文件夹 copy 到安装目录即可，同时需要将下面的 `bin` 目录添加 `path` 系统环境变量。

### 验证

```shell
gcc -v

# 将出现以下类似版本相关信息
# Thread model: win32
# gcc version 8.1.0 (x86_64-win32-seh-rev0, Built by MinGW-W64 project)
```

## windows 相关设置

```shell
rustup default stable-x86_64-pc-windows-gnu

rustup toolchain install stable-x86_64-pc-windows-gnu
```

执行完后将提示以下信息：

```shell
info: installing component 'rustc'
 71.4 MiB /  71.4 MiB (100 %)  14.2 MiB/s in  6s ETA:  0s
info: installing component 'rustfmt'
info: default toolchain set to 'stable-x86_64-pc-windows-gnu'

  stable-x86_64-pc-windows-gnu installed - rustc 1.71.1 (eb26296b5 2023-08-03)
```

## cargo 国内源加速设置（必要）

在 `C:\Users\xxx\.cargo` 目录下新建 `config` 文件（不带任何扩展名），内容如下：
备注：`tuna` 为清华镜像源，`ustc` 为中科大镜像源，按评价来看 `tuna` 更稳定，推荐 `replace-with` 设置为 `tuna`

```config
[source.crates-io]
registry = "https://github.com/rust-lang/crates.io-index"

replace-with = 'tuna'
[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"

[source.ustc]
registry = "git://mirrors.ustc.edu.cn/git/crates.io-index"

[net]
git-fetch-with-cli = true
```

注意：以上任何下载或者设置完成后均需要重启 cmd 以确保生效

## wasm-pack

> https://github.com/rustwasm/wasm-pack

一个专门用于打包、发布 WASM 的工具，可以用于构建可在 NPM 发布的 WASM 工具包。当我们开发完 WASM 模块时，可以直接使用 wasm-pack publish 命令把我们开发的 WASM 包发布到 NPM 上。使用 cargo install wasm-pack 命令来进行安装。

```shell
cargo install wasm-pack

# 成功提示信息：
# Installed package `wasm-pack v0.12.1` (executable `wasm-pack.exe`)
```

## 示例

### 代码

lib.rs

```rust
use wasm_bindgen::prelude::*;
use web_sys::console;

#[wasm_bindgen]
pub fn hello_world() {
    console::log_1(&JsValue::from_str("Hello World!"));
}

// 斐波那契数列，时间复杂度 O(2^n)
#[wasm_bindgen]
pub fn fib(n: i64) -> i64 {
    match n {
        1 => 1,
        2 => 1,
        _ => fib(n - 1) + fib(n - 2),
    }
}
```

index.js

```javascript
const fibJs = n => {
    if (n <= 2) {
        return 1;
    }

    return fibJs(n - 1n) + fibJs(n - 2n);
}

// 动态规划思想，空间换时间
const fibonacci = n => {
    let a = [0, 1, 1];
    if (n < 0) throw new Error('输入的数字不能小于0');
    if (n >= 3) {
        for (let i = 3; i <= n; i++) {
            a[i] = a[i - 1] + a[i - 2];
        }
    }
    return a[n];
}

async function main() {
    const module = await import('../pkg/index');

    // module.add(3, 3);

    console.log(1211, module);
    module.hello_world();

    // const FIB_N = 30;
    const FIB_N = 50n;

    console.time();
    console.log('fibonacci ---> ', fibonacci(FIB_N));
    console.timeEnd();
    
    console.log('-----------------------');
    
    console.time();
    console.log('wasm --> ', module.fib(FIB_N));
    console.timeEnd();

    console.log('-----------------------');

    console.time();
    console.log('js ---> ', fibJs(FIB_N));
    console.timeEnd();
}

main();
```

### 结果

```javascript
1211 Module {…}
index_bg.js:113 Hello World!
index.js:33 fibonacci --->  12586269025
index.js:34 default: 0.0849609375 ms
index.js:36 -----------------------
index.js:39 wasm -->  12586269025n
index.js:40 default: 138319.74877929688 ms
index.js:42 -----------------------
```
