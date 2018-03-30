import React, { Component } from "react";
import PropTypes from "prop-types"
import { Card } from "antd"

export default class ExhibitionTable extends Component {


    render() {
        return (
            <div>
            {
                this.props.userData.map(item => {
                    <Card
                        style={{ width: "200px", height: "200px" }}
                        cover={<img alt={""} src={item.src} />}
                    >
                    </Card>
                })
            }
            </div>
        )
    }
}

ExhibitionTable.PropTypes ={
    userData:PropTypes.array
}