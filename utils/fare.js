export const calculateFare = (distanceKm, rideType, waitingMinutes = 0) => {
  // Indian cab fare rates
  const rates = {
    mini: { base: 40, perKm: 10, waiting: 1 },
    sedan: { base: 60, perKm: 12, waiting: 2 },
    suv: { base: 80, perKm: 15, waiting: 2 },
  };

  const ride = rates[rideType];

  if (!ride) return 0;

  let fare =
    ride.base +
    distanceKm * ride.perKm +
    waitingMinutes * ride.waiting;

  // Night charge: 10 PM – 5 AM (25% extra)
  const hour = new Date().getHours();
  if (hour >= 22 || hour <= 5) {
    fare *= 1.25;
  }

  return Math.round(fare);
};
