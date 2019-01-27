const ball = document.querySelector('.select');

function menuActive(section) {
    if (section == 1) {
        ball.classList.remove('search');
        ball.classList.remove('dash');
        ball.classList.remove('account');
        ball.classList.add('home');
    } else if (section == 2) {
        ball.classList.remove('home');
        ball.classList.remove('dash');
        ball.classList.remove('account');
        ball.classList.add('search');

    } else if (section == 3) {
        ball.classList.remove('home');
        ball.classList.remove('search');
        ball.classList.remove('account');
        ball.classList.add('dash');
    } else {
        ball.classList.remove('home');
        ball.classList.remove('search');
        ball.classList.remove('dash');
        ball.classList.add('account');
    }
}