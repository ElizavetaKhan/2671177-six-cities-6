export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: string;
  location: {
    latitude: number;
    longitude: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  previewImage: string;
  images: string[];
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
};

export const offers: Offer[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    price: 120,
    city: 'Amsterdam',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.8,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century. An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    previewImage: 'img/apartment-01.jpg',
    images: [
      'img/room.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/studio-01.jpg',
      'img/apartment-01.jpg',
    ],
    bedrooms: 3,
    maxAdults: 4,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge',
    ],
    host: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: 'Room',
    price: 80,
    city: 'Amsterdam',
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.0,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    previewImage: 'img/room.jpg',
    images: [
      'img/room.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
    ],
    bedrooms: 1,
    maxAdults: 2,
    goods: [
      'Wi-Fi',
      'Heating',
      'Kitchen',
      'Cabel TV',
      'Fridge',
    ],
    host: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    price: 132,
    city: 'Amsterdam',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.0,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century. An independent House, strategically located between Rembrand Square and National Opera.',
    previewImage: 'img/apartment-02.jpg',
    images: [
      'img/apartment-02.jpg',
      'img/apartment-01.jpg',
      'img/apartment-03.jpg',
      'img/room.jpg',
    ],
    bedrooms: 2,
    maxAdults: 3,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge',
    ],
    host: {
      name: 'Oliver',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
  },
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    price: 180,
    city: 'Cologne',
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
    },
    isFavorite: true,
    isPremium: true,
    rating: 5.0,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century. An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    previewImage: 'img/apartment-03.jpg',
    images: [
      'img/apartment-03.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/studio-01.jpg',
      'img/room.jpg',
    ],
    bedrooms: 4,
    maxAdults: 6,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge',
      'Washer',
    ],
    host: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
  },
];
