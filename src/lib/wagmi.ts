import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

// IMPORTANT: Replace 'YOUR_PROJECT_ID' with your actual WalletConnect Cloud project ID.
// You can get one at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || 'YOUR_PROJECT_ID';

export const config = getDefaultConfig({
  appName: 'ChainTacToe',
  projectId,
  chains: [sepolia],
  ssr: true,
});
