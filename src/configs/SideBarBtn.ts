import * as Icons from '@fortawesome/free-solid-svg-icons';


type btn = {
    icon?: Icons.IconDefinition;
    name: string;
    path: string;
    avatar?: string;
};

const listBtn: btn[] = [
    {
        icon: Icons.faHome,
        name: 'For you',
        path: '/',
    },
    {
        icon: Icons.faCompass,
        name: 'Explore',
        path: '/explore',
    },
    {
        icon: Icons.faUser,
        name: 'Following',
        path: '/following',
    },
    {
        icon: Icons.faUserGroup,
        name: 'Friends',
        path: '/friends',
    },
    {
        icon: Icons.faVideo,
        name: 'LIVE',
        path: '/live',
    },
    {
        name: 'Profile',
        path: '/profile',
        avatar:
            'https://danviet.mediacdn.vn/upload/2-2019/images/2019-04-02/Vi-sao-Kha-Banh-tro-thanh-hien-tuong-dinh-dam-tren-mang-xa-hoi-khabanh-1554192528-width660height597.jpg',
    },
];

export {listBtn} 