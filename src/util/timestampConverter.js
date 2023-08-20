
const timestampConverter = (timestamp) => {
    var rawTime = String(new Date(timestamp))
    if (rawTime === "Invalid Date") {
        return ""
    }
    else {
        return rawTime.replace("GMT+0530 (India Standard Time)", "")
    }

}

export default timestampConverter