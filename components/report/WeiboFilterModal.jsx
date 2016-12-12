'use strict';

import React, { Component, PropTypes } from 'react';
import Loading from './../common/Loading.jsx';
import _ from 'lodash';

export default class WeiboFilterModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            articleList: [],
            loaded: false
        };
    }

    componentDidMount() {
        let $this = $('#'+ this.props.weiboId);
        let comp = this;
        $this.on('shown.bs.modal', (e) => {
            console.log('shown');
            $.get('/api/weibo/articles', {
                weiboId: comp.props.weiboId,
                startDate: comp.props.startDate,
                endDate: comp.props.endDate
            }, results => {
                this.setState({ articleList: results, loaded: true });
            });
        });
        $this.on('hidden.bs.modal', (e) => {
            console.log('hidden');
            this.setState({ articleList: [], loaded: false });
        });
    }

    handleChange = (articleId) => () => {
        this.props.onToggleCheckWeiboArticle(this.props.weiboId, articleId);
    };

    handleChecked = articleId => !this.props.removeWeiboArticleIds.includes(articleId);

    handleSubmit = () => {
        this.props.onFilterWeiboArticle(this.props.weiboId);
    };

    render() {
        let items = _.map(this.state.articleList, article => {
            return (
                <li className="list-group-item" key={ article._id }>
                    <input type="checkbox"
                           checked={ this.handleChecked(article._id) }
                           onChange={ this.handleChange(
                           {
                               id: article._id,
                               forward_num: article.forward_num ,
                               comment_num: article.comment_num ,
                               praise_num: article.praise_num
                           }) }/>

                    <div className="article-detail">
                        <div className="article-content">
                            { article.content }
                            <a href={ article.url } target="_blank">{ article.url && article.url.substring(0, 30) } ...</a>
                            <label>{ article.publish_date }</label>
                        </div>
                        <div className="article-status">
                            <span><i className="fa fa-share-square-o" />&nbsp;{ article.forward_num }</span>
                            <span><i className="fa fa-comment-o" />&nbsp;{ article.comment_num }</span>
                            <span><i className="fa fa-thumbs-o-up" />&nbsp;{ article.praise_num }</span>
                        </div>
                    </div>
                </li>
            );
        });

        return (
            <div className="weixin-filter-modal modal fade" id={ this.props.weiboId } tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h3> { this.props.weiboName } </h3>
                        </div>
                        <div className="modal-body">
                            {
                                this.state.articleList.length == 0 && !this.state.loaded && <Loading />
                            }
                            {
                                this.state.articleList.length == 0 && this.state.loaded &&
                                <h3 style={{ color: 'whitesmoke' }}>
                                    No articles!
                                </h3>
                            }
                            {
                                this.state.articleList.length != 0 && this.state.loaded &&
                                <div className="article-list">
                                    <ul className="list-group">
                                        { items }
                                    </ul>
                                </div>
                            }

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={ this.handleSubmit }>OK</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

WeiboFilterModal.propTypes = {
    weiboId: PropTypes.string.isRequired,
    weiboName: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    removeWeiboArticleIds: PropTypes.array.isRequired,
    onToggleCheckWeiboArticle: PropTypes.func.isRequired,
    onFilterWeiboArticle: PropTypes.func.isRequired
};