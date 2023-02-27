import { createHtmlElement } from './utils.js';

function renderComments(location, commentsArray, id) {
    for (let i = 0; i < commentsArray.length; i++) {
        const comment = commentsArray[i];
        if (comment.replyToId !== id) continue;
        const commentElement = createHtmlElement('div', 'post-comment');
        const commentHeader = createHtmlElement(
            'p',
            'post-comment__header',
            `${comment?.author?.name} - ${timeSince(new Date(comment?.created).getTime())}`
        );
        const commentBody = createHtmlElement('p', 'post-comment__body', comment?.body);
        commentElement.appendChild(commentHeader);
        commentElement.appendChild(commentBody);
        const children = createHtmlElement('div', 'post-comment__children');
        renderComments(children, commentsArray, comment.id);

        location.appendChild(commentElement);
    }
}

export { renderComments };
