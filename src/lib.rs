// pub fn add(left: usize, right: usize) -> usize {
//     left + right
// }

// #[cfg(test)]
// mod tests {
//     use super::*;

//     #[test]
//     fn it_works() {
//         let result = add(2, 2);
//         assert_eq!(result, 4);
//     }
// }

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
