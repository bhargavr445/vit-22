import { httpResource } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';

@Injectable()
export class Course {

  serName = 'test Service';
  readonly #vehicleType = signal('merc');
  
  vehiclesHttpResource = httpResource(() => ({
    url: `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/${this.#vehicleType()}?format=json`,
    method: 'GET'
  }));
  vehicleResponse = computed(() => this.vehiclesHttpResource.value());
  vehicleResponseError = computed(() => this.vehiclesHttpResource.error());
  vehicleResponseLoading = computed(() => this.vehiclesHttpResource.isLoading());
  
  getName() {
    return this.serName;
  }

  setVehicleType(type: string) {
    this.#vehicleType.set(type);
  }

}
