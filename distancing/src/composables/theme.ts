import { reactive, ref } from '@vue/composition-api';
export default function () {
    let lightMode: any = localStorage.getItem('lightMode');

    const changeTheme = () => {
        var theme: any = document.body?.dataset.theme;
        if (theme == '') {
            localStorage.setItem('lightMode', false);
            document.body?.setAttribute('data-theme', "dark")
            return;
        }
        if (theme == 'dark') {
            localStorage.setItem('lightMode', true);
            document.body?.setAttribute('data-theme', "")
            return;
        }
    }

    return { lightMode, changeTheme}
}

