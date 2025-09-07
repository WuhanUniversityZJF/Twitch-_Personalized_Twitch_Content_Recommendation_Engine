package com.laioffer.twich.db;


import com.laioffer.twich.db.entity.FavoriteRecordEntity;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.ListCrudRepository;


import java.util.List;


public interface FavoriteRecordRepository extends ListCrudRepository<FavoriteRecordEntity, Long> {


    List<FavoriteRecordEntity> findAllByUserId(Long userId);


    boolean existsByUserIdAndItemId(Long userId, Long itemId);//验证数据库是否已经存在某一个用户ID


    @Query("SELECT item_id FROM favorite_records WHERE user_id = :userId")
    List<Long> findFavoriteItemIdsByUserId(Long userId); //搜索某一个用户喜欢的Items


    @Modifying            //所有数据库修改动作都需要加上@Modifying
    @Query("DELETE FROM favorite_records WHERE user_id = :userId AND item_id = :itemId")
    void delete(Long userId, Long itemId); //将某一个用户从数据库中删除
}