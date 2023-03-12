function handleFilterChange() {
    const feedFilters = document.getElementById('feed-filters');
    feedFilters.addEventListener('change', (e) => {
        if (e.target.id === 'hasImage') {
            hasImageFilter = e.target.checked;
        }
        if (e.target.id === 'hasTags') {
            hasTagsFilter = e.target.checked;
        }
        postFeed.innerText = '';

        filteredPosts = posts
            .filter((post) => {
                if (!hasImageFilter) return true;
                if (post.media) return true;
            })
            .filter((post) => {
                if (!hasTagsFilter) return true;
                if (post.tags.length > 0) return true;
            });
        renderPosts(postFeed, filteredPosts, followingList, {
            comments: true,
            reactions: true,
        });
    });
}

export { handleFilterChange };
