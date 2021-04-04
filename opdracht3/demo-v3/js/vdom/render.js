const renderElement = vNode => {
    const node = document.createElement(vNode.tagName);

    for (const [key, value] of Object.entries(vNode.attributes)) {
        node.setAttribute(key, value);
    }

    for (const child of vNode.children) {
        const nChild = render(child);
        node.appendChild(nChild);
    }

    return node;
}

const render = vNode => {
    if(typeof vNode === "string") {
        return document.createTextNode(vNode);
    }

    return renderElement(vNode);
}

export default render;
