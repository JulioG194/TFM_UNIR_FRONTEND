import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private workerData = [
    {
      id: 1,
      name: 'Ted Mosby',
      occupation: 'Arquitecto',
      state: 'New',
      city: 'New',
      age: 35,
      activity: '10 sec ago',
      avatar: './assets/img/avatars/1.jpg',
      sex: 'M',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    // Agrega más trabajadores según sea necesario
  ];

  getWorkers() {
    return this.workerData;
  }

  getWorkerById(id: number) {
    return this.workerData.find(worker => worker.id === id);
  }
}