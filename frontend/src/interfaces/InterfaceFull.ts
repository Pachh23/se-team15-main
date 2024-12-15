export interface EmployeeInterface {
	ID?: number;
	E_FirstName?: string;
	E_LastName?: string;
	Avatar?: string;
	Number?: string;
	Email?: string;
	Password?: string;
	Address?: string;
	StartDate?: string;
	AccessLevel?: string;
	GenderID?: number;
	PositionID?: string;
	WarehouseID?: string;
  }

export interface CustomerInterface {
	ID?: number;
	FirstName?: string;
	LastName?: string;
	Avatar?: string;
	Number?: string;
	Email?: string;
	Password?: string;
	Address?: string;
	GenderID?: number;
  }

export interface GendersInterface {
    ID?: number;
    Gender?: string;
  }

export interface PositionsInterface {
    ID?: number;
    Position?: string;
  }
/*
export interface WarehousesInterface {
    ID?: number;
    Warehouse_name?: string;
  }
*/
export interface LocationInterface {
	ID?: number;
    Shelf?: number;
	Block?: number;
	WarehouseID?: number;
	ZoneID?: number;
	LocationStatusID?: number;
	// CreateByID?: number;
	// UpdateByID?: number;
}

//=====================warehouse==================//

export interface ProvinceInterface {
  ID?: number;
  province?: string;
}

export interface WarehousesInterface {
  [x: string]: any;
  ID?: number;
  WarehouseName?: string;
  WarehouseTypeID?: number;
  WarehouseStatusID?: number;
  Capacity?: number;
  Address?: string;
  Zipcode?: string;
  ProvinceID?: number;

}

export interface WarehouseStatusesInterface {
  ID?: number;
  warehouse_status?: string;
}

export interface WarehouseTypesInterface {
  ID?: number;
  warehouse_type?: string;
}
