'use strict';

import React from 'react';
import _ from 'lodash';
import Loading from './../common/Loading.jsx';
import ReportContent from './ReportContent.jsx';
import industryMap from '../../data/industry_map.js';
import DatePicker from 'react-datepicker';
import '../../public/css/react-datepicker.css';
import moment from 'moment';

const format = 'YYYY-MM-DD';
let weixinIds = _.map(_.filter(_.flatten(_.values(industryMap)), item => item.weixin), item => {
    return item.weixin.id
}).join(',');

let weiboIds = _.map(_.filter(_.flatten(_.values(industryMap)), item => item.weibo), item => {
    return item.weibo.id
}).join(',');

export default class ReportContainer extends React.Component {

    constructor(props) {
        super(props);

        let date = new Date();
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        this.state = {
            weiboWatchMap: null,
            weiboStatMap: null,
            weiboStatMapBak: null,
            weixinStatMap: null,

            startDate: moment(firstDay),
            endDate: moment(lastDay),

            removeWeiboArticles: {}
        }
    }

    handleToggleCheckWeiboArticle = (weiboId, article) => {

        let newState = this.state.removeWeiboArticles[weiboId] || [];
        let index = newState.findIndex(art => art.id == article.id);
        if (index === -1) newState = [...newState, article];
        else newState.splice(index, 1);

        let obj = {};
        obj[weiboId] = newState;

        this.setState({ removeWeiboArticles: _.assign({}, this.state.removeWeiboArticles, obj) });
    };

    handleFilterWeiboArticle = (weiboId) => {
        let articles = this.state.removeWeiboArticles[weiboId];
        if (articles && articles.length != 0) {
            let weiboStat = this.state.weiboStatMapBak[weiboId];
            if (weiboStat) {
                let o_total_article = weiboStat.total_article;
                let o_average_comment_num = weiboStat.average_comment_num;
                let o_average_forward_num = weiboStat.average_forward_num;
                let o_average_praise_num = weiboStat.average_praise_num;

                let r_total_article = articles.length;
                let r_total_comment_num =
                    _.reduce(articles, (total, article) => total + (article.comment_num || 0), 0);
                let r_total_forward_num =
                    _.reduce(articles, (total, article) => total + (article.forward_num || 0), 0);
                let r_total_praise_num =
                    _.reduce(articles, (total, article) => total + (article.praise_num || 0), 0);

                let n_total_article = o_total_article - r_total_article;
                if (n_total_article == 0) {
                    let obj = {};
                    obj[weiboId] = {};
                    this.setState({ weiboStatMap: _.assign({}, this.state.weiboStatMap, obj) });
                } else {
                    let n_average_comment_num =
                        (o_total_article * o_average_comment_num - r_total_comment_num) / n_total_article;
                    let n_average_forward_num =
                        (o_total_article * o_average_forward_num - r_total_forward_num) / n_total_article;
                    let n_average_praise_num =
                        (o_total_article * o_average_praise_num - r_total_praise_num) / n_total_article;

                    let obj = {};
                    obj[weiboId] = {
                        total_article: n_total_article,
                        average_comment_num: n_average_comment_num,
                        average_forward_num: n_average_forward_num,
                        average_praise_num: n_average_praise_num
                    };

                    this.setState({ weiboStatMap: _.assign({}, this.state.weiboStatMap, obj) });
                }
            }
        } else {
            let weiboStat = this.state.weiboStatMapBak[weiboId];
            this.setState({ weiboStatMap: _.assign({}, this.state.weiboStatMap, weiboStat)});
        }
    };


    handleFlush = () => {

        this.setState({
            weiboWatchMap: null,
            weiboStatMap: null,
            weiboStatMapBak: null,
            weixinStatMap:null,
            removeWeiboArticles: {}
        });

        this.load();
    };

    load = () => {
        const startDate = this.state.startDate.format(format);
        const endDate = this.state.endDate.format(format);

        $.get('/api/weibo/watchlist', {}, result => {
            this.setState({ weiboWatchMap: result });
        });

        $.get('/api/weibo/calculate', { startDate: startDate, endDate: endDate, weiboIds: weiboIds }, result => {
            this.setState({ weiboStatMap: result, weiboStatMapBak: result });
        });

        $.get('/api/weixin/calculate', { startDate: startDate, endDate: endDate, weixinIds: weixinIds }, result => {
            this.setState({ weixinStatMap: result });
        });
    };

    componentDidMount() {
        this.load();

        let comp = this;
        $(document).ready(() => {
            $("#btn-download-excel").click((e) => {
                e.preventDefault();
                let data_type = 'data:application/vnd.ms-excel';
                let table_div = document.getElementById('table_wrapper');
                let table_html = table_div.outerHTML.replace(/ /g, '%20');

                let a = document.createElement('a');
                a.href = data_type + ', ' + table_html;
                a.download = `Wechat&Weibo_Data_Report__${ comp.state.startDate.format(format) }__${ comp.state.endDate.format(format) }__${ moment().format('YYYY-MM-DD hh:mm:ss.S') }.xls`;
                a.click();
            });
        });
    }

    render() {

        let days = ((this.state.endDate - this.state.startDate) / (1000*60*60*24)) + 1;
        let months = days / 30;
        let weeks = days / 7;

        return (
            <div className="container content">
                <div className="row date-picker">
                    <div className="panel from">
                        <span>From:</span>
                        <DatePicker dateFormat={ format }
                                    todayButton={ "Today" }
                                    maxDate={ this.state.endDate }
                                    openToDate={ this.state.endDate }
                                    selected={ this.state.startDate }
                                    showMonthDropdown
                                    showYearDropdown
                                    scrollableYearDropdown
                                    scrollableMonthDropdown
                                    dropdownMode="select"
                                    onChange={ (date) => { this.setState({ startDate: date }) } } />
                    </div>
                    <div className="panel to">
                        <span>To:</span>
                        <DatePicker dateFormat={ format }
                                    selected={ this.state.endDate }
                                    todayButton={ "Today" }
                                    maxDate={ moment() }
                                    minDate={ this.state.startDate }
                                    showMonthDropdown
                                    showYearDropdown
                                    scrollableYearDropdown
                                    scrollableMonthDropdown
                                    dropdownMode="select"
                                    onChange={ (date) => { this.setState({ endDate: date }) } } />
                    </div>
                    <div className="panel flush">
                        <button className="btn btn-flush" onClick={ this.handleFlush }>Query</button>
                    </div>
                    <div className="panel download-excel">
                        <button className="btn btn-download-excel" id="btn-download-excel">Export Excel</button>
                    </div>
                </div>
                {
                    this.state.weiboWatchMap ||
                    this.state.weiboStatMap ||
                    this.state.weixinStatMap  ?
                    <ReportContent
                        industryMap={ industryMap }
                        weiboWatchMap={ this.state.weiboWatchMap }
                        weixinStatMap={ this.state.weixinStatMap }
                        weiboStatMap={ this.state.weiboStatMap }
                        startDate={ this.state.startDate.format(format) }
                        endDate={ this.state.endDate.format(format) }
                        days={ days }
                        weeks={ weeks }
                        removeWeiboArticles={ this.state.removeWeiboArticles }
                        onToggleCheckWeiboArticle={ this.handleToggleCheckWeiboArticle }
                        onFilterWeiboArticle={ this.handleFilterWeiboArticle } /> :
                    <Loading />
                }
            </div>
        );
    }
}

