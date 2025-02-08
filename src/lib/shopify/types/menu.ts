export type Menu = {
  title: string;
  path: string;
  children?: Menu[];
};

export type ShopifyMenuItem = {
  title: string;
  url: string;
  items?: ShopifyMenuItem[];
};

export type ShopifyMenuOperation = {
  data: {
    menu?: {
      items: ShopifyMenuItem[];
    };
  };
  variables: {
    handle: string;
  };
};
