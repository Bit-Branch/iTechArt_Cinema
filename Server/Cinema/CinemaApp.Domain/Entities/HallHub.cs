using Microsoft.AspNetCore.SignalR;

namespace CinemaApp.Domain.Entities
{
    public class HallHub : Hub
    {
        public async Task JoinGroup(int hallId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, hallId.ToString());
        }

        public async Task LeaveGroup(int hallId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, hallId.ToString());
        }

        public async Task BlockSeats(int hallId, int[] seatIds)
        {
            await Clients.OthersInGroup(hallId.ToString()).SendAsync("UserBlockedSeats", seatIds);
        }
    }
}