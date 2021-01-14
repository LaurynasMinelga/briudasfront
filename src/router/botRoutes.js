// Every bot related route
//discord bot
import Manager from '../views/discord/Manager.vue'
import ManagerContent from '../views/discord/ManagerContent.vue'

//role-bot
import Channels from '../views/discord/roles/ChannelsView.vue'
import Messages from '../views/discord/roles/MessagesView.vue'

function isLoggedIn(to, from, next) {
    if (localStorage.token) {
      next();
    } else {
      next('/login');
    }
}

export default [
    {
        path: '/manager',
        name: 'manager',
        component: Manager,
        beforeEnter: isLoggedIn,
        redirect: {
          name: 'managercontent'
        },
        children: [
            {
                path: '',
                name: 'managercontent',
                component: ManagerContent
            },
            {
                path: '/channels',
                name: 'channels',
                component: Channels
            },
            {
                path: '/:id',
                name: 'channel',
                component: Messages,
            },
        ]
      },
];
