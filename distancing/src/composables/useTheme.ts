
export default function () {
    let lightMode: any = localStorage.getItem('lightMode') || true;

    const changeTheme = () => {
        var theme: any = document.body?.dataset.theme;
        if (theme == '' || theme == undefined) {
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

