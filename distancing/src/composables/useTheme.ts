import { reactive, ref } from '@vue/composition-api';
export default function () {
    let lightMode: any = localStorage.getItem('lightMode') || true;

    const changeTheme = () => {
        var theme: any = document.body?.dataset.theme;
        if (theme == '' || theme == undefined) {
            console.log(document.body?.dataset)
            localStorage.setItem('lightMode', false);
            document.body?.setAttribute('data-theme', "dark")
            return;
        }
        if (theme == 'dark') {
            localStorage.setItem('lightMode', true);
            console.log(document.body?.dataset)
            document.body?.setAttribute('data-theme', "")
            return;
        }
    }

    return { lightMode, changeTheme}
}

