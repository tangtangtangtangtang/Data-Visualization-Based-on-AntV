import React, { Component } from 'react'
import { Icon } from 'antd'
import './TopSidePanel.component.less'

export default class TopSidePanel extends Component {
    constructor(props) {
        super(props)
        this.expand = this.expand.bind(this)
        this.state = {
            expandOrNot: false
        }
    }

    expand() {
        this.setState({
            expandOrNot: !this.state.expandOrNot
        })
    }

    render() {
        return (
            <React.Fragment>
                <div style={this.state.expandOrNot ? { top: 0 } : { top: -500 }} className={"mytoppanel"}>
                    <div style={{ height: '500px', width: '100%', overflowY: 'scroll' }}>
                        {this.props.content}
                    </div>
                    <Icon style={{ color: 'black' }} onClick={this.expand} className="topexpand" type="expandDown" />
                </div>
            </React.Fragment>
        )
    }
}