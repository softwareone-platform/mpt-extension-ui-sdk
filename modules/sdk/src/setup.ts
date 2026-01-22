import { Initializer } from './types';

const ROOT_SELECTOR = '#root';
const ROOT_ERROR = 'Extension UI setup can not be complete. A root element that should be provided by a platform could not be found.';

export function setup(initialize: Initializer) {
    const root = document.querySelector(ROOT_SELECTOR) as Element;
    if (!root) throw new Error(ROOT_ERROR)

    return initialize(root);
}