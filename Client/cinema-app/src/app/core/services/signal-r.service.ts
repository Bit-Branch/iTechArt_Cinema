import * as signalR from '@microsoft/signalr';

import { Injectable } from '@angular/core';

import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  startConnection(hallId: number): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.hostUrl}/bookingSeatsConnection`)
      .build();
    this.hubConnection
      .start()
      .then(() => this.hubConnection.invoke("JoinGroup", hallId))
      .catch(err => console.error(`Error while starting SignalR connection: ${err}`));
  }

  get signalRConnection(): signalR.HubConnection {
    return this.hubConnection;
  }

  blockSeats(hallId: number, seatIds: number[]) {
    this.hubConnection.invoke("BlockSeats", hallId, seatIds)
      .catch(err => console.error(`Error while calling BlockSeats method: ${err}`));
  }
}
