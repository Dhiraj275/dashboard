export default function dataMaker(users) {
    const rawStates = []
    const labels = []
    const userCount = []
    users.map((item) => {
        rawStates.push(item.state)
    })
    const counts = {};
    for (const num of rawStates) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    var keys = Object.keys(counts)
    for (let i = 0; i < keys.length; i++) {
        if (counts[keys[i]] > 1) {
            labels.push(keys[i])
            userCount.push(counts[keys[i]])
        }
    }
    return {userCount, labels}

}