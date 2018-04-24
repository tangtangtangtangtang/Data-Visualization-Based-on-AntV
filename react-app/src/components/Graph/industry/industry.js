import store from '../../../store';

//图像attr
export const geom = (operationType, operationMethod, methodValue) => {
    let chart = store.getState().chart
    let type = {};
    switch (operationType) {
        case "point":
            type = chart.point();
            break;
        case "line":
            type = chart.line();
            break;
        case "area":
            type = chart.area();
            break;
        case "path":
            type = chart.path();
            break;
        case "interval":
            type = chart.interval();
            break;
        default:
            return;
    }
    type[operationMethod](methodValue);
    return;
}
    //scale

    //tooltip