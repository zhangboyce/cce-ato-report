//
//const _  = require('lodash');
//
//let obj = {
//    '彩妆': [
//        {
//            name: '美宝莲',
//            weibo: { id: 'maybelline09', name: '美宝莲纽约'},
//            weixin: { id : "MjM5MDA5NjEwMA==", name : "美宝莲纽约" }
//        },
//        {
//            name: '伊蒂之屋',
//            weibo: { id: 'etudehousechina', name: 'ETUDEHOUSE伊蒂之屋'},
//            weixin: { id : "MjM5NDQwNTYwNA==", name : "ETUDEHOUSE伊蒂之屋" }
//        },
//        {
//            name: 'Kate',
//            weibo: { id: 'kanebokate', name: 'KATE凯朵'},
//            weixin: { id : "MjM5NjY1MTQxMg==", name : "KATE凯朵" }
//        },
//        {
//            name: '玛丽黛佳',
//            weibo: { id: '64608818', name: '玛丽黛佳官方'},
//            weixin: { id : "MjM5MTA2NjcyMA==", name : "玛丽黛佳" }
//        }
//    ],
//
//    '护肤': [
//        {
//            name: 'SKII' ,
//            weibo: { id: 'skiicn', name: 'SK-II'},
//            weixin: { id : "MzA4MjI1MzExNg==", name : "SK-II" }
//        },
//        {
//            name: '雅漾' ,
//            weibo: { id: 'eauthermaleavene', name: '雅漾'},
//            weixin: { id : "MzA5OTA5NjYzNw==", name : "雅漾" }
//        },
//        {
//            name: '倩碧' ,
//            weibo: { id: 'cliniqueu', name: 'Clinique倩碧'},
//            weixin: { id : "MzA4MDE5MjkxNA==", name : "倩碧Clinique" }
//        },
//        {
//            name: 'Whoo后' ,
//            weibo: { id: 'thehistoryofwhoo', name: 'The_History_Of_Whoo后'},
//            weixin: { id : "MzA4NzQ0MzU4Mw==", name : "TheHistoryOf后" }
//        },
//        {
//            name: '雪花秀' ,
//            weibo: { id: 'sulwhasoochina', name: '雪花秀Sulwhasoo'},
//            weixin: { id : "MzA5MzUyNTcyNA==", name : "雪花秀" }
//        },
//        {
//            name: '资生堂' ,
//            weibo: { id: 'shiseidocn', name: 'SHISEIDO资生堂官方微博'},
//            weixin: { id : "MzA5MjI4MzIxOA==", name : "资生堂SHISEIDO" }
//        },
//        {
//            name: '法兰琳卡' ,
//            weibo: { id: 'franic2013', name: '法兰琳卡FRANIC'},
//            weixin: { id : "MjM5NTY5Mzc1Mg==", name : "法兰琳卡FRANIC" }
//        },
//        {
//            name: '韩束' ,
//            weibo: { id: 'kanscn', name: '韩束KANS'},
//            weixin: { id : "MjM5NzI3MDUzNA==", name : "韩束" }
//        },
//        {
//            name: '百雀羚' ,
//            weibo: { id: '51870pechoin', name: '百雀羚'},
//            weixin: { id : "MzA3MDI4MzYwMA==", name : "百雀羚" }
//        },
//        {
//            name: '佰草集' ,
//            weibo: { id: 'jahwaherborist', name: '佰草集herborist'},
//            weixin: { id : "MjM5MDI1MzE1MQ==", name : "佰草集Herborist" }
//        },
//        {
//            name: '自然堂' ,
//            weibo: { id: 'chcedo', name: '自然堂'},
//            weixin: { id : "MjM5NjI1MTY0MQ==", name : "自然堂" }
//        },
//        {
//            name: '相宜本草' ,
//            weibo: { id: 'inoherb', name: '相宜本草'},
//            weixin: { id : "MjM5MTE4ODAzMg==", name : "相宜本草Inoherb" }
//        }
//    ],
//    '综合': [
//        {
//            name: '巴黎欧莱雅' ,
//            weibo: { id: 'lorealparis', name: '巴黎欧莱雅'},
//            weixin: { id : "MzA3MzA3ODYxNw==", name : "欧莱雅美丽殿堂" }
//        },
//        {
//            name: '娇兰' ,
//            weibo: { id: 'guerlainchina', name: 'Guerlain法国娇兰'},
//            weixin: { id : "MjM5NzI2MjA4Nw==", name : "法国娇兰Guerlain" }
//        },
//        {
//            name: '兰蔻' ,
//            weibo: { id: 'lancome', name: '兰蔻LANCOME'},
//            weixin: { id : "MjM5NzAwMTc0Mg==", name : "兰蔻LANCOME" }
//        },
//        {
//            name: '阿玛尼' ,
//            weibo: { id: 'giorgioarmanibeauty', name: '阿玛尼'},
//            weixin: { id : "MzA3MDcxMzQwNQ==", name : "阿玛尼ArmaniBeauty" }
//        },
//        {
//            name: '香奈儿' ,
//            weibo: { id: 'chanel', name: '香奈儿CHANEL'},
//            weixin: { id : "MjM5NzYxMDM2NQ==", name : "香奈儿CHANEL" }
//        },
//        {
//            name: 'Dior' ,
//            weibo: { id: 'dior', name: 'Dior迪奥'},
//            weixin: { id : "MzAwNTI1NzM2OQ==", name : "Dior迪奥美妍荟" }
//        },
//        {
//            name: '羽西' ,
//            weibo: { id: 'buzzmyheart', name: '羽西品牌官方微博'},
//            weixin: { id : "MjM5NzgwNDY0MQ==", name : "羽西YUESAI" }
//        },
//        {
//            name: '雅诗兰黛' ,
//            weibo: { id: 'esteelauder', name: '雅诗兰黛'},
//            weixin: { id : "MjM5ODgwNzAwNA==", name : "雅诗兰黛" }
//        },
//        {
//            name: '悦诗风吟' ,
//            weibo: { id: 'innisfreechina', name: 'Innisfree悦诗风吟'},
//            weixin: { id : "MjM5MjE3NDMwMA==", name : "Innisfree悦诗风吟" }
//        }
//    ],
//    '头发': [
//        {
//            name: '清扬' ,
//            weibo: { id: 'clear2011', name: 'Clear清扬'}
//        },
//        {
//            name: '海飞丝' ,
//            weibo: { id: 'headandshoulders', name: '海飞丝实力派'},
//            weixin: { id : "MjM5MjE5MDY2MA==", name : "海飞丝实力派" }
//        },
//        {
//            name: '吕' ,
//            weibo: { id: 'ryohairchina', name: '吕Ryo'},
//            weixin: { id : "MzAxNzUyMTkzMg==", name : "吕Ryo" }
//        }
//    ],
//    '男士': [
//        {
//            name: '曼秀雷敦' ,
//            weibo: { id: 'mentholatum001', name: '曼秀雷敦中国官方微博'},
//            weixin: { id : "MjM5ODAxMjY2Ng==", name : "曼秀雷敦" }
//        },
//        {
//            name: '妮维雅' ,
//            weibo: { id: 'niveacn', name: 'NIVEA妮维雅官方'},
//            weixin: { id : "MjM5MDAyODA2MA==", name : "妮维雅男士" }
//        }
//    ]
//};
//
//console.log(_.map(_.filter(_.flatten(_.values(obj)), item => item.weixin), item => {
//    return item.weixin.id
//}));
//
//const dateformat = require('dateformat');
//
//console.log(new Date('2016-12-07').getTime());
//console.log(new Date('2016-12-08').getTime()-new Date('2016-12-07').getTime());
//
//
//
//const redis = require('redis');
//let client = redis.createClient({
//    host: '8f2f23a8ab9a47ba.m.cnhza.kvstore.aliyuncs.com',
//    port: 6379,
//    password: 'e3aEqW8834Sra4i',
//    db: 67
//});
//
//client.on("error", function (err) {
//    console.log("Error " + err);
//});
//
//client.hmget("article_read_like", ["MzAwNTI1NzM2OQ==_2651775343_1", "MzAwNTI1NzM2OQ==_2651775265_1", "MzAwNTI1NzM2OQ==_2651775343_2", "MzAwNTI1NzM2OQ==_2651775385_1", "MzAwNTI1NzM2OQ==_2651775366_1", "MzAwNTI1NzM2OQ==_2651775265_3", "MzAwNTI1NzM2OQ==_2651775343_3", "MzAwNTI1NzM2OQ==_2651775265_2"], (err, result) => {
//    console.log(result);
//    client.quit();
//});
//
//let array = [{biz: 'biz1', mid: 'mid1', idx: 'idx1'}, {biz: 'biz1', mid: 'mid11', idx: 'idx11'}, {biz: 'biz2', mid: 'mid2', idx: 'idx2'}];
//
//let a = _.groupBy(array, arr => arr.biz);
//
//console.log(_.reduce(_.groupBy(array, arr => arr.biz), (map, items, key) => {
//    map[key] = _.map(items, item => `${item.biz}_${item.mid}_${item.idx}`);
//    return map;
//}, {}));

let _ = require('lodash');

let array = [/* 1 */ {"idx" : "4", "mid" : "2651980097", "biz" : "MjM5MDA5NjEwMB=="}, /* 2 */ {"biz" : "MjM5MDA5NjEwMB==", "idx" : "1", "mid" : "2651981229"}, /* 3 */ {"idx" : "2", "mid" : "2651980415", "biz" : "MjM5MDA5NjEwMA=="}, /* 4 */ {"idx" : "3", "mid" : "2651980518", "biz" : "MjM5MDA5NjEwMA=="}, /* 5 */ {"idx" : "5", "mid" : "2651980415", "biz" : "MjM5MDA5NjEwMA=="}, /* 6 */ {"idx" : "2", "mid" : "2651980207", "biz" : "MjM5MDA5NjEwMA=="}, /* 7 */ {"idx" : "2", "mid" : "2651979757", "biz" : "MjM5MDA5NjEwMA=="}, /* 8 */ {"idx" : "1", "mid" : "2651980262", "biz" : "MjM5MDA5NjEwMA=="}, /* 9 */ {"idx" : "1", "mid" : "2651980001", "biz" : "MjM5MDA5NjEwMA=="}, /* 10 */ {"biz" : "MjM5MDA5NjEwMA==", "idx" : "4", "mid" : "2651980865"}, /* 11 */ {"biz" : "MjM5MDA5NjEwMA==", "idx" : "5", "mid" : "2651980984"}, /* 12 */ {"idx" : "1", "mid" : "2651980097", "biz" : "MjM5MDA5NjEwMA=="}, /* 13 */ {"biz" : "MjM5MDA5NjEwMA==", "idx" : "4", "mid" : "2651980984"}, /* 14 */ {"idx" : "1", "mid" : "2651980518", "biz" : "MjM5MDA5NjEwMA=="}, /* 15 */ {"biz" : "MjM5MDA5NjEwMA==", "idx" : "3", "mid" : "2651980984"}, /* 16 */ {"idx" : "3", "mid" : "2651980001", "biz" : "MjM5MDA5NjEwMA=="}, /* 17 */ {"idx" : "3", "mid" : "2651980207", "biz" : "MjM5MDA5NjEwMA=="}, /* 18 */ {"idx" : "1", "mid" : "2651980764", "biz" : "MjM5MDA5NjEwMA=="}, /* 19 */ {"biz" : "MjM5MDA5NjEwMA==", "idx" : "2", "mid" : "2651981052"}, /* 20 */ {"idx" : "3", "mid" : "2651980415", "biz" : "MjM5MDA5NjEwMA=="}, /* 21 */ {"biz" : "MjM5MDA5NjEwMA==", "idx" : "4", "mid" : "2651981281"}, /* 22 */ {"idx" : "1", "mid" : "2651980415", "biz" : "MjM5MDA5NjEwMA=="}, /* 23 */ {"biz" : "MjM5MDA5NjEwMA==", "idx" : "2", "mid" : "2651980865"}, /* 24 */ {"biz" : "MjM5MDA5NjEwMA==", "idx" : "1", "mid" : "2651980865"}, /* 25 */ {"idx" : "1", "mid" : "2651980596", "biz" : "MjM5MDA5NjEwMA=="}, /* 26 */ {"idx" : "2", "mid" : "2651979892", "biz" : "MjM5MDA5NjEwMA=="}, /* 27 */ {"idx" : "3", "mid" : "2651979892", "biz" : "MjM5MDA5NjEwMA=="}, /* 28 */ {"idx" : "4", "mid" : "2651980207", "biz" : "MjM5MDA5NjEwMA=="}, /* 29 */ {"idx" : "3", "mid" : "2651980764", "biz" : "MjM5MDA5NjEwMA=="}, /* 30 */ {"biz" : "MjM5MDA5NjEwMA==", "idx" : "3", "mid" : "2651980865"}, /* 31 */ {"idx" : "3", "mid" : "2651980262", "biz" : "MjM5MDA5NjEwMA=="}, /* 32 */ {"biz" : "MjM5MDA5NjEwMA==", "idx" : "1", "mid" : "2651981339"}, /* 33 */ {"biz" : "MjM5MDA5NjEwMA==", "idx" : "1", "mid" : "2651980984"}, /* 34 */ {"idx" : "1", "mid" : "2651979757", "biz" : "MjM5MDA5NjEwMA=="}, /* 35 */ {"biz" : "MjM5MDA5NjEwMA==", "idx" : "2", "mid" : "2651980984"}, /* 36 */ {"idx" : "2", "mid" : "2651980764", "biz" : "MjM5MDA5NjEwMA=="}, /* 37 */ {"idx" : "2", "mid" : "2651980518", "biz" : "MjM5MDA5NjEwMA=="}, /* 38 */ {"idx" : "2", "mid" : "2651980097", "biz" : "MjM5MDA5NjEwMA=="}, /* 39 */ {"idx" : "1", "mid" : "2651980301", "biz" : "MjM5MDA5NjEwMA=="}, /* 40 */ {"biz" : "MjM5MDA5NjEwMA==", "idx" : "3", "mid" : "2651981281"}, /* 41 */ {"biz" : "MjM5MDA5NjEwMA==", "idx" : "2", "mid" : "2651981281"}, /* 42 */ {"idx" : "2", "mid" : "2651980262", "biz" : "MjM5MDA5NjEwMA=="}, /* 43 */ {"biz" : "MjM5MDA5NjEwMA==", "idx" : "1", "mid" : "2651981281"}, /* 44 */ {"idx" : "3", "mid" : "2651980097", "biz" : "MjM5MDA5NjEwMA=="}, /* 45 */ {"idx" : "2", "mid" : "2651980301", "biz" : "MjM5MDA5NjEwMA=="}, /* 46 */ {"idx" : "4", "mid" : "2651979892", "biz" : "MjM5MDA5NjEwMA=="}, /* 47 */ {"biz" : "MjM5MDA5NjEwMA==", "idx" : "1", "mid" : "2651981052"}, /* 48 */ {"idx" : "2", "mid" : "2651980001", "biz" : "MjM5MDA5NjEwMA=="}, /* 49 */ {"idx" : "4", "mid" : "2651980415", "biz" : "MjM5MDA5NjEwMA=="}, /* 50 */ {"idx" : "1", "mid" : "2651979892", "biz" : "MjM5MDA5NjEwMA=="}];


let pushedMap = _.groupBy(array, arr => arr.biz + '_' + arr.mid);
console.log(pushedMap);

let i = 0;
for (let prop in pushedMap) {
    if (prop.startsWith('MjM5MDA5NjEwMB==')) i ++;
}


console.log('sss' + JSON.stringify(i));

console.log((new Date('2016-12-11')-new Date('2016-12-10'))/(1000*60*60*24));