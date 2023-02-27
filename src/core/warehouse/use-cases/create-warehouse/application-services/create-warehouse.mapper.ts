import {
  CityValueObject,
  DistrictValueObject,
  PostalCodeValueObject,
  ProvinceValueObject,
  StreetValueObject,
  WardValueObject,
} from '@common-value-object/location';
import { Injectable } from '@nestjs/common';
import { WarehouseCreatedDomainEvent } from '@warehouse-domain-events';
import {
  LocationAddressValueObject,
  LocationCordinatesDetails,
  LocationCordinatesValueObject,
} from '@warehouse-value-object/location';
import {
  WarehouseLocationValueObject,
  WarehouseNameValueObject,
  WarehouseCapacityValueObject,
} from '@warehouse-value-object/warehouse';
import {
  CreateWarehouseAddress,
  CreateWarehouseCommand,
  CreateWarehouseResponseDto,
} from './dtos';
import { CreateWarehouseDomainData } from './dtos/create-warehouse.domain-data';

@Injectable()
export class CreateWarehouseMapper {
  toCreateWarehouseDomain(
    command: CreateWarehouseCommand,
  ): CreateWarehouseDomainData {
    let locationDomain: WarehouseLocationValueObject;
    if (command.location instanceof CreateWarehouseAddress) {
      const address = this.toAddressDomain(command.location);
      locationDomain = WarehouseLocationValueObject.createWithAddress(address);
    } else if (WarehouseLocationValueObject.isCordinatesLocation(location)) {
      const cordinates = this.toCordinates({
        longitude: command.location.longitude,
        latitude: command.location.latitude,
      });
      locationDomain =
        WarehouseLocationValueObject.createWithCordinates(cordinates);
    }

    return {
      name: new WarehouseNameValueObject(command.name),
      capacity: new WarehouseCapacityValueObject(command.capacity),
      location: locationDomain,
    };
  }

  toAddressDomain(address: CreateWarehouseAddress): LocationAddressValueObject {
    const { street, city, ward, district, postalCode, province } = address;
    const cityDomain = new CityValueObject(city);
    const districtDomain = new DistrictValueObject(district);
    const postalCodeDomain = new PostalCodeValueObject(postalCode);
    const provinceDomain = new ProvinceValueObject(province);
    let streetDomain: StreetValueObject;
    let wardDomain: WardValueObject;
    if (street) {
      streetDomain = new StreetValueObject(street);
    }
    if (ward) {
      wardDomain = new WardValueObject(ward);
    }

    return new LocationAddressValueObject({
      city: cityDomain,
      district: districtDomain,
      postalCode: postalCodeDomain,
      street: streetDomain,
      ward: wardDomain,
      province: provinceDomain,
    });
  }

  toCordinates(
    details: LocationCordinatesDetails,
  ): LocationCordinatesValueObject {
    return new LocationCordinatesValueObject(details);
  }

  toResponseDto(
    event: WarehouseCreatedDomainEvent,
  ): CreateWarehouseResponseDto {
    return new CreateWarehouseResponseDto({
      name: event.details.name.unpack(),
      capacity: event.details.capacity.unpack(),
      location: event.details.location.unpack(),
    });
  }
}
