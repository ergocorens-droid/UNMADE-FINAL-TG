export type Product = {
  id: string;
  handle: string;
  title: string;
  price: number;
  image: string | null;
};

const MOCK_PRODUCTS: Product[] = [
  {
    id: "mock-1",
    handle: "wanna-be-my-cardio-tee",
    title: "WANNA BE MY CARDIO TEE",
    price: 194,
    image: null,
  },
  {
    id: "mock-2",
    handle: "apexero-rsr-hoodie",
    title: "APEXERO RSR HOODIE",
    price: 259,
    image: null,
  },
  {
    id: "mock-3",
    handle: "midnight-touge-longsleeve",
    title: "MIDNIGHT TOUGE LONGSLEEVE",
    price: 219,
    image: null,
  },
  {
    id: "mock-4",
    handle: "silhouette-gt-tee",
    title: "SILHOUETTE GT TEE",
    price: 189,
    image: null,
  },
  {
    id: "mock-5",
    handle: "bolt-pattern-cap",
    title: "BOLT PATTERN CAP",
    price: 179,
    image: null,
  },
  {
    id: "mock-6",
    handle: "touge-drift-tee",
    title: "TOUGE DRIFT TEE",
    price: 199,
    image: null,
  },
  {
    id: "mock-7",
    handle: "boost-pressure-hoodie",
    title: "BOOST PRESSURE HOODIE",
    price: 249,
    image: null,
  },
  {
    id: "mock-8",
    handle: "kamikaze-jdm-tee",
    title: "KAMIKAZE JDM TEE",
    price: 209,
    image: null,
  },
  {
    id: "mock-9",
    handle: "apex-shift-longsleeve",
    title: "APEX SHIFT LONGSLEEVE",
    price: 229,
    image: null,
  },
  {
    id: "mock-10",
    handle: "steel-blue-boxer-tee",
    title: "STEEL BLUE BOXER TEE",
    price: 184,
    image: null,
  },
  {
    id: "mock-11",
    handle: "circuit-runner-hoodie",
    title: "CIRCUIT RUNNER HOODIE",
    price: 254,
    image: null,
  },
  {
    id: "mock-12",
    handle: "rear-wing-graphic-tee",
    title: "REAR WING GRAPHIC TEE",
    price: 192,
    image: null,
  },
  {
    id: "mock-13",
    handle: "neon-refuel-longsleeve",
    title: "NEON REFUEL LONGSLEEVE",
    price: 224,
    image: null,
  },
  {
    id: "mock-14",
    handle: "pitlane-patch-cap",
    title: "PITLANE PATCH CAP",
    price: 182,
    image: null,
  },
  {
    id: "mock-15",
    handle: "turbo-noise-tee",
    title: "TURBO NOISE TEE",
    price: 204,
    image: null,
  },
  {
    id: "mock-16",
    handle: "snow-chain-street-hoodie",
    title: "SNOW CHAIN STREET HOODIE",
    price: 239,
    image: null,
  },
];

export async function getFeaturedProducts(): Promise<Product[]> {
  return MOCK_PRODUCTS;
}

// export async function getFeaturedProducts(): Promise<Product[]> {
//   return getShopifyProducts(16);
// }
