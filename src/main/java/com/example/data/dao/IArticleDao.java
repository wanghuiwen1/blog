package com.example.data.dao;

import com.example.data.base.BaseRepository;
import com.example.data.entity.Article;
import org.springframework.stereotype.Repository;

/**
 * Created by Administrator on 2017/3/10.
 */
@Repository("articleDao")
public interface IArticleDao extends BaseRepository<Article, String> {
    String WHERE_BY_KEYWORD = " where title like ? or article_text like ? or summary like ?";

}