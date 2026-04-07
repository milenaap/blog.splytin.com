export const ROLE_MENU_ACCESS = {
  admin: { all: true },
  manager: { all: true },

  user: {
    items: ['dashboard', 'washes', 'customers'],
    children: {
      customers: ['/admin/companies', '/admin/customer-vehicles'],
    },
  },

  //TODO other roles
};
   

