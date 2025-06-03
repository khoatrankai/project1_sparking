

export class GetParkingApartmentDto {
  id: number;
  address: string;
  owner_name?: string;
  owner_phone?: string;
  owner_email?: string;
  bike_slot: number;
  car_slot: number;
  timestamp: Date;
}
