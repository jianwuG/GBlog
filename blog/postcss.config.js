module.exports = {
    plugins: {
        "postcss-pxtorem": {
            remUnit: 37.5,
            baseDpr:2,
            exclude:/node-modules/
        },
        "postcss-preset-env":{
            autoprefixer: {
                flexbox: 'no-2009',
            },
            stage: 3,
        }
    }
};

// module.exports = {
//     plugins: [
//         [
//             'postcss-px2rem',
//             {
//                 remUnit: 75, // 50px = 1rem
//             remPrecision: 2,// rem的小数点后位数
//             baseDpr:2,
//             exclude:/node-modules/
//             },
//         ],
//         // This single-entry array is detected as misconfigured because it's
//         // missing the second element. To fix, unwrap the value.
//         ['postcss-plugin-2'],
//     ],
// }
