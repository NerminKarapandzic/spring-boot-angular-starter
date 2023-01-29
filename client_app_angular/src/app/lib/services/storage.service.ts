import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
  ) { }

  async uploadFile(file: File, path: string) {

  }

  async getPublicFileUrl(filepath: string) {
  }
}
