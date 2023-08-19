const getLink = (link) => {
    let val

    try {
        val = (link?.startsWith('https://') || link?.startsWith('https://www.')) ? link.replace(/^https:\/\/(www.)?/, '') : link
        return val
    } catch (error) {

    }
}

export default getLink