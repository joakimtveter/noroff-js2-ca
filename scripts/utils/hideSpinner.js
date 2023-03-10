function hideSpinner() {
    const spinner = document.getElementById('loading');
    if (!spinner) return;
    spinner.classList.add('hide-element');
}

export { hideSpinner };
