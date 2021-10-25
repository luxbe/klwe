export function outsideClick(
    node: EventTarget,
    callback: (e: MouseEvent) => void,
): SvelteActionReturnType {
    function onDocumentClick(e: MouseEvent) {
        const path = e.composedPath();

        !path.includes(node) && callback(e);
    }

    document.addEventListener('click', onDocumentClick);

    return {
        destroy() {
            document.removeEventListener('click', onDocumentClick);
        },
    };
}
