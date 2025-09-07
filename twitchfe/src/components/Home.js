import React from "react";
import { Button, Card, List, message, Tabs, Tooltip } from "antd"; //引入antd组件
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { addFavoriteItem, deleteFavoriteItem } from "../utils";

const { TabPane } = Tabs; //tab的pane
const tabKeys = {
  //tab的key
  Streams: "stream",
  Videos: "videos",
  Clips: "clips",
};

const processUrl = (url) =>
  url
    .replace("%{height}", "252") //替换高度
    .replace("%{width}", "480")
    .replace("{height}", "252")
    .replace("{width}", "480");

const renderCardTitle = (item, loggedIn, favs = [], favOnChange) => {
  //渲染卡片标题
  const title = `${item.broadcaster_name} - ${item.title}`; //标题

  const isFav = favs.find((fav) => fav.twitch_id === item.twitch_id); //判断是否是收藏

  const favOnClick = () => {
    //点击收藏按钮
    if (isFav) {
      //如果是收藏，则删除收藏
      deleteFavoriteItem(item)
        .then(() => {
          //删除收藏成功
          favOnChange();
        })
        .catch((err) => {
          message.error(err.message);
        });

      return;
    }

    addFavoriteItem(item) //否则添加收藏
      .then(() => {
        favOnChange(); //添加收藏成功
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  return (
    <>
      {loggedIn && ( //如果已经登录，则显示收藏按钮
        <Tooltip //显示提示
          title={isFav ? "Remove from favorite list" : "Add to favorite list"} //根据isFav判断提示内容
        >
          <Button
            shape="circle"
            icon={isFav ? <StarFilled /> : <StarOutlined />} //根据isFav判断图标为填充还是空心
            onClick={favOnClick}
          />
        </Tooltip>
      )}
      <div style={{ overflow: "hidden", textOverflow: "ellipsis", width: 450 }}>
        <Tooltip title={title}>
          <span>{title}</span>
        </Tooltip>
      </div>
    </>
  );
};

const renderCardGrid = (data, loggedIn, favs, favOnChange) => {
  return (
    <List //显示列表
      grid={{
        xs: 1, //小屏幕显示1列
        sm: 2, //中屏幕显示2列
        md: 4, //大屏幕显示4列
        lg: 4, //超大屏幕显示4列
        xl: 6, //超大屏幕显示6列
      }}
      dataSource={data}
      renderItem={(
        item //渲染每一项
      ) => (
        <List.Item style={{ marginRight: "20px" }}>
          <Card title={renderCardTitle(item, loggedIn, favs, favOnChange)}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: "100%", height: "100%" }}
            >
              <img
                alt="Placeholder"
                src={processUrl(item.thumbnail_url)}
                style={{ width: "100%", height: "100%" }}
              />
            </a>
          </Card>
        </List.Item>
      )}
    />
  );
};

const Home = ({ resources, loggedIn, favoriteItems, favoriteOnChange }) => {
  //Home组件
  const { videos, streams, clips } = resources; //从resources中获取videos, streams, clips
  const {
    videos: favVideos, //从favoriteItems中获取favVideos, favStreams, favClips
    streams: favStreams,
    clips: favClips,
  } = favoriteItems;

  return (
    //返回一个包含三个TabPane的Tabs组件
    //每个TabPane分别对应videos, streams, clips
    //每个TabPane中渲染一个CardGrid组件
    //forgeRender={true}属性表示强制渲染
    //key属性表示TabPane的唯一标识
    //tab属性表示TabPane的标题
    <Tabs defaultActiveKey={tabKeys.Streams}>
      <TabPane tab="Streams" key={tabKeys.Streams} forceRender={true}>
        {renderCardGrid(streams, loggedIn, favStreams, favoriteOnChange)}
      </TabPane>
      <TabPane tab="Videos" key={tabKeys.Videos} forceRender={true}>
        {renderCardGrid(videos, loggedIn, favVideos, favoriteOnChange)}
      </TabPane>
      <TabPane tab="Clips" key={tabKeys.Clips} forceRender={true}>
        {renderCardGrid(clips, loggedIn, favClips, favoriteOnChange)}
      </TabPane>
    </Tabs>
  );
};

export default Home;
