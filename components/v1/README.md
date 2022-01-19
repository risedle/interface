# Docs

This document contains information about components and how it all connected.

## Components

1. **Network Switcher**: The most important component is the Network Switcher.
   It defines on which chain the data is displayed.
2. **Connect Wallet**: This allow user to connect their wallet, it will show to
   switch network if the connected wallet is not using the choosen network.

Here is how it connected:

1. User access page
2. By default it will shown the default network (e.g. Kovan)
3. User click "Connect Wallet" button
4. If connected wallet is on the same network, display the account address.
   Otherwise display the switch network button (e.g. Switch to kovan)

When user already connected, then user switch the network via Network Switcher,
the notification will pop up to switch network.
