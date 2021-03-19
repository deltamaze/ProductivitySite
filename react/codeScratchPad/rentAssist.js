/* eslint-disable no-console */
const startAmount = 300;
const reducePerMonth = 10;
let payout = startAmount;
let payoutMonth = 1;
let totalPayout = payout;
while (payout > 0) {
    // eslint-disable-next-line no-console
    console.log(`month${payoutMonth} payout: ${payout} totalPayout:${totalPayout}`);
    payout -= reducePerMonth;
    totalPayout = payout + totalPayout;
    payoutMonth += 1;
}
