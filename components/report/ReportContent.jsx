'use strict';

import React, { Component, PropTypes } from 'react'
import _ from 'lodash';

import WeiboFilterModal from './WeiboFilterModal.jsx';

export default class ReportContent extends Component {

    render() {
        const {
            weiboWatchMap,
            weiboStatMap,
            weixinStatMap,
            industryMap,
            removeWeiboArticles,
            startDate,
            endDate } = this.props;

        const convertNum = num => {
            return num >= 10000 ? Math.round(num/10000) + 'W' : Math.round(num);
        };

        const handleNum = (num, callback) => {
            return (num === '--' || !/^[1-9]\d*\.?\d*|0\.\d+|0$/.test(num + '')) ? '--' : (callback && callback instanceof Function ) ? callback(num) : num;
        };

        const getNum = (obj, field) => {
           return obj && (obj[field] || obj[field] == 0 || obj[field] == '0') ? obj[field] : '--';
        };

        const getWeiboTd = (weiboId, content) =>
            <td>
                <a className="btn" data-toggle="modal" data-target={ '#'+ weiboId }>{ content }</a>
            </td>;

        let trs = [];
        let modals = [];
        for (let ind in industryMap) {
            let dataList = industryMap[ind];
            let length = dataList.length;

            dataList.forEach((e, i) => {
                let tds = [];
                if (i === 0) {
                    tds.push(<td rowSpan={ length }>{ ind }</td>);
                }

                // weibo
                let weiboId = e.weibo && e.weibo.id;
                let weiboWatch = weiboId && weiboWatchMap && weiboWatchMap[weiboId];
                let weiboStat = weiboId && weiboStatMap && weiboStatMap[weiboId];

                modals.push(
                    <WeiboFilterModal
                        weiboId={ weiboId }
                        weiboName={ e.weibo.name || e.name }
                        startDate={ startDate }
                        endDate={ endDate }
                        removeWeiboArticleIds={ _.map((removeWeiboArticles[weiboId] || []), art => art.id) }
                        onToggleCheckWeiboArticle={ this.props.onToggleCheckWeiboArticle }
                        onFilterWeiboArticle={ this.props.onFilterWeiboArticle } />
                );

                tds.push(getWeiboTd(weiboId, e.name));
                tds.push(getWeiboTd(weiboId, handleNum(getNum(weiboWatch, 'fans_num'), convertNum)));
                tds.push(getWeiboTd(weiboId, handleNum(getNum(weiboStat, 'total_article'), num => (num / this.props.days).toFixed(2) )));
                tds.push(getWeiboTd(weiboId, handleNum(getNum(weiboStat, 'average_forward_num'), num => Math.round(num))));
                tds.push(getWeiboTd(weiboId, handleNum(getNum(weiboStat, 'average_comment_num'), num => Math.round(num))));
                tds.push(getWeiboTd(weiboId, handleNum(getNum(weiboStat, 'average_praise_num'), num => Math.round(num))));

                // weixin
                let weixinId = e.weixin && e.weixin.id;
                let weixinStat = weixinId && weixinStatMap && weixinStatMap[weixinId];

                tds.push(<td>{ e.name } </td>);
                tds.push(<td>{ handleNum(getNum(weixinStat, 'total_pushed'), num => (num / this.props.weeks).toFixed(2)) }</td>);
                tds.push(<td>{ handleNum(getNum(weixinStat, 'average_read_num'), num => convertNum(num)) }</td>);
                tds.push(<td>{ handleNum(getNum(weixinStat, 'average_like_num'), num => Math.round(num) ) }</td>);

                trs.push(<tr key={ e.weibo.id }>{ tds }</tr>);
            });
        }

        return (
            <div className="row">
                <div className="table-responsive" id="table_wrapper">
                    <table className="table table-striped table-bordered table-hover table-inverse">
                        <thead>
                        <tr>
                            <th rowSpan="2">行业</th>
                            <th rowSpan="2">品牌</th>
                            <th colSpan="5">微博</th>
                            <th rowSpan="2">品牌</th>
                            <th colSpan="3">微信</th>
                        </tr>
                        <tr>
                            <th>粉丝数</th>
                            <th>发布数量/天</th>
                            <th>平均转发</th>
                            <th>平均评论</th>
                            <th>平均点赞</th>
                            <th>推送频率/周</th>
                            <th>平均阅读</th>
                            <th>平均点赞</th>
                        </tr>
                        </thead>
                        <tbody>
                            { trs }
                        </tbody>
                    </table>
                </div>
                { modals }
            </div>
        );
    }
}

ReportContent.propTypes = {
    weiboWatchMap: PropTypes.object,
    weiboStatMap: PropTypes.object,
    weixinStatMap: PropTypes.object,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    days: PropTypes.number,
    weeks: PropTypes.number,
    industryMap: PropTypes.object.isRequired,
    removeWeiboArticles: PropTypes.object.isRequired,
    onToggleCheckWeiboArticle: PropTypes.func.isRequired,
    onFilterWeiboArticle: PropTypes.func.isRequired
};

