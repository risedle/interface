// Create our number formatter.
export const dollarFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

export const tokenBalanceFormatter = {
    format: (n: number): number => {
        return Math.floor(n * 1e5) / 1e5;
    },
};
