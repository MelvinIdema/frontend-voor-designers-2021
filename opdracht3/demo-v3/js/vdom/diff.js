import render from "./render.js";

const zip = (xs, ys) => {
    const zipped = [];
    for(let i = 0; i < Math.min(xs.length, ys.length); i++ ) {
        zipped.push([xs[i], ys[i]]);
    }
    return zipped;
}

const diffAttributes = (oldAttributes, newAttributes) => {
    const patches = [];

    for (const [key, value] of Object.entries(newAttributes)) {
        patches.push(node => {
            node.setAttribute(key, value);
            return node;
        })
    }

    for (const key in oldAttributes) {
        patches.push(node => {
            if(!(key in newAttributes)) {
                patches.push(node => {
                    node.removeAttribute(key);
                    return node;
                })
            }
        })
    }

    return node => {
        for (const patch of patches) {
            patch(node);
        }
    }
}

const diffChildren = (oldVChildren, newVChildren) => {
    const childPatches = [];

    oldVChildren.forEach((oldVChild, index) => {
        childPatches.push(diff(oldVChild, newVChildren[index]));
    })

    const additionalPatches = [];
    for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
        additionalPatches.push(node => {
            node.appendChild(render(additionalVChild));
            return node;
        });
    }

    return parent => {
        for(const [patch, child] of zip(childPatches, parent.childNodes)) {
            patch(child);
        }

        for (const patch of additionalPatches) {
            patch(parent);
        }

        return parent;
    }
}

const diff = (oldVNode, newVNode) => {
    if(newVNode === undefined) {
        return node => {
            node.remove();
            return undefined;
        }
    }

    if(typeof oldVNode === "string" || typeof newVNode === "string") {
        if(oldVNode !== newVNode) {
            return node => {
                const newNode = render(newVNode);
                node.replaceWith(newNode);
                return newNode;
            }
        }

        return node => undefined;
    }

    if(oldVNode.tagName !== newVNode.tagName) {
        return node => {
            const newNode = render(newVNode);
            node.replaceWith(newNode);
        }
    }

    const patchAttributes = diffAttributes(oldVNode.attributes, newVNode.attributes);
    const patchChildren = diffChildren(oldVNode.children, newVNode.children);

    return node => {
        patchAttributes(node);
        patchChildren(node);
        return node;
    };
}

export default diff;
