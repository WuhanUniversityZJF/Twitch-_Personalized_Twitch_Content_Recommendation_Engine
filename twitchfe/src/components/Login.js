/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-09-15 13:05:40
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-09-16 20:08:50
 * @FilePath: \twitchfe\src\components\Login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Button, Form, Input, message, Modal } from "antd";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login } from "../utils";

function Login({ onSuccess }) {
  //onSuccess是父组件传来的函数，用于登录成功后执行
  const [displayModal, setDisplayModal] = useState(false); //控制登录框的显示

  const handleCancel = () => {
    setDisplayModal(false); //点击取消按钮，关闭登录框
  };

  const signinOnClick = () => {
    setDisplayModal(true); //点击登录按钮，显示登录框
  };

  const onFinish = (data) => {
    //点击登录按钮，调用login函数进行登录
    login(data)
      .then(() => {
        setDisplayModal(false);
        message.success(`Welcome back`); //登录成功后，关闭登录框，并显示欢迎信息
        onSuccess();
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  return (
    <>
      <Button //登录按钮
        shape="round" //按钮形状
        onClick={signinOnClick} //点击按钮，调用signinOnClick函数
        style={{ marginRight: "20px" }} //按钮右边距
      >
        Login
      </Button>
      <Modal //登录框
        title="Log in" //标题
        visible={displayModal} //显示状态
        onCancel={handleCancel} //点击取消按钮，调用handleCancel函数
        footer={null} //不显示底部按钮
        destroyOnClose={true} //关闭时销毁
      >
        <Form name="normal_login" onFinish={onFinish} preserve={false}>
          <Form.Item //输入框
            name="username" //输入名字
            rules={[{ required: true, message: "Please input your Username!" }]} //校验规则，必填username
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password" //输入密码
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Login;
