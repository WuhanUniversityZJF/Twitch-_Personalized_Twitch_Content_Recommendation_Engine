import React, { useState, useEffect } from "react";
import { Layout, message, Menu } from "antd";
import { LikeOutlined, FireOutlined } from "@ant-design/icons";
import {
  logout,
  getFavoriteItem,
  getTopGames,
  searchGameById,
  getRecommendations,
} from "./utils";
import PageHeader from "./components/PageHeader";
import CustomSearch from "./components/CustomSearch";
import Home from "./components/Home";

const { Header, Content, Sider } = Layout; //引入Layout组件的Header、Content、Sider子组件

function App() {
  const [loggedIn, setLoggedIn] = useState(false); //定义一个状态变量，用于存储登录状态
  const [favoriteItems, setFavoriteItems] = useState([]); //定义一个状态变量，用于存储收藏的游戏信息
  const [topGames, setTopGames] = useState([]); //定义一个状态变量，用于存储热门游戏信息
  const [resources, setResources] = useState({
    //定义一个状态变量，用于存储资源信息
    videos: [],
    streams: [],
    clips: [],
  });

  useEffect(() => {
    //在组件挂载时获取热门游戏信息
    getTopGames()
      .then((data) => {
        //获取热门游戏信息成功时，将数据存储到topGames状态变量中
        setTopGames(data);
      })
      .catch((err) => {
        message.error(err.message); //获取热门游戏信息失败时，显示错误信息
      });
  }, []);

  const signinOnSuccess = () => {
    setLoggedIn(true); //登录成功时，将登录状态设置为true
    getFavoriteItem().then((data) => {
      //获取收藏的游戏信息成功时，将数据存储到favoriteItems状态变量中
      setFavoriteItems(data); //获取收藏的游戏信息失败时，显示错误信息
    });
  };

  const signoutOnClick = () => {
    //点击登出按钮时，调用logout函数进行登出操作，并在登出成功时将登录状态设置为false
    logout()
      .then(() => {
        setLoggedIn(false); //登出成功时，将登录状态设置为false
        message.success("Successfully Signed out");
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const customSearchOnSuccess = (data) => {
    setResources(data); //搜索成功时，将搜索结果存储到resources状态变量中
  };

  const onGameSelect = ({ key }) => {
    if (key === "recommendation") {
      //如果选择的key是recommendation，则调用getRecommendations函数获取推荐的游戏信息
      getRecommendations().then((data) => {
        setResources(data);
      });

      return;
    }

    searchGameById(key).then((data) => {
      //如果选择的key不是recommendation，则调用searchGameById函数根据游戏ID获取游戏信息
      setResources(data);
    });
  };

  const favoriteOnChange = () => {
    getFavoriteItem() //获取收藏的游戏信息
      .then((data) => {
        setFavoriteItems(data);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const mapTopGamesToProps = (topGames) => [
    //将topGames数组映射为props
    {
      label: "Recommend for you!",
      key: "recommendation",
      icon: <LikeOutlined />, //推荐游戏的图标
    },
    {
      label: "Popular Games",
      key: "popular_games",
      icon: <FireOutlined />, //热门游戏的图标
      children: topGames.map((game) => ({
        label: game.name,
        key: game.id,
        icon: (
          <img
            alt="placeholder" //游戏图片
            src={game.box_art_url //游戏图片的URL
              .replace("{height}", "40") //替换图片的高度
              .replace("{width}", "40")} //替换图片的宽度
            style={{ borderRadius: "50%", marginRight: "20px" }}
          />
        ),
      })),
    },
  ];

  return (
    <Layout>
      <Header>
        <PageHeader //页面头部
          loggedIn={loggedIn} //登录状态
          signoutOnClick={signoutOnClick} //登出点击事件
          signinOnSuccess={signinOnSuccess} //登录成功事件
          favoriteItems={favoriteItems} //收藏的游戏
        />
      </Header>
      <Layout>
        <Sider width={300} className="site-layout-background">
          <CustomSearch onSuccess={customSearchOnSuccess} />
          <Menu //菜单
            mode="inline"
            onSelect={onGameSelect}
            style={{ marginTop: "10px" }}
            items={mapTopGamesToProps(topGames)}
          />
        </Sider>
        <Layout style={{ padding: "24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              height: 800,
              overflow: "auto",
            }}
          >
            <Home //主页
              resources={resources} //资源
              loggedIn={loggedIn} //登录状态
              favoriteOnChange={favoriteOnChange} //收藏变化事件
              favoriteItems={favoriteItems} //收藏的游戏
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
