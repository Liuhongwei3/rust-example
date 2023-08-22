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
