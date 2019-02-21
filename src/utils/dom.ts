export function toggleClass(
  elem: HTMLElement,
  className: string,
  bool: boolean
) {
  if (bool === true) return elem.classList.add(className);
  elem.classList.remove(className);
}

export function createElement<T extends HTMLElement>(
  tag: keyof HTMLElementTagNameMap,
  className: string,
  content?: string
): T {
  const e = window.document.createElement(tag) as T;
  className = className || "";
  content = content || "";

  e.className = className;

  if (content !== undefined) e.textContent = content;

  return e;
}

export function clearNode(node: HTMLElement) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

export function findParent(
  node: Element,
  condition: (n: Element) => boolean
): Element | undefined {
  if (condition(node)) return node;
  else if (node.parentNode)
    return findParent(node.parentNode as Element, condition);

  return undefined; // nothing found
}

export function createNumberInput(
  inputClassName: string,
  opts?: Record<string, any>
) {
  const wrapper = createElement<HTMLDivElement>("div", "numInputWrapper"),
    numInput = createElement<HTMLInputElement>(
      "input",
      "numInput " + inputClassName
    ),
    arrowUp = createElement<HTMLSpanElement>("span", "arrowUp"),
    arrowDown = createElement<HTMLSpanElement>("span", "arrowDown");

  numInput.type = "text";
  numInput.pattern = "\\d*";

  if (opts !== undefined)
    for (const key in opts) numInput.setAttribute(key, opts[key]);

  wrapper.appendChild(numInput);
  wrapper.appendChild(arrowUp);
  wrapper.appendChild(arrowDown);

  return wrapper;
}

export function getEventTarget(event: Event): EventTarget | null {
  if (typeof event.composedPath === "function") {
    const path = event.composedPath();

    return path[0];
  }

  return event.target;
}

export function containsElement(parent: Node, other: Node) {
  if (parent.contains(other)) {
    return true;
  }

  let currentNode: Node = other;
  let i = 0; // Just in case something weird happens, let's not crash the browser…

  while (i < 1000 && currentNode && currentNode.getRootNode().nodeName === '#document-fragment') {
    currentNode = (currentNode.getRootNode() as any).host;
    if (parent.contains(currentNode)) {
      return true;
    }
    i += 1;
  }
  return parent.contains(currentNode);
}
