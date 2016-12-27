'use strict';
const parse = require('co-body');
const router = require('koa-router')();
const redis = require('redis');
const _ = require('lodash');
const ConnectMongo = require('../common/ConnectMongo');
const config = require('config');


router.get('/', function *() {
    yield this.render('index');
});

router.get('/api/weibo/articles', function *() {
    let startTime = this.query.startDate + ' 00:00:00';
    let endTime = this.query.endDate + ' 59:59:59';
    let weiboId = this.query.weiboId;

    console.log('Execute /api/weibo/articles, params: ' + JSON.stringify(this.query));

    let match = { weibo_id: weiboId, publish_date: { $gte: startTime, $lte: endTime }};

    console.log('match: ' + JSON.stringify(match));

    let mongodb = yield ConnectMongo.get('contentpool');
    let results = mongodb.collection("weibo").find(match).sort({ publish_date: -1 });
    let items = yield results.toArray() || [];

    console.log('Execute /api/weibo/articles, results: ' + JSON.stringify(items));

    this.body = items;
});

router.get('/api/weibo/watchlist', function *() {

    console.log('Execute /api/weibo/watchlist, params: {}');

    let mongodb = yield ConnectMongo.get('raw');
    let results = mongodb.collection("weibo_watchlist").find({});
    let items = yield results.toArray() || [];

    this.body = items.reduce((map, item) => {
        map[item._id] = { name: item.name, fans_num: item.fans_num };
        return map;
    }, {})
});

router.get('/api/weibo/calculate', function *() {
    let startTime = this.query.startDate + ' 00:00:00';
    let endTime = this.query.endDate + ' 59:59:59';
    let weiboIds = this.query.weiboIds;

    console.log('Execute /api/weibo/calculate, params: ' + JSON.stringify(this.query));

    let match = { publish_date: { $gte: startTime, $lte: endTime } };
    if (weiboIds) match['weibo_id'] = { $in: weiboIds.split(',') };

    let group = {
        _id: '$weibo_id',
        total_article: {$sum: 1},
        average_comment_num: {$avg: "$comment_num"},
        average_forward_num: {$avg: "$forward_num"},
        average_praise_num: {$avg: "$praise_num"}
    };

    console.log('match: ' + JSON.stringify(match));
    console.log('group: ' + JSON.stringify(group));

    let mongodb = yield ConnectMongo.get('contentpool');
    let results = mongodb.collection("weibo").aggregate([ { $match: match }, { $group: group }]);
    let items = yield results.toArray() || [];

    this.body = items.reduce((map, item) => {
        map[item._id] = {
            total_article: item.total_article,
            average_comment_num: item.average_comment_num,
            average_forward_num: item.average_forward_num,
            average_praise_num: item.average_praise_num
        };
        return map;
    }, {});
});

router.get('/api/weixin/calculate', function *() {
    let startTime = this.query.startDate;
    let endTime = this.query.endDate;
    let weixinIds = this.query.weixinIds;

    console.log('Execute /api/weixin/calculate, params: ' + JSON.stringify(this.query));

    let start = new Date(startTime).getTime() / 1000;
    let end = new Date(endTime).getTime() / 1000 ;
    let bizs = weixinIds.split(',');

    let match = { biz: { $in: bizs }, "comm_msg_info.datetime": { $gte: start, $lt: end }};
    let fields = { idx: 1, mid: 1, biz: 1, _id: 0 };
    let group = { _id: '$biz', total_article: {$sum: 1} };

    console.log('match: ' + JSON.stringify(match));

    let mongodb = yield ConnectMongo.get('raw');

    let biz_totalCur = mongodb.collection("weixin_article_list").aggregate([ { $match: match }, { $group: group }]);
    let biz_totalArr = yield biz_totalCur.toArray() || [];

    console.log('biz_totalArr: ' + JSON.stringify(biz_totalArr));

    let biz_mid_idxCur = mongodb.collection("weixin_article_list").find(match, fields);
    let biz_mid_idxArr = yield biz_mid_idxCur.toArray() || [];

    console.log('biz_mid_idxArr: ' + JSON.stringify(biz_mid_idxArr));

    let biz_mid_idxMap = _.reduce(_.groupBy(biz_mid_idxArr, arr => arr.biz), (map, its, key) => {
        map[key] = _.map(its, it => `${it.biz}_${it.mid}_${it.idx}`);
        return map;
    }, {});

    let pushedMap = _.groupBy(biz_mid_idxArr, arr => arr.biz + '_' + arr.mid);

    let client = redis.createClient(config.get('redis'));

    let result = {};
    for (let biz_total of biz_totalArr) {
        let biz = biz_total._id;
        let total_article = biz_total.total_article;

        let total_pushed = 0;
        for (let prop in pushedMap) {
            if (prop.startsWith(biz)) total_pushed ++;
        }

        let obj = { total_pushed: total_pushed, total_article: total_article };

        let biz_mid_idx = biz_mid_idxMap[biz];
        let read_like_nums = yield hmget(client, "article_read_like", biz_mid_idx);
        if (read_like_nums) {
            let totalReadNum = 0, totalLikeNum = 0;
            for (let read_like_num of read_like_nums) {
                let read_like_num_obj = JSON.parse(read_like_num);
                totalReadNum += ( read_like_num_obj && read_like_num_obj.read_num || 0);
                totalLikeNum += ( read_like_num_obj && read_like_num_obj.like_num || 0);
            }

            obj['average_read_num'] = totalReadNum / total_article;
            obj['average_like_num'] = totalLikeNum / total_article;
        }
        result[biz] = obj;
    }

    console.log('result: ' + JSON.stringify(result));
    this.body = result;
});

let hmget = function (client, key, fileds) {
    return new Promise((resolve, reject) => {
        client.hmget(key, fileds , (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

module.exports = router;