'use strict';
//配置外部配置
/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };

// exports.sequelize={
//     enable:true,
//     package:'egg-sequelize',
// };
exports.mysql={
    enable:true,
    package:'egg-mysql',
};
exports.cors={
    enable:true,
    package:'egg-cors'
};