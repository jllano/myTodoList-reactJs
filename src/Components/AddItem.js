import React, { Component } from 'react';
import uuid from 'uuid';

class AddItem extends Component {

    createId() {
        return uuid.v4();
    }

    handleAddItem(e) {
        e.preventDefault();
        let task = this.refs.task.value;

        if (!task.trim()) {
            return;
        }
        this.props.addItem({ "id": this.createId(), "title": task, "status": "false" });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleAddItem.bind(this)}>
                    <div className="form-group">
                        <label  className="col-md-2 control-label"></label>
                        <div className="col-md-8 pull-left">
                            <input type="text" id="task" className="form-control" ref="task" placeholder="What needs to be done?"/>
                        </div>
                        <div className="col-md-2 pull-left">
                            <input type="submit" className="btn btn-primary" value="Save Item"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10 col-md-offset-2 text-right"></div>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddItem;
