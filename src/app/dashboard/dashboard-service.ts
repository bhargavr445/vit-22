import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class DashboardService {

  http = inject(HttpClient);

  sendName() {
    return 'Neeraja';
  }

  save(creds: any) {
    return lastValueFrom(this.http.post('http://localhost:3010/api/login', creds));
  }

  save1(creds: any) {
    return (this.http.post('http://localhost:3010/api/login', creds));
  }

  add(n1: number, n2: number) {
    return n1+n2;
  }
  
}
