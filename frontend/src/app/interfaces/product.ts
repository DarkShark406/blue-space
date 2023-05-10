interface ISpecifications {
  cpu: string;
  operatingSystem: string;
  ram: string;
  gpu: string;
  storage: string;
  batteryCapacity: string;
  screen: string;
  keyboard: string;
  bluetooth: string;
  camera: string;
  weight: string;
  color: Array<string>;
  size: string;
  material: string;
  core: number;
  simSlot: number;
  cable: boolean;
  earphone: boolean;
  model: string;
  connection: string;
  connectionDistance: string;
  switch: string;
  type: string;
  numberOfKeys: string;
  ledLight: string;
  otherFunction: string;
  DPI: string;
  led: string;
  batteryTime: string;
  frequency: string;
  impedance: string;
  compatible: string;
  micrphone: string;
  language: string;
  numberOfUser: number;
  operationSystem: string;
  pen: boolean;
  materialKeycaps: string;
}

export class Product {
  id!: string;
  constructor(
    public productName: string = '',
    public productID: string = '',
    public categoryId: number = 0,
    public productPrice: number = 0,
    public productDiscount: number = 0,
    public productImage: Array<string> = [],
    public productBrand: string = '',
    public productRegion: string = '',
    public ratingPoint?: number,
    public numberReview?: number,
    public warrantyPeriod: number = 0,
    public description: string = '',
    public productTags: Array<string> = [],
    public specifications: ISpecifications = {
      cpu: '',
      operatingSystem: '',
      ram: '',
      gpu: '',
      storage: '',
      batteryCapacity: '',
      screen: '',
      keyboard: '',
      bluetooth: '',
      camera: '',
      weight: '',
      color: [],
      size: '',
      material: '',
      core: 0,
      simSlot: 0,
      cable: true,
      earphone: true,
      model: '',
      connection: '',
      connectionDistance: '',
      switch: '',
      type: '',
      numberOfKeys: '',
      ledLight: '',
      otherFunction: '',
      DPI: '',
      led: '',
      batteryTime: '',
      frequency: '',
      impedance: '',
      compatible: '',
      micrphone: '',
      language: '',
      numberOfUser: 0,
      operationSystem: '',
      pen: true,
      materialKeycaps: '',
    }
  ) {}
}
