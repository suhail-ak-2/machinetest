import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: "Users",
    icon: "grid-outline",
    children: [
      {
        title: "Register",
        link: "/pages/users/register"
      },
      {
        title: "Login",
        link: "/pages/users/login"
      },
      {
        title: "View all users",
        link: "/pages/users/view"
      },
      
    ]
  },
];
