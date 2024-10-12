
export const sideBarData = [
  {
    routeLink: 'home',
    icon: 'fas fa-home',
    label: 'Inicio',
  },
  {
    routeLink: 'reservar',
    icon: 'fas fa-floppy-disk',
    label: 'Reservar',
  },
  {
    routeLink: 'panel',
    icon: 'fas fa-chalkboard-user',
    label: 'Panel de control',
    items: [
      {
        routeLink: 'panel/dashboard',
        icon: 'fas fa-gauge',
        label: 'Dashboard',
      },
      {
        routeLink: 'panel/estadisticas',
        icon: 'fas fa-chart-line',
        label: 'Estadisticas',
      },
      {
        routeLink: 'panel/guest-register',
        icon: 'fas fa-floppy-disk',
        label: 'Invitados',
      }
    ]
  },
  {
    routeLink: 'Administrador',
    icon: 'fas fa-toolbox',
    label: 'Administrador',
    items: [
      {
        routeLink: 'administrador/crear',
        icon: 'fas fa-hammer',
        label: 'Crear',
      },
      {
        routeLink: 'administrador/editar',
        icon: 'fas fa-screwdriver-wrench',
        label: 'Editar',
      },
      {
        routeLink: 'administrador/eliminar',
        icon: 'fas fa-scissors',
        label: 'Eliminar',
      }
    ]
  }
];
