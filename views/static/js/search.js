
let skaterInput = document.getElementById('skater-search');
let skaterSearchButton = document.getElementById('skater-search-submit');

skaterSearchButton.addEventListener('click', () => {
    window.location.href = window.location.origin + '/find/' + skaterInput.value;
});

skaterInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        skaterSearchButton.click();
    }
});