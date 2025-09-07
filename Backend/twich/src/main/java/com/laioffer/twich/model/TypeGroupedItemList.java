package com.laioffer.twich.model;

import com.laioffer.twich.db.entity.ItemEntity;
import com.laioffer.twich.external.model.Clip;
import com.laioffer.twich.external.model.Stream;
import com.laioffer.twich.external.model.Video;


import java.util.ArrayList;
import java.util.List;


public record TypeGroupedItemList(
        List<ItemEntity> streams,
        List<ItemEntity> videos,
        List<ItemEntity> clips
) {


    public TypeGroupedItemList(List<ItemEntity> items) {//此构造函数用于过滤三种数据 filterForType逻辑随后声明
        this(
                filterForType(items, ItemType.STREAM),
                filterForType(items, ItemType.VIDEO),
                filterForType(items, ItemType.CLIP)
        );
    }

//此构造函数用于更正类型 fromStreams  fromVideos fromClips分类逻辑随后声明
    public TypeGroupedItemList(String gameId, List<Stream> streams, List<Video> videos, List<Clip> clips) {
        this(
                fromStreams(streams),
                fromVideos(gameId, videos),
                fromClips(clips)
        );
    }


    private static List<ItemEntity> filterForType(List<ItemEntity> items, ItemType type) {
        List<ItemEntity> filtered = new ArrayList<>();
        for (ItemEntity item : items) {
            if (item.type() == type) {
                filtered.add(item);
            }
        }
        return filtered;
    }


    private static List<ItemEntity> fromStreams(List<Stream> streams) {
        List<ItemEntity> items = new ArrayList<>();
        for (Stream stream : streams) {      //将streams列表中是Stream类型的对象stream加到列表items中
            items.add(new ItemEntity(stream));
        }
        return items;
    }


    private static List<ItemEntity> fromVideos(String gameId, List<Video> videos) {
        List<ItemEntity> items = new ArrayList<>();
        for (Video video : videos) {//将videos列表中是Video类型的对象video加到列表items中
            items.add(new ItemEntity(gameId, video));
        }
        return items;
    }


    private static List<ItemEntity> fromClips(List<Clip> clips) {
        List<ItemEntity> items = new ArrayList<>();
        for (Clip clip : clips) {//将clips列表中是Clip类型的对象clip加到列表items中
            items.add(new ItemEntity(clip));
        }
        return items;
    }
}
