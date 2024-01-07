interface Sprite {
  front_default: string;
  back_default?: string;
}

export interface Sprites {
  front_default: string;
  other: {
    dream_world: Sprite;
    home: Sprite;
    'official-artwork': Sprite;
    showdown: Sprite;
  };
}
