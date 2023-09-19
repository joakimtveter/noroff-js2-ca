function setInitialFilterState(filters) {
    document.getElementById('hasImage').checked = filters?.hasImageFilter;
    document.getElementById('hasTags').checked = filters?.hasTagsFilter;
}

export { setInitialFilterState };
