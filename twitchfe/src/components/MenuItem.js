/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-09-15 14:47:13
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-09-16 20:00:24
 * @FilePath: \twitchfe\src\components\MenuItem.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Menu } from "antd"; //Menu是antd的组件
import React from "react";

function MenuItem({ items }) {
  //item后面的？的作用：如果items为空，则返回一个空数组，代码不会出现exception
  //target="_blank" rel="noopener noreferrer"的作用：在新窗口打开链接   rel为额外保护，防止钓鱼网站
  //${item.broadcaster_name} - ${item.title}为模板字符串，将item.broadcaster_name和item.title拼接在一起
  return items?.map((item) => (
    <Menu.Item key={item.id}>
      <a href={item.url} target="_blank" rel="noopener noreferrer">
        {`${item.broadcaster_name} - ${item.title}`}
      </a>
    </Menu.Item>
  ));
}

export default MenuItem;
