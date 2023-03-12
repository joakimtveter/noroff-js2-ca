import { getValueFromURLParameter } from '../utils.js';

function readFiltersfromPrameters() {
    const hasImageFilter = getValueFromURLParameter('hasImage') === 'true';
    const hasTagsFilter = getValueFromURLParameter('hasTags') === 'true';

    return { hasImageFilter, hasTagsFilter };
}

export { readFiltersfromPrameters };
