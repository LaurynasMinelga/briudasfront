// Registered user routes (profile, management, etc..)
import DiscordView from '../views/global/DiscordView.vue'
import Admin from '../views/global/Admin.vue'
import Dashboard from '../views/global/Dashboard.vue'

import ProfileView from '../views/user/ProfileView.vue'
import Settings from '@/views/user/SettingsView.vue'

import TwitchView from '@/views/global/TwitchView.vue'

function isLoggedIn(to, from, next) {
    if (localStorage.token) {
      next();
    } else {
      next('/login');
    }
}

export default [
    {
        path: '/',
        name: 'discord',
        component: DiscordView,
        /*redirect: {
        name: 'dashboard'
        },
        children: [
        {
            path: '',
            name: 'dashboard',
            component: Dashboard,
        },
        {
            path: '/user/:id',
            name: 'profile',
            component: ProfileView
        }
        ]*/
    },
    {
        path: '/user/:id',
        name: 'profile',
        component: ProfileView,
        beforeEnter: isLoggedIn,
    },
    {
        path: '/admin',
        name: 'admin',
        beforeEnter: isLoggedIn,
        component: Admin,
        children: [
            
        ]
    },
    {
        path: '/twitch',
        name: 'twitch',
        component: TwitchView,
    },
    {
        path: '/settings',
        name: 'settings',
        beforeEnter: isLoggedIn,
        component: Settings,
        children: [

        ]
    },
];