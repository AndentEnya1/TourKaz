let profile = null;

let temp = {
    email: null,
    pass: null,
    name: null
};

let arr = [];

Object.keys(localStorage).forEach(key => {
    let test = JSON.parse(localStorage.getItem(key))
    arr.push({email: key, pass: test.pass, name: test.name});
});

window.onload = e => {
    login();
};

function check() {
    let con = document.querySelector('.regist__con');
    let email = document.querySelector('#email');
    let pass = document.querySelector('#password');
    let filter = arr.filter(elem => elem.email == email.value);

    if (!email.value || !email.value.match(/@/) || filter.length) email.classList.add('regist__err');
    else email.classList.remove('regist__err');

    if (!pass.value) pass.classList.add('regist__err');
    else pass.classList.remove('regist__err');

    if (!email.value || !pass.value || !email.value.match(/@/) || filter.length) return true;
    else {
        temp.email = email.value;
        temp.pass = pass.value;
    }
}

document.querySelector('#regist').onclick = e => {
    e.preventDefault();
    let con = document.querySelector('.regist__con');

    if (check()) return;

    con.classList.remove(['reg_0', 'reg_1', 'reg_2']);
    con.classList.add('reg_1');
};

document.querySelector('#next').onclick = e => {
    e.preventDefault();
    let con = document.querySelector('.regist__con');
    let email = document.querySelector('#email');
    let pass = document.querySelector('#password');
    let name = document.querySelector('#name');

    if (!name.value) name.classList.add('regist__err');
    else name.classList.remove('regist__err');

    if (!name.value) return;
    else {
        let key = email.value;
        temp.name = name.value;
        temp = JSON.stringify({name: temp.name, pass: temp.pass});
        localStorage.setItem(key, temp);
        document.cookie = `user=${key}`;
        login();
    }
};

document.querySelector('#signin').onclick = e => {
    e.preventDefault();
    let con = document.querySelector('.regist__con');
    let email = document.querySelector('#email');
    let pass = document.querySelector('#password');
    let name = document.querySelector('#name');
    let filter = arr.filter(elem => elem.email == email.value);

    if (filter.length) {
        if (filter[0].email == email.value && filter[0].pass == pass.value) {
            console.log('ok');
            document.cookie = `user=${filter[0].email}`;
            login();
        } else {
            email.classList.add('regist__err');
            pass.classList.add('regist__err');
        }
    } else {
        email.classList.add('regist__err');
        pass.classList.add('regist__err');
    }
};

function login () {
    let user = document.cookie.split(' ').filter(item => item.slice(0, 4) == 'user');

    if (user.length) {
        let con = document.querySelector('.regist__con');
        con.classList.remove(['reg_0', 'reg_1', 'reg_2']);
        con.classList.add('reg_2');

        arr = [];

        Object.keys(localStorage).forEach(key => {
            let test = JSON.parse(localStorage.getItem(key))
            arr.push({email: key, pass: test.pass, name: test.name});
        });

        user = user[0].split('=')
        userData = arr.filter(elem => elem.email == user[1]);
        console.log(userData);

        document.querySelector('#hello').innerHTML = `Привет, ${userData[0].name}, это ваш профиль.`;
    }
}

document.querySelector('#exit').onclick = e => {
    document.cookie = 'user=exit; max-age=0';
    window.location.reload();
};