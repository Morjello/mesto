const ford = new URL('../images/ford.jpg', import.meta.url);
const field = new URL('../images/field.jpg', import.meta.url);
const zenit = new URL('../images/zenit.jpg', import.meta.url);
const canyon = new URL('../images/canyon.jpg', import.meta.url);
const church = new URL('../images/church.jpg', import.meta.url);
const sunset = new URL('../images/sunset.jpg', import.meta.url);

export const initialCards = [
    {
       title: 'Форд',
       link: ford
    },
    {
       title: 'Поле',
       link: field
    },
    {
       title: 'Зенит - В',
       link: zenit
    },
    {
       title: 'Каньон',
       link: canyon
    },
    {
       title: 'Храм Святой Марии в Ловере',
       link: church
    },
    {
       title: 'Закат',
       link: sunset
    }
 ];