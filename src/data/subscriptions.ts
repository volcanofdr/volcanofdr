import { Subscription } from '../types';

export const subscriptions: Subscription[] = [
  {
    type: 'vip',
    name: 'VIP',
    duration: '1 día',
    price: 145,
    features: [
      'Acceso a búsqueda básica',
      'Soporte prioritario',
      'Acceso a cuentas básicas'
    ]
  },
  {
    type: 'vip',
    name: 'VIP',
    duration: '1 semana',
    price: 500,
    features: [
      'Acceso a búsqueda básica',
      'Soporte prioritario',
      'Acceso a cuentas básicas'
    ]
  },
  {
    type: 'expert',
    name: 'Expert',
    duration: '1 día',
    price: 735,
    features: [
      'Todo lo de VIP',
      'Búsqueda avanzada',
      'Scraper de servidores',
      'Acceso a cuentas premium'
    ]
  },
  {
    type: 'expert',
    name: 'Expert',
    duration: '1 semana',
    price: 1355,
    features: [
      'Todo lo de VIP',
      'Búsqueda avanzada',
      'Scraper de servidores',
      'Acceso a cuentas premium'
    ]
  },
  {
    type: 'extended',
    name: 'Extended+',
    duration: '1 semana',
    price: 500,
    features: [
      'Mejora tu suscripción actual',
      'Herramientas Extended',
      'Archivos premium',
      'Acceso a base de datos extendida'
    ]
  }
];