import React, { Component } from 'react';

class TodoItem extends Component {

    removeItem(e){
        this.props.removeItem(this);
    }

    toogleItem(e){
        this.props.toogleItem(this);
    }

    render() {
        let status = 'list-group-item clearfix';

        if (this.props.item.status === 'true') {
            status = status + ' list-group-item-success';
        }
        return (
            <li className={status}>
                <span>{this.props.item.title}</span>
                <div className="pull-right" role="group">
                    <button onClick={this.toogleItem.bind(this)}
                            type="button"
                            className="btn btn-xs btn-success img-circle">✓
                    </button>
                    <span> </span>
                    <button onClick={this.removeItem.bind(this)}
                            type="button"
                            className="btn btn-xs btn-danger img-circle">Ｘ
                    </button>
                </div>
            </li>
        );
    }
}

export default TodoItem;
