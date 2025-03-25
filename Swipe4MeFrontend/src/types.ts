import { TransactionStatus } from "./clients/transactionClient";

export enum DiningLocation {
  COMMONS = "Commons",
  EBI = "EBI",
  ROTHSCHILD = "Rothschild",
  ZEPPOS = "Zeppos",
  KISSAM = "Kissam",
  RAND = "Rand",
  PIZZA_KITCHEN = "Rand Pizza Kitchen",
  PUB = "Pub",
  VANDYBLENZ = "VandyBlenz",
  CARMICHAEL = "Carmichael",
  WASABI = "Wasabi",
  LOCAL_JAVA = "Local Java at Alumni Hall",
  GRINS = "Grin's Vegetarian Cafe",
  SUZIES_BLAIR = "Suzie's Blair",
  SUZIES_FGH = "Suzie's FGH",
  SUZIES_MRB3 = "Suzie's MRB III",
  SUZIES_CENTRAL = "Suzie's Central",
  BRANSCOMB_MUNCHIE = "Branscomb Munchie Mart",
  COMMON_GROUNDS = "Common Grounds",
  HIGHLAND_MUNCHIE = "Highland Munchie Mart",
  KISSAM_MUNCHIE = "Kissam Munchie Mart",
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  rating: number;
  profilePicUrl: string;
}

export interface Transaction {
  id?: number;
  availability: Availability;
  buyer: User;
  seller: User;
  status: TransactionStatus;
}

export interface Availability {
  id: number;
  user: User;
  location: string;
  startTime: string;
  endTime: string;
}
