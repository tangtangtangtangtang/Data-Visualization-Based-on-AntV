import React, { Component } from 'react'
import { Icon } from 'antd'
import './RightSidePanel.component.less'

export default class RightSidePanel extends Component {
    constructor(props) {
        super(props)
        this.expand = this.expand.bind(this)

    }

    expand() {
        this.props.onExpandOrNot(!this.props.expandOrNot)
    }

    render() {
        return (
            <React.Fragment>
                <div style={this.props.expandOrNot ? { right: this.props.moveDistance || 0 } : { right: -420 }} className={"mypanel"}>
                    {this.props.content}
                    <Icon style={this.props.IconTop ? { top: this.props.IconTop, color: this.props.color } : { top: "50%", color: this.props.color }} onClick={this.expand} className="expand" type="expand-black" />
                </div>
            </React.Fragment>
        )
    }
}