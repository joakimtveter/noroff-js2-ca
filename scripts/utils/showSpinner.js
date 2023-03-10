function showSpinner() {
    const spinner = document.getElementById('loading');
    if (!spinner) return;
    spinner.classList.remove('hide-element');
}

export { showSpinner };
