import React, { Component } from "react";
import { Card } from "antd"

export default class ExhibitionTable extends Component {


    render() {
        return (
            <div>
                {
                    this.props.userData.graphData.map(item => {
                        let src = require(`./${item.graph}.png`);
                        return < Card
                            style={{ width: "200px", height: "200px" }}
                            cover={<img alt={""} src={src} />}>
                        </Card>
                    })
                }
            </div >
        )
    }
}