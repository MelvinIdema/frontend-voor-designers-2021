export default (tagName, { attributes = {}, children = [] } = {}) => {
    return {
        tagName,
        attributes,
        children
    }
}
